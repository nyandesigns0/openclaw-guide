# Chapter 2.3 - Field Runtime Architecture

## 2.3.0 Overview

This chapter defines the A.A.S. Field Runtime: the design-intelligence layer above Hermes that turns architectural work into a living design field. The runtime replaces graph-first pipeline execution with WorldState, affordances, primitives, move patterns, moves, branches, tensions, commits, feature scores, briefs, Hermes execution, critique, learning, and replayable events.

### 2.3.1 Design Principles

**Affordances Over Graphs:** The system exposes meaningful next moves instead of asking the human to pre-author every workflow path. \
**Environment Mediation:** Agents should not manually browse every tool, file, memory source, and node. The environment compiles the current situation and exposes legal moves. \
**Typed Moves:** Agents choose architectural moves. A.A.S. maps those moves to Hermes tasks, artifact contracts, Rhino Compute, GPT Image V2, renderers, validators, and state updates. \
**Stable Primitives, Evolvable Patterns:** Primitive move types are few, stable, permissionable world-delta verbs. Move patterns are domain-specific architectural tactics that can be seeded, learned, sandboxed, promoted, and pruned. \
**Backend Graph Truth:** The current design world is canonically stored as backend-owned Postgres graph rows plus an append-only event log. WorldState is a derived read model or snapshot, not a separate source of truth. \
**Hermes as Execution Fabric:** A.A.S. compiles moves into Hermes Kanban task groups assigned to Hermes profiles. Hermes executes; A.A.S. validates and records truth. \
**Commitment Physics:** Backend commands can change graph state, but only CommitmentLedger commits change committed design truth. \
**Tension Resolution:** Design conflicts are first-class objects that generate moves and can block finalization when critical. \
**Inspectable Control:** Scores, preconditions, risks, approvals, artifacts, feature deltas, task bindings, and events should remain visible and overrideable.

### 2.3.2 High-Level System Model

**Layer 1 - A.A.S. Frontend:** Presents exactly four workspaces: Chat, Draw, Model, and Architect. Shared inspectors, approvals, feature pressures, artifact previews, and run status support those workspaces without becoming separate primary modes. \
**Layer 2 - Backend Control Plane:** Owns Postgres graph truth, command validation, transactions, permissions, WorldState read models, artifacts, approvals, preferences, events, sessions, and API contracts. \
**Layer 3 - A.A.S. Field Runtime:** Owns WorldState compilation, affordance generation, context distillation, feature extraction, intent scoring, process grammar, design debt, move pattern selection, tension tracking, branch ecology, commitment rules, move compilation, and critic/supervisor logic. \
**Layer 4 - A.A.S.-Hermes Bridge:** Owns profile binding, Kanban task creation, dependency linking, dispatcher monitoring, log watching, artifact ingest, and event translation. \
**Layer 5 - Hermes Agent:** Provides profiles, Kanban, worker execution, memory, skills, tools, dispatcher, logs, and task state. \
**Layer 6 - Specialized Tools:** Provides geometry computation, image generation, segmentation, rendering, validation, and export.

```mermaid
%%{init: {'flowchart': {'arrowMarkerSize': 1.5}}}%%
flowchart TD
    U[User] ==> FE[A.A.S. Frontend]
    FE ==> API[API / WebSocket]
    API ==> BE[Backend Control Plane]
    BE ==> PG[(Postgres Graph + Event Log)]
    BE ==> BUS[Redis / NATS Event Bus]
    BE ==> FR[Field Runtime]
    FR ==> HB[AAS-Hermes Bridge]
    HB ==> HE[Hermes Profiles / Kanban]
    HE ==> HB
    HB ==> FR
    FR ==> TOOLS[Specialized Tools]
    TOOLS ==> FR
    FR ==> BE
    BUS ==> FE
    BUS ==> HE
```

### 2.3.3 Core Runtime Objects

