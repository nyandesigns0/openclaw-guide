# Chapter 2.2 - Memory Architecture

## 2.2.0 Overview

This chapter defines how memory, preference scope, and system learning support the A.A.S. Field Runtime. Hermes provides profile memory, skills, and procedural learning for agents. OpenViking or equivalent memory storage provides retrieval context. A.A.S. product truth stays in backend-owned Postgres graph rows and runtime events, with WorldState as a derived read model.

### 2.2.1 Native Memory Model

**Hermes Profile Memory:** Hermes profile memory is useful for agent habits, reusable procedures, skill improvement, prior failures, and role-specific recall. It is not active project truth. \
**OpenViking Memory:** OpenViking stores compressed context cards, prior lessons, old branch summaries, and retrieval hints. It is a memory/context DB, not a source-of-truth DB. \
**Runtime Recall:** Memory retrieval is useful for background continuity, stable user preferences, prior lessons, and reusable knowledge. It is not the same as the current design world. \
**Backend Truth Boundary:** Current project truth lives in A.A.S. backend graph records and the event log. WorldState is derived from those records. Memory can inform patches, but it must not replace or directly change structured product state. \
**Commit Boundary:** Architectural decisions become canonical through commits, not through casual memory writes. Memory may summarize decisions, but the CommitmentLedger is authoritative. \
**Distillation Rule:** Agents should receive compact, relevant context through Agent Briefs. They should not be expected to call multiple memory tools unless the selected move explicitly requires deeper retrieval.

```mermaid
%%{init: {'flowchart': {'arrowMarkerSize': 1.5}}}%%
flowchart TD
    MEM[Hermes Memory / Skills] ==> CD[ContextDistiller]
    OV[OpenViking Context Cards] ==> CD
    PREF[Scoped Preference Store] ==> CD
    ART[Artifacts] ==> CD
    EVT[Recent Events] ==> CD
    WS[WorldState] ==> CD
    EVAL[Evaluator Results] ==> CD
    CD ==> AB[Agent Brief]
    AB ==> AG[Agent Move Selection]
```

### 2.2.2 Memory Layers and Workspace Files

**Profile Memory:** Hermes profile memory stores how an agent works: procedures, role habits, skill hints, prior failures, and profile-local recall. \
**OpenViking Context DB:** OpenViking stores derived memory cards with project, node, linked node IDs, summary, confidence, and provenance. These cards are rebuilt or refreshed from backend truth. \
**A.A.S. Product State:** Projects, sessions, graph nodes, graph links, WorldState snapshots, affordances, moves, move patterns, features, evaluations, tensions, branches, commits, artifacts, approvals, preferences, agent patches, and runtime events belong in the A.A.S. backend. \
**Artifact Storage:** Generated documents, images, models, diagrams, board packages, validation reports, evaluator reports, and exports are stored as artifacts with lineage and references. \
**Agent Briefs:** Briefs are generated views, not permanent memory. They are produced from WorldState plus relevant memory, preferences, artifacts, commits, evaluations, and events for a specific agent role and move. \
**Snapshots and Replay:** WorldState snapshots and runtime events provide replay/debug capability without relying on chat transcript memory.

```text
Hermes profile memory:
  profile config
  role files
  skills/
  profile-local memory
  sessions
  task logs

A.A.S. persisted state:
  direction_nodes
  direction_links
  world_states
  affordances
  moves
  move_patterns
  feature_registry
  evaluations
  tensions
  branches
  commits
  artifacts
  preferences
  approvals
  agent_patches
  runtime_events
  agent_briefs

OpenViking memory/context:
  context cards
  branch lessons
  reusable project patterns
  retrieval summaries
```

### 2.2.3 WorldState as Active Context

**WorldState:** WorldState is the derived active design state compiled from canonical graph rows, commits, artifacts, preferences, and runtime events. It includes goal, current intent, project status, active branch, branches, artifacts, committed decisions, unresolved tensions, available moves, blocked moves, constraints, success metrics, feature state, design debt, recent events, open questions, and risks. \
**GoalState:** Stores the user goal, normalized goal, project type, desired outputs, user values, non-goals, and priority stack. \
**IntentState:** Tracks phase, focus, active question, current tension, desired next artifact, active process landmark, and current design debt pressure. \
**ProjectState:** Tracks brief, research, concept, ground truth, board, model, artifact coverage, and validation status. \
**FeatureState:** Stores measured or inferred values such as concept strength, spatial coherence, ground-truth readiness, drawing consistency, tension reduction, branch diversity, user alignment, cost, risk, and elegance. \
**Use in Memory:** Memory retrieval can supply missing history or preferences, but backend graph truth and derived WorldState are the source used to compile the immediate operating situation.

### 2.2.4 Agent Brief Write and Read Path

**Read Path:** The ContextDistiller reads WorldState, selected artifacts, scoped preferences, relevant commits, active tensions, evaluator outputs, recent events, and memory snippets to produce an Agent Brief. \
**Move Context:** Each brief includes valid moves, blocked moves, feature pressures, design debt, warnings, an output contract, source manifest, and only the context needed for the role. \
**Write Path:** Agents do not directly update WorldState by prose or memory. They return structured output through MoveCompiler/bridge-controlled contracts, create an agent patch where needed, and submit backend commands that validate, write graph rows, write events, and publish updates. \
**Memory Side Effects:** If a durable lesson or procedure should be remembered, the system may also write a Hermes profile memory, skill update, or OpenViking memory card, but this is secondary to product state. \
**Memory-to-Graph Rule:** Memory follows `graph -> memory card -> retrieval -> agent patch -> command -> graph`. It never follows `memory -> direct graph mutation`. \
**Reviewability:** Every important state transition should be inspectable through events, artifacts, commits, evaluations, score breakdowns, task bindings, or snapshots.

