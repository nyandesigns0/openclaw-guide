# Chapter 4.1 - Implementation Plan

## 4.1.0 Overview

This chapter defines how to build A.A.S. in practical, demo-able phases. It is not a time schedule. It is a work-division plan: each phase should produce a usable prototype that stays aligned with the final A.A.S. philosophy, architecture, ownership boundaries, and system model described in Chapters 1-3.

Early prototypes may be incomplete, but they must not contradict the final architecture:

**A.A.S. owns product truth and design intelligence.** \
**Hermes owns durable specialist-agent execution.** \
**The bridge connects A.A.S. moves to Hermes work.** \
**The frontend never controls Hermes directly.** \
**Memory, chat, logs, and raw files do not replace backend truth.**

### 4.1.1 Implementation Principles

**Demo-able Slices:** Every phase should produce something that can be opened, inspected, and demonstrated. A prototype can be narrow, but it must show a real system loop. \
**No Architecture Forks:** Temporary scaffolding is allowed only when it clearly serves the final architecture and does not redefine what A.A.S. is. \
**Truth First:** Backend command truth, events, artifacts, approvals, versions, and lineage come before advanced automation. \
**Bridge Before Autonomy:** Hermes integration should pass through task packets, task bindings, artifact registration, and event translation before deeper automation is trusted. \
**Meaningful Moves:** The user and agents should interact through architectural moves, not raw tools. \
**Inspectable State:** Every phase should preserve enough state, event, artifact, and approval history to debug what happened. \
**Prototype Honesty:** A phase may simulate a worker, evaluator, renderer, or tool, but the simulation must occupy the same contract that the final service will use.

### 4.1.2 Phase Map

| Phase | Area | Prototype Goal | Depends On |
|-------|------|----------------|------------|
| A | Foundation Truth | A backend-controlled project can persist graph records, events, artifacts, approvals, and snapshots | None |
| B | Workspace Skeleton | Chat, Draw, Model, and Architect can read the same project state and submit backend commands | A |
| C | Field Runtime Core | WorldState, feature registry, affordances, and move scoring produce meaningful next moves | A, B |
| D | Move Library | Stable primitives and seeded architectural move patterns generate concrete move instances | A, C |
| E | Hermes Bridge | A selected move becomes Hermes work and returns status, logs, artifacts, and structured output | A, D |
| F | Context and Memory | Agent Briefs, scoped preferences, retrieval context, profile packs, and skill packs shape execution safely | A, D, E |
| G | Evaluation and Artifacts | Artifacts are evaluated, versioned, linked, validated, and used in downstream moves | A through F |
| H | Branches, Tensions, and Commits | Branch ecology, tension resolution, and Commitment Ledger govern design truth | A through G |
| I | Hardening and Replay | Recovery, audit, undo, replay, finalization gates, and supervisor warnings work end to end | A through H |
| J | Search, Learning, and Curation | Quality-diversity, information gain, novelty, bandits, trace mining, and curator promotion improve move selection | A through I |
| K | Cleaner Hermes Surfaces | MCP, plugin, or direct API integration can replace bridge internals without changing A.A.S. contracts | E through J |

### 4.1.3 Phase A - Foundation Truth

**Goal:** Establish A.A.S. product truth before runtime intelligence.

**Build Scope:** Product database, command envelope, project records, direction graph records, runtime events, artifact records, approvals, versions, preferences, snapshots, and basic query APIs. \
**Canonical Records:** `projects`, `sessions`, `direction_nodes`, `direction_links`, `node_subcategories`, `direction_snapshots`, `runtime_events`, `artifacts`, `artifact_links`, `approvals`, `preferences`, and `world_states`. \
**Command Pipe:** All user, frontend, Hermes, system, and maintenance writes enter one validation path. \
**Event Rule:** Every accepted mutation follows `validate -> transaction -> write records -> write event -> refresh read model`. \
**Demo Prototype:** Create a project, add Object/Subject/Vector/Boundary/Seed nodes, link nodes, save a snapshot, register an artifact, create an approval, and inspect the resulting event history. \
**Acceptance Test:** Product state can be reconstructed from records plus events, and no workspace or worker bypasses backend truth.