**Primary Node Ontology:** Architect Mode uses five hard-coded primary node types: Object, Subject, Vector, Boundary, and Seed. Object is objective outside truth. Subject is subjective inside truth. Vector is pushing design force. Boundary is restricting design force. Seed is generated design possibility. Normal workflow may evolve subcategories, but it should not create new primary node types. \
**Ontology Pipeline:** Object and Subject nodes provide input truth. The runtime and operator derive Vector and Boundary nodes from those truths. Vector and Boundary narrow the design field toward Seed nodes that can become architectural concepts, branches, artifacts, and commits. \
**WorldState:** Derived state of the design world compiled from canonical graph rows, commits, artifacts, preferences, and runtime events. It contains goal, intent, project status, branches, artifacts, committed decisions, unresolved tensions, available moves, blocked moves, metrics, events, questions, risks, feature state, design debt, trajectory, and the current Object/Subject/Vector/Boundary/Seed field condition. State is a snapshot/read model of the field, not a node type or truth store. \
**DirectionNode:** A compact editable design atom in Architect Mode with one fixed primary type: Object, Subject, Vector, Boundary, or Seed. A node may carry mutable subcategories, tags, confidence, payloads, artifacts, and metadata, but concepts, references, risks, questions, options, renders, models, files, and outputs are not extra primary node types. \
**DirectionLink:** A typed relationship between direction nodes, not a node. Link types include influence, dependency, evidence, reference, iteration, contradiction, lineage, transformation, and output flow. Link states include strong, weak, locked, provisional, inherited, and broken. \
**DirectionSnapshot:** A saved graph state containing node layout, active nodes, locks, links, collapsed parents, expanded branches, selected field mode, and the agent direction state at that moment. A snapshot records field condition; it is not a primary node. \
**ConceptState:** Lifecycle state for a Seed family, design option, branch, or concept family, such as active, dormant, rejected, archived, forked, or committed through the CommitmentLedger. \
**ValueVector:** A placement and scoring vector that explains why one node sits near another through shared meaning, pressure, dependency, reference, taste, constraint, confidence, or lineage. X/Y coordinates have no fixed semantic axis. \
**Affordance:** A meaningful available move with label, intent, primitive type, pattern ID, preconditions, expected gain, risk, cost, inputs, resulting artifacts, required profiles/tools, score breakdown, approval requirements, reversibility, and recommended role. \
**Move:** The selected execution intent and operation applied to the field. It references an affordance, records rationale and expected outcome, tracks approval state, maps to Hermes task bindings, and moves through queued, running, completed, failed, or cancelled statuses. Move is not stable field matter and is not a node type. \
**Command:** A validated backend write operation such as `create_node`, `update_node`, `move_node`, `delete_node`, `link_nodes`, `unlink_nodes`, `lock_node`, `change_status`, `merge_nodes`, `split_node`, `create_subcategory`, or `archive_subcategory`. Users and Hermes both write through the same command pipe. \
**AgentPatch:** A proposed set of operations with title, reason, operations, risk level, and status. Low-risk patches may auto-apply through commands; high-risk patches wait for approval. \
**MovePrimitive:** A stable operation type such as update intent, create artifact, refine artifact, validate, raise tension, resolve tension, spawn branch, develop branch, compare branches, merge branches, kill branch, ask user, propose commit, commit decision, revert commit, or request execution. \
**MovePattern:** A reusable architectural tactic with preconditions, inputs, outputs, expected effects, scoring hints, risk/cost model, execution template, validation tests, examples, success stats, lifecycle status, and version. \
**IntentGradient:** Multi-family score model for comparing moves across process, design, search, execution, user alignment, learning, governance, elegance, and penalties. \
**Feature Registry:** Typed registry of measurable design/process/execution variables, including source, range, confidence, artifact hooks, and measurement method. \
**Tension:** A structured design conflict linked to nodes, artifacts, branches, severity, status, possible resolutions, and evidence. Tension may expose risk or contradiction, but risk itself remains a condition, tag, warning, or subcategory attached to the affected matter. \
**Branch:** A competing design hypothesis usually organized around one or more Seed nodes, with artifacts, evidence, weaknesses, unresolved tensions, score, lifecycle status, and next recommended move. \
**Commit:** A decision that becomes project truth with rationale, evidence, consequences, affected artifacts, affected branches, reversibility, approval, and timestamp. \
**Agent Brief:** Distilled operating context for a specific agent role and move. \
**Trajectory:** History of WorldState snapshots, moves, decisions, abandoned branches, failed moves, unresolved design debts, and process landmarks.

### 2.3.4 Runtime Loop