```mermaid
%%{init: {'flowchart': {'arrowMarkerSize': 1.5}}}%%
flowchart LR
    WS[WorldState] ==> BR[Agent Brief]
    BR ==> AG[Hermes Profile Task]
    AG ==> OUT[Structured Output]
    OUT ==> PT[Agent Patch / Command]
    PT ==> EX[AAS Backend Transaction]
    EX ==> ART[Artifact Records]
    EX ==> EV[Evaluator Results]
    EX ==> EVT[Runtime Events]
    EX ==> WS
```

### 2.2.5 Preference Scope and User Context

**Profile Source:** Stable user context is curated from `USER.md`-style files and extraction notes. High-signal facts such as domain, working style, recurring projects, and durable constraints may enter the Preference Store. Raw evidence logs, transient one-off tasks, and tool schemas should not be injected into every agent turn. \
**User Extraction Notes:** `user_extraction_notes.md` identifies durable user context such as Architecture/AEC plus software-development domain context, concise and surgical response preferences, forwarding-ready output, secure token handling, SEO preservation, and recurring projects. These belong in scoped preference/profile records, not in project truth unless committed. \
**Preference Records:** Every preference must have tenant, scope type, scope ID, key, value, confidence, source, visibility, portability, creator, allowed consumers, and optional expiry. \
**Scope Types:** Use user, team, project, session, and agent-profile scopes. User taste is private by default. Project truth is explicit by commit. Agent memory is procedural, not user taste. \
**Resolution Order:** Explicit prompt overrides session choices; session choices override project commits where allowed; project commits override user preferences; user preferences override team standards only for that user; defaults come last. High-impact conflicts should create an affordance to resolve the conflict. \
**Context Manifests:** Every Agent Brief should include source references for preferences it used, such as project commit IDs, user preference IDs, team standards, or session-scoped instructions. \
**No Preference Bleed:** Retrieval must filter by tenant and allowed scopes before semantic search. Do not use one global vector memory without strict metadata filters.

### 2.2.6 Retrieval, Indexing, and Recall Pipeline

**Relevant Retrieval:** Retrieval is triggered by move requirements, unresolved questions, stale research, missing precedent context, user-profile needs, or evaluator uncertainty. \
**Compiled Briefs:** Agents should not receive broad memory dumps. The distiller should provide compact excerpts and references with enough provenance for inspection. \
**Artifact References:** Large artifacts should be passed by reference, not inlined into prompts. The executor resolves paths or asset IDs when dispatching work. \
**Commit Awareness:** Retrieved context must be filtered against committed decisions. A memory snippet that conflicts with a commit should become a tension or warning, not silently override project truth. \
**Search Surfaces:** OpenViking context cards, Hermes profile memory, skills, scoped preferences, file reads, artifact metadata, project commits, evaluator output, and move statistics can all feed the distiller, but agents experience the result as a brief.

### 2.2.7 System Learning and Maintenance

**Commit Ledger First:** Major decisions, rationale, evidence, affected artifacts, reversibility, and approval metadata belong in commits. \
**Event-Sourced History:** Runtime events record what happened: moves generated, moves selected, Hermes tasks created, execution started, artifacts created, evaluator scores measured, tensions resolved, branches merged, commits created, warnings raised, and approvals requested. \
**Move Pattern Learning:** Move executions should log before/after WorldState, selected pattern, artifacts created, score delta, user acceptance, evaluator results, and failure modes. These logs update move stats without changing model weights. \
**Effect Learning:** Predicted feature deltas from move patterns should be compared with measured feature deltas from evaluators, then used to update sensitivity matrices and contextual reward estimates. \
**Memory Summaries:** Maintenance agents can summarize stable lessons into Hermes profile memory, shared knowledge, or OpenViking context cards, but they must preserve the distinction between memory summaries and canonical product records. \
**Memory Card Shape:** A useful memory card records project ID, related node IDs, summary, linked nodes, confidence, source event or snapshot, and refresh time. \
**Staleness Detection:** The system should flag stale memory cards, stale research, outdated models, invalid artifacts, unresolved critical tensions, weak move patterns, stale evaluator results, and branches that no longer align with committed truth. \
**Replayability:** WorldState snapshots plus events should be enough to reconstruct the design field state for debugging or review.

### 2.2.8 Storage Boundaries, Guidance, and Anti-Patterns

**Backend-Owned State:** A.A.S. persists graph nodes, graph links, WorldState read models, moves, move patterns, features, evaluations, tensions, branches, commits, artifacts, approvals, preferences, agent patches, task bindings, and events in the backend database and storage layer. \
**Hermes-Owned Execution Memory:** Hermes owns profile memory, worker execution state, skills, task logs, and session-level execution context. \
**OpenViking-Owned Context Memory:** OpenViking owns retrieval cards and summaries derived from backend truth. It does not own graph truth. \
**No Memory-as-Database:** Do not treat markdown memory files, OpenViking cards, or Hermes profile memory as the product database. \
**No Hidden Commit:** Do not record a major design direction only in chat, memory, or profile recall. It must be a commit. \
**No Unscoped Preference:** Do not use a preference unless it has an owner, scope, source, visibility, and allowed consumer path. \
**No Raw Dump Briefs:** Do not compile massive unfiltered memory and artifact content into every agent turn. \
**No Tool-First Recall:** Do not require the agent to search everything before it can choose a move. The environment should mediate the situation. \
**No Cross-Project Profile Bleed:** Do not let one shared Hermes specialist profile carry project-specific taste, facts, or commitments into unrelated projects.