### 4.1.4 Phase B - Workspace Skeleton

**Goal:** Give the operator the four A.A.S. workspaces as separate views into the same project truth.

**Build Scope:** Chat, Draw, Model, Architect, shared inspector, artifact browser, approval controls, event/status area, and workspace hydration. \
**Architect Prototype:** Flat 2D direction field with five primary node types, links, locks, subcategories, snapshots, field modes, and Agent Direction State preview. \
**Chat Prototype:** Conversation surface that can submit commands, present move cards, request approvals, and link messages to records. \
**Draw Prototype:** Board canvas that places artifacts, references, image bays, prompt notes, and layout frames with lineage. \
**Model Prototype:** Model workspace that can show geometry status, model artifacts, validation results, and geometry-derived feature placeholders. \
**Demo Prototype:** One project can be opened across all four workspaces; editing in one workspace updates backend events and refreshes the others. \
**Acceptance Test:** No workspace stores independent project truth.

### 4.1.5 Phase C - Field Runtime Core

**Goal:** Turn project truth into meaningful next moves.

**Build Scope:** WorldState compiler, feature registry, feature scores, affordance generation, blocked moves, basic IntentGradient score breakdowns, and move explanation cards. \
**WorldState Contents:** Goal, intent, project status, active branch, branches, artifacts, committed decisions, unresolved tensions, available moves, blocked moves, constraints, success metrics, feature state, design debt, recent events, open questions, risks, and direction field condition. \
**Scoring Foundation:** Expected utility gain plus information gain and novelty, minus risk, cost, and constraint violation. \
**Demo Prototype:** A project with incomplete Object/Subject truth produces ask-user, research, concept, validation, and artifact-generation moves with visible reasons. \
**Acceptance Test:** The system can explain why a move is available, blocked, risky, expensive, approval-gated, or useful.

### 4.1.6 Phase D - Move Library

**Goal:** Standardize stable primitives and seed reusable architectural move patterns.

**Primitive Set:** Update intent, create artifact, refine artifact, validate, ask user, raise tension, resolve tension, spawn branch, develop branch, compare branches, merge branches, kill branch, propose commit, commit decision, revert commit, and request execution. \
**Pattern Shape:** ID, name, description, primitive, domain, preconditions, inputs, outputs, effects, scoring hints, risk profile, cost model, execution template, validation tests, examples, success stats, lifecycle status, and version. \
**Predicate Rule:** Preconditions use constrained predicates rather than arbitrary custom code. \
**Effect Rule:** Effects are typed: create artifact, create branch, update tension, propose commit, create affordance, update feature estimate, or require approval. \
**Seed Patterns:** Intake, research, concept, tension, branch, ground truth, model, drawing, render, board, QA, and commit work. \
**Demo Prototype:** A selected WorldState produces move instances from seeded patterns and can convert one move into an execution plan. \
**Acceptance Test:** Move instances are generated from governed patterns, not ad hoc prompt text.

### 4.1.7 Phase E - Hermes Bridge

**Goal:** Connect A.A.S. backend truth to Hermes execution without exposing Hermes directly to the frontend.

**Build Scope:** Profile bindings, task packets, task bindings, bridge configuration, CLI/API surface, Kanban watcher, log watcher, artifact watcher, status translation, and bridge events. \
**Bridge Shape:** `Frontend -> A.A.S. Backend -> A.A.S.-Hermes Bridge -> Hermes CLI / Kanban / logs / profiles -> Hermes workers`. \
**Task Packet:** Move ID, WorldState snapshot reference, Agent Brief, profile, role, active tension, relevant commits, allowed outputs, artifact root, completion contract, and safety rules. \
**Log Events:** Translate worker logs/comments into stable events such as move started, move progress, move completed, move failed, artifact created, approval required, and supervisor warning. \
**Demo Prototype:** A move creates Hermes work, a profile receives a packet, task status returns through bindings, an artifact is registered, and WorldState updates. \
**Acceptance Test:** The frontend never calls Hermes directly, and Hermes outputs become A.A.S. records only through bridge-controlled registration and commands.