**Main Loop:** The user sets or updates a goal through backend commands. The backend writes graph rows and events, publishes updates, and derives WorldState. The AffordanceCompiler generates moves from the Move Pattern Library. The ContextDistiller prepares a brief. The agent selects or proposes a move. The Supervisor validates it. The MoveCompiler compiles it into Hermes tasks. Hermes profiles execute. The bridge ingests logs and artifacts. Artifacts, tensions, branches, commits, feature scores, and events update through commands. The Critic/Evaluator measures results. New moves appear. \
**Agent Turn:** Prepare brief, present valid moves, select or propose move, validate move, compile Hermes task packet, execute, create patch or command, record result, evaluate, update backend graph, emit next situation. \
**Command Transaction:** Every mutation follows `validate -> transaction -> write graph row -> write runtime event -> publish event -> dashboard applies -> Hermes observes`. \
**User Intervention:** The user can approve or reject moves, change goals, elevate tensions, commit branches, freeze decisions, force validation, resolve preference conflicts, edit Architect Mode direction nodes, compose Draw Mode artifacts, or validate geometry in Model Mode.

```mermaid
%%{init: {'flowchart': {'arrowMarkerSize': 1.5}}}%%
flowchart LR
    WS[WorldState] ==> AC[AffordanceCompiler]
    AC ==> CD[ContextDistiller]
    CD ==> AG[Agent]
    AG ==> MV[Move / Patch]
    MV ==> SV[Supervisor]
    SV ==> CMD[Backend Command]
    CMD ==> PG[(Postgres Graph + Event Log)]
    PG ==> WS
    SV ==> MC[MoveCompiler]
    MC ==> HM[Hermes Kanban / Profiles]
    HM ==> CMD
    PG ==> CR[Critic / Evaluator]
    CR ==> WS
```

### 2.3.5 Move Execution Lifecycle

1. **Move Selection:** Agent selects a recommended affordance or proposes a new move with rationale. \
2. **Legality Check:** AffordanceCompiler validates preconditions, primitive type, and move pattern state. \
3. **Risk Check:** Supervisor checks approvals, cost, safety, reversibility, drift, preference scope, and conflicts with commits. \
4. **Context Load:** ContextDistiller and compiler load required inputs, artifact refs, scoped preferences, memory snippets, branch data, evaluator results, and constraints. \
5. **Task Compilation:** MoveCompiler creates a Hermes task group with task packets, assigned profiles, dependencies, output contracts, artifact roots, and expected feature deltas. \
6. **Execution:** Hermes profiles execute tasks. Specialized tools run only through typed task packets and move contracts. \
7. **Registration:** Outputs are stored as artifacts and linked to source artifacts, branches, tensions, commits, features, task bindings, and events. \
8. **Evaluation:** Artifact evaluators measure feature deltas, critique quality, and compare predicted effects to actual effects. \
9. **Backend Command:** Accepted outputs become backend commands or agent patches. Commands validate permissions, versions, and approval requirements before writing graph rows. \
10. **World Update:** The backend writes a runtime event, publishes it over the event bus, updates derived WorldState, updates move pattern stats, and regenerates available moves.

### 2.3.6 Move Pattern Library

**Three Layers:** Move primitives are stable system verbs. Move patterns are reusable architectural tactics. Move instances are concrete actions in the current WorldState. \
**Pattern Schema:** A pattern records ID, name, description, primitive type, domain, preconditions, inputs, outputs, effects, scoring hints, risk profile, cost model, execution template, validation tests, examples, success stats, lifecycle status, and version. \
**Lifecycle:** `discover -> propose -> sandbox -> critique -> validate -> promote -> monitor -> prune`. Agents may propose patterns, but they cannot directly promote them to stable. \
**Sandbox:** Patterns are tested against saved WorldState snapshots and synthetic worlds for schema validity, artifact creation, state improvement, no commit violation, and critic score. \
**Curator:** The Move Curator deduplicates, merges variants, deprecates weak patterns, updates examples, and keeps the active library small enough to remain useful. \
**Learning:** Move pattern statistics are conditional on context: phase, active tensions, branch count, artifact coverage, prior failures, user acceptance, reward, and feature deltas.

### 2.3.7 Process Grammar, Trajectory, and Design Debt

**Process Grammar:** A.A.S. uses a soft phase model rather than a rigid pipeline. Phases include intake, research, concept, branching, ground truth, development, representation, board assembly, QA, and delivery. \
**Phase Fit:** Each move pattern has a phase-fit curve, preferred phases, discouraged phases, entry conditions, exit conditions, required artifacts, and process debts. \
**Trajectory Memory:** Ranking depends on the path already taken: snapshots, moves, commits, abandoned branches, failures, unresolved debts, and landmarks. \
**Design Debt:** The runtime tracks unresolved obligations such as unconfirmed site assumptions, uncritiqued branches, missing ground truth, unchecked render/model consistency, board hierarchy gaps, or too many open branches. \
**Unlock Value:** Moves are scored not only by immediate gain but by future moves unlocked. A section anchor may outrank a render because it unlocks model, plan, section, render QA, and board coherence.

### 2.3.8 Branch Ecology

**Purpose:** Branches let the system develop competing architectural hypotheses instead of locking onto the first plausible idea. \
**Lifecycle:** `spawn -> develop -> critique -> compare -> kill / merge / commit`. \
**Scoring:** Branches are scored by goal fit, architectural coherence, representational strength, feasibility, novelty, user taste fit, ground-truth readiness, and total value. \
**Comparison:** Branch comparison should expose shared tensions, unique strengths, unresolved risks, artifact completeness, ground-truth readiness, and representation strength. \
**Governance:** Killing, merging, or committing high-value branches requires supervisor validation and may require user approval.

### 2.3.9 Tension Engine

**Detection:** Tensions are created when the system detects contradictions, unresolved tradeoffs, artifact conflicts, branch weaknesses, preference conflicts, or validation failures. \
**Resolution Moves:** The compiler generates moves that can resolve or defer tensions. \
**Blocking Rule:** Finalization should be blocked while critical unresolved tensions remain. \
**Artifact Links:** Tensions must link to affected artifacts and branches so downstream work knows what must change after resolution. \
**Resolved State:** Resolved tensions become evidence attached to commits and constraints.

### 2.3.10 Commitment Ledger

**Commit Rule:** Graph commands change current graph truth. Only commits change committed design truth. \
**Commit Contents:** A commit records decision, rationale, evidence, consequences, affected artifacts, affected branches, reversibility, approval source, approval reference, and timestamp. \
**Revert Rule:** Reverting a commit creates a new event and state transition. It does not delete history. \
**Downstream Enforcement:** ContextDistiller and Supervisor must check new moves against committed decisions. Conflicts become warnings, tensions, or blocked moves.

### 2.3.11 Scoring, Features, and Evaluators

**Score Families:** The serious scoring model is not one flat score. It combines process, design, search, execution, user alignment, learning, governance, elegance, and explicit penalties. \
**Feature Registry:** Every scoring variable must be registered with family, description, type, range, measurement method, source, and confidence. No registry means score soup. \
**Feature Methods:** Features can be deterministic, graph-derived, geometry-derived, embedding-derived, or evaluator-derived. \
**Evaluator Contracts:** Concept, plan, section, model, render, board, and QA evaluators output feature scores, evidence, confidence, and critique. \
**Sensitivity Matrix:** The runtime maintains expected effects from move patterns to features, compares predictions to measured deltas, and updates the effect model over time. \
**Elegance:** Elegance rewards leverage, compression, coherence gain, multi-tension resolution, artifact reuse, simplicity, downstream unlock density, and low fragmentation. \
**Closed-Loop Fine Tuning:** The system can target a feature vector, measure current feature state, compute an error vector, choose moves predicted to reduce the error, execute, measure, update, and repeat.

### 2.3.12 Context Distillation

**Brief Composition:** Agent Briefs include current goal, current intent, active branch, current tension, relevant commits, relevant artifacts, valid moves, blocked moves, output contract, warnings, feature pressures, and design debt. \
**Memory Use:** Memory retrieval is hidden infrastructure unless the move explicitly requires deeper search. \
**Reference Passing:** Large documents, images, models, and board packages are passed by reference. \
**Output Contracts:** Briefs define what the Hermes profile must return so A.A.S. can validate, register, evaluate, and update state. \
**Preference Scope:** The brief resolves user, team, project, session, and prompt preferences through scope rules and includes a source manifest for every preference that influenced the task.

### 2.3.13 Hermes Bridge and Execution Substrate

**Bridge Responsibilities:** The `aas-hermes-bridge` creates/syncs Hermes profiles, compiles A.A.S. moves into Kanban tasks, assigns profiles, links dependencies, starts or monitors dispatch, tails logs/comments, registers artifacts, and converts Kanban events into A.A.S. field events. \
**Task Packets:** Every Hermes task receives an A.A.S. packet containing move ID, world snapshot, profile, role, goal, active tension, relevant commits, allowed outputs, artifact write path, and completion contract. \
**Bindings:** A.A.S. tracks `HermesProfileBinding`, `KanbanTaskBinding`, and `AASMoveToKanbanPlan` records so every field move can be traced to execution tasks. \
**Control Model:** A.A.S. controls task topology, dependencies, approvals, artifact registration, command writes, and truth ledger. Hermes executes tasks, uses tools, writes comments/logs, updates task status, subscribes to project events, and submits patches or commands through the same backend API as users. \
**Hermes Worker Loop:** Hermes subscribes to project events, maintains a local graph cache, ignores agent-originated echo events where needed, debounces recompute for 1-3 seconds, runs ContextDistiller, retrieves memory, computes affordances, creates a patch, re-reads affected nodes, checks versions, and then applies or requests approval. \
**MVP Integration:** Start with CLI bridge, then add Kanban DB watcher, log/artifact watcher, profile pack manager, and later a direct Hermes plugin/API if stable.