### 4.1.8 Phase F - Context and Memory

**Goal:** Give agents enough context to work without letting memory become project truth.

**Build Scope:** ContextDistiller, Agent Briefs, scoped preference records, preference precedence, source manifests, memory retrieval, profile packs, skill packs, and output contracts. \
**Agent Brief:** Goal, task intent, relevant truth, active branch, active tension, commits, artifacts, valid moves, blocked moves, output contract, warnings, and source manifest. \
**Preference Rule:** Prompt overrides session where allowed; session overrides project context where allowed; project commits override user preference; user preference and team standards are scoped and source-tracked. \
**Memory Rule:** Graph truth can create memory cards. Memory can inform retrieval. Agents return patches. Commands update graph truth. Memory never mutates graph truth directly. \
**Demo Prototype:** A profile receives a compact brief with scoped preferences and returns a structured patch or artifact without seeing unrelated memory. \
**Acceptance Test:** Every preference used in a task has source, scope, and visibility.

### 4.1.9 Phase G - Evaluation and Artifacts

**Goal:** Make outputs useful, traceable, validated, and reusable.

**Build Scope:** Artifact versioning, artifact lineage, validators, evaluator contracts, model checks, render checks, board packages, previews, exports, and validation gates. \
**Evaluator Contracts:** Concept, plan, section, model, render, board, and QA evaluators output feature scores, evidence, confidence, critique, warnings, and suggested follow-up moves. \
**Artifact Lineage:** Artifacts link to source artifacts, branches, tensions, commits, moves, Hermes tasks, feature evaluations, and validations. \
**Draw Integration:** Board packages can assemble references, plans, sections, renders, diagrams, prompts, and captions into deterministic outputs. \
**Model Integration:** Model artifacts can produce plan cuts, section cuts, area checks, view/privacy checks, and render-perspective validation. \
**Demo Prototype:** A generated artifact is registered, evaluated, linked to a branch and move, displayed in Draw or Model, and used to generate the next move set. \
**Acceptance Test:** No artifact is accepted without metadata, lineage, and state.

### 4.1.10 Phase H - Branches, Tensions, and Commits

**Goal:** Govern design exploration and committed truth.

**Build Scope:** Branch lifecycle, branch scoring, tension creation and resolution, tension energy, comparison views, commit creation, commit enforcement, revert logic, and finalization gates. \
**Branch Lifecycle:** Spawn, develop, critique, compare, kill, merge, and commit. \
**Tension Lifecycle:** Detect, link evidence, score severity, generate resolution moves, defer, resolve, or block finalization. \
**Commit Contents:** Decision, rationale, evidence, consequences, affected artifacts, affected branches, reversibility, approval source, approval reference, and timestamp. \
**Demo Prototype:** Create three concept branches from one tension, critique them, compare them, commit one decision, and show how downstream moves obey the commit. \
**Acceptance Test:** Speculative branch output never silently becomes project truth.

### 4.1.11 Phase I - Hardening and Replay

**Goal:** Make A.A.S. recoverable, auditable, and safe for real design work.

**Build Scope:** Conflict recovery, expected versions, undo, replay, event cursors, snapshot recovery, failed move recovery, stale client recovery, bridge failure recovery, supervisor warnings, and finalization gates. \
**Undo Rule:** Undo is an inverse command that creates a new event. It does not erase history. \
**Conflict Rule:** Semantic edits require expected versions. Conflicts force re-read, re-plan, retry, or user resolution. \
**Failure Rule:** Failed moves can be retried, cancelled, corrected, replaced, or converted into recovery moves without resetting the project. \
**Demo Prototype:** Force a version conflict, recover it, replay a move sequence from events, and recover from a failed Hermes task with artifact preservation. \
**Acceptance Test:** Failed work remains inspectable and does not corrupt product truth.