### 2.3.14 Event System and Observability

**Stable Events:** A.A.S. emits product events such as `aas.world.updated`, `aas.direction.node.created`, `aas.direction.node.updated`, `aas.direction.node.moved`, `aas.direction.link.created`, `aas.affordances.generated`, `aas.move.proposed`, `aas.move.selected`, `aas.move.started`, `aas.move.completed`, `aas.move.failed`, `aas.agent_patch.created`, `aas.agent_patch.applied`, `aas.agent_patch.rejected`, `aas.tension.created`, `aas.tension.resolved`, `aas.branch.spawned`, `aas.branch.merged`, `aas.branch.committed`, `aas.commit.created`, `aas.artifact.created`, `aas.evaluation.completed`, `aas.supervisor.warning`, and `aas.user.approval.required`. \
**Hermes Event Translation:** Kanban ready/running/blocked/done/failed/retry, task comments, worker heartbeat, task logs, and artifact paths are translated into stable A.A.S. events. \
**Replay:** Runtime events plus WorldState and DirectionSnapshot records should reconstruct the design field for debugging, review, and direction-state comparison. \
**Reconnect:** Dashboard and Hermes send `last_event_id` on reconnect. The backend sends missed events when available; if the gap is too old, it sends a full snapshot and resumes streaming from the new event cursor. \
**Undo and Audit:** Undo is modeled as inverse commands and new events. Audit uses actor, operation, payload, before hash, after hash, and timestamps; history is never deleted to hide a prior state.

### 2.3.15 API Surface

**World State:** `GET /api/projects/:projectId/sessions/:sessionId/world`, `POST /api/projects/:projectId/sessions/:sessionId/world/recompute`, and snapshot routes. \
**Command API:** `POST /api/projects/:projectId/commands` accepts command operations with actor, affected IDs, expected versions where required, payload, and idempotency key. \
**Direction Graph:** List, create, patch, delete, duplicate, lock, fork, collapse, expand, compare, and link direction nodes through commands; save and restore direction snapshots; set field modes; inspect Agent Direction State and Design Exploration Graph outputs. \
**Affordances:** List, recompute, approve, and reject available moves. \
**Moves:** Create, inspect, execute, cancel, and retry moves. \
**Move Patterns:** List, propose, sandbox, validate, promote, deprecate, and inspect move patterns and success stats. \
**Features and Evaluations:** List feature registry entries, evaluator results, score breakdowns, sensitivity matrix entries, and measured deltas. \
**Tensions:** List, create, patch, resolve, and defer tensions. \
**Branches:** List, create, develop, critique, kill, merge, and commit branches. \
**Commits:** List, create, and revert commits. \
**Agent Patches:** Create, inspect, apply, reject, and annotate patches; low-risk patches may auto-apply while high-risk patches require approval. \
**Agent Briefs:** Generate and inspect briefs for agent turns. \
**Hermes Bridge:** Inspect profile bindings, Kanban task bindings, task packets, task logs, and bridge status.

### 2.3.16 Persistence Model

**Core Tables:** `projects`, `sessions`, `world_states`, `direction_nodes`, `direction_links`, `direction_snapshots`, `node_subcategories`, `concept_states`, `value_vectors`, `affordances`, `moves`, `move_patterns`, `move_pattern_stats`, `feature_registry`, `feature_scores`, `evaluations`, `sensitivity_matrix`, `design_debts`, `process_landmarks`, `trajectories`, `tensions`, `branches`, `commits`, `artifacts`, `artifact_links`, `runtime_events`, `agent_patches`, `agent_briefs`, `move_executions`, `branch_scores`, `intent_scores`, `preferences`, `approvals`, `hermes_profile_bindings`, and `kanban_task_bindings`. \
**Required Version Fields:** Direction nodes and links carry `version`, `created_by`, and `updated_by`. Runtime events carry `actor_type`, `actor_id`, `operation`, `payload`, `before_hash`, `after_hash`, and `created_at`. \
**Snapshots:** Store periodic WorldState and direction graph JSON snapshots for replay, reconnect fallback, debugging, and move sandboxing. \
**Normalized Records:** Normalize core objects while keeping payload JSON for evolving move, branch, tension, scoring, feature, evaluation, and bridge details. \
**Artifact Lineage:** Artifacts link to source artifacts, branches, tensions, commits, moves, Hermes tasks, feature evaluations, and validations.

### 2.3.17 External Tool Integration

**Hermes:** MoveCompiler and the bridge use Hermes for profile execution, Kanban task coordination, profile memory/skills, logs, worker processes, and tool access. \
**Rhino Compute:** Geometry computation is invoked through model-related moves, not exposed as a raw everyday agent choice. \
**GPT Image V2:** Image generation is invoked through moves such as atmosphere studies, render refinement, board layout options, and consistency QA. \
**Validators:** Segmentation, model checks, drawing cuts, render consistency checks, evaluator reports, and board QA are validation moves linked to artifacts and commits.

### 2.3.18 Failure and Recovery Model

**Move-Local Recovery:** Failed moves can be retried, cancelled, corrected, or replaced without resetting the entire project. \
**State Preservation:** Failed outputs remain inspectable as artifacts or events where useful. \
**Supervisor Escalation:** High-risk failures, unresolved critical tensions, contradiction with commits, risky preference conflicts, or expensive reruns require supervisor review and sometimes user approval. \
**Blocked Moves:** Moves that fail preconditions should remain visible as blocked moves with clear reasons. \
**Task Recovery:** Hermes task failure, heartbeat loss, block, retry, and cancellation are translated into move status and supervisor warnings. \
**Conflict Recovery:** Position edits may use last-write-wins. Semantic edits such as title, summary, type, status, lock, merge, split, or deletion require `expectedVersion`; mismatches return `409`, forcing the agent to re-read, re-plan, retry, or create a suggestion. \
**Learning From Failure:** Failed moves update contextual outcome stats and may produce Curator work to revise or deprecate weak patterns.

### 2.3.19 Four Workspace Authoring Surface

**Architect Mode:** The primary direction surface is a flat 2D graph where users manipulate Object, Subject, Vector, Boundary, and Seed nodes plus links, locks, parent-child expansions, soft cluster overlays, field modes, branches, tensions, references, evidence, output goals, and direction snapshots. There is no central intent node and no fixed X/Y axis meaning. \
**Draw Mode:** The visual authoring surface handles boards, image bays, plan/section compositions, material swatches, prompt notes, references, sketches, diagrams, and deterministic board packages. \
**Model Mode:** The spatial validation surface handles ground-truth geometry, section cuts, plan cuts, area checks, model versions, and geometry-derived feature readouts. \
**Chat Mode:** The conversational surface explains moves, asks questions, resolves approvals, shows rationale, and keeps operator steering tied to WorldState and the direction graph. \
**Shared Inspector:** Selecting any object in any workspace can expose scores, rationale, linked artifacts, logs, approvals, raw JSON, lineage, and affected commits.

### 2.3.20 Anti-Patterns

**Static Pipeline as Primary Interface:** Do not make the human predict the full workflow before the design task unfolds. \
**Raw Tool Selection:** Do not expose low-level tool choice as the normal agent decision surface. \
**Unscored Moves:** Do not hide why a move is recommended, blocked, risky, expensive, elegance-positive, or approval-gated. \
**Chat as State:** Do not rely on chat history as the source of truth. \
**Artifact Without Lineage:** Do not create outputs that cannot be traced back to moves, branches, tensions, commits, source artifacts, evaluations, or Hermes tasks. \
**Finalization With Critical Tensions:** Do not finalize boards or delivery outputs while unresolved critical tensions remain. \
**A.A.S. Rebuilding Kanban:** Do not duplicate Hermes Kanban inside A.A.S. Use Hermes as execution substrate and keep A.A.S. focused on design semantics. \
**Unregistered Score Variables:** Do not add scoring variables that have no Feature Registry entry, source, measurement method, or confidence. \
**Unvalidated Learned Moves:** Do not let an agent promote a new move pattern directly into stable use without schema validation, sandbox tests, critic review, and supervisor approval.
**Ungoverned Ontology Drift:** Do not create new primary node types for workflow objects, file formats, questions, risks, options, moves, links, or state snapshots. Use the five primary types with live subcategories, tags, relations, and payloads.