### 4.1.12 Phase J - Search, Learning, and Curation

**Goal:** Improve creative exploration and move quality from trace evidence.

**Build Scope:** Quality-diversity branch archive, information gain scoring, novelty scoring, contextual bandits, surrogate effect models, trace mining, sandbox worlds, curator review, pattern promotion, pattern pruning, and pattern statistics. \
**Quality-Diversity:** Maintain branch archives across behavior dimensions such as openness, privacy, sectional depth, courtyardness, thermal strategy, structural expression, material strategy, and program compactness. \
**Information Gain:** Rank ask-user, research, validation, precedent, model check, and critique moves by expected uncertainty reduction. \
**Move Pattern Lifecycle:** Discover, propose, sandbox, critique, validate, promote, monitor, and prune. \
**Curator Rule:** Agents may propose move patterns, but only validation, sandbox results, critic review, and supervisor approval can promote them. \
**Demo Prototype:** Mine repeated successful move traces into a proposed pattern, test it against saved worlds, and promote or reject it with evidence. \
**Acceptance Test:** Learned or proposed moves cannot bypass governance.

### 4.1.13 Phase K - Cleaner Hermes Surfaces

**Goal:** Improve Hermes integration without changing A.A.S. product contracts.

**Build Scope:** Hermes skill/profile pack, MCP surface, Hermes plugin, or direct HTTP/WebSocket API if stable and useful. \
**Abstraction Rule:** CLI, MCP, plugin, or direct API can change underneath the bridge. Frontend and A.A.S. product APIs should not change. \
**Profile Pack:** Ship task-packet reading, artifact writing, structured event emission, output contract, and behavior rules as Hermes profile/skill assets. \
**Demo Prototype:** Replace one bridge internal surface while preserving task packets, task bindings, artifact registration, and A.A.S. event contracts. \
**Acceptance Test:** Cleaner Hermes integration does not move project truth into Hermes.

### 4.1.14 Recommended Build Order

1. Build Phase A foundation truth.
2. Build Phase B workspace skeleton.
3. Build Phase C Field Runtime core.
4. Build Phase D move library.
5. Build Phase E Hermes bridge.
6. Build Phase F context and memory.
7. Build Phase G evaluation and artifacts.
8. Build Phase H branches, tensions, and commits.
9. Build Phase I hardening and replay.
10. Build Phase J search, learning, and curation.
11. Build Phase K cleaner Hermes surfaces.

The first complete demonstration loop is:

```text
command
  -> graph row
  -> event
  -> WorldState
  -> affordance
  -> move
  -> Hermes task
  -> log / artifact
  -> bridge event
  -> artifact registration
  -> evaluation
  -> next WorldState
```

### 4.1.15 Milestone Summary

| Milestone | Phases | Demo Acceptance |
|-----------|--------|-----------------|
| M0 - Truth Foundation | A | Commands write product records and runtime events; WorldState derives from backend truth |
| M1 - Workspace Loop | A, B | Chat, Draw, Model, and Architect read/write through the same backend state |
| M2 - Useful Moves | A-D | Affordance cards show legal moves with score breakdowns and expected outputs |
| M3 - Hermes Loop | A-E | A move creates Hermes work, streams status, registers artifacts, and updates move state |
| M4 - Context-Safe Agents | A-F | Agents receive compact briefs with scoped preferences and return structured output |
| M5 - Artifact Intelligence | A-G | Artifacts are registered, validated, linked, scored, and reused in downstream moves |
| M6 - Governed Design Truth | A-H | Branches, tensions, approvals, commits, and finalization gates work together |
| M7 - Resilient Runtime | A-I | Replay, conflicts, failed tasks, reverts, and stale clients recover without truth loss |
| M8 - Creative Search | A-J | Branch archive, novelty, information gain, and trace-derived patterns influence move ranking |
| M9 - Cleaner Execution Integration | A-K | MCP/plugin/direct API can replace bridge internals without changing A.A.S. contracts |
