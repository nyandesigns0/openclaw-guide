# Chapter 3.5 - Backend

## 3.5.0 Overview

The A.A.S. backend is the control plane for the Field Runtime. It persists product state, serves the frontend, emits events, stores artifacts, governs approvals, resolves scoped preferences, compiles moves into Hermes task groups, and bridges typed moves to Hermes and specialized tools.

### 3.5.1 Technology Stack

**Runtime Framework:** TypeScript backend service suitable for local-first development, with schema validation, background workers, file watching, and streaming support. \
**ORM and Database:** Prisma ORM with SQLite for local-first development and an upgrade path to Postgres for hosted or multi-user deployments. \
**Hermes Bridge:** Starts with CLI/task packet integration, then adds Kanban DB watching, log/artifact watching, profile pack sync, and eventually direct plugin/API integration if stable. \
**Shared Contracts:** DTOs, enums, event types, runtime object shapes, move types, pattern schemas, feature schemas, score payloads, preference records, bridge bindings, and artifact contracts should be defined in shared TypeScript contracts. \
**Artifact Storage:** Artifact bodies, generated files, media assets, model outputs, render outputs, evaluator reports, validation reports, task packets, and exports live under a managed storage directory. \
**Streaming:** Server-Sent Events or WebSocket streaming broadcasts stable A.A.S. events and translated Hermes task events to the frontend.

### 3.5.2 Data Persistence

**Core Entities:** Projects, sessions, WorldState snapshots, affordances, moves, move patterns, move pattern stats, feature registry entries, feature scores, evaluations, sensitivity matrix entries, design debts, process landmarks, trajectories, tensions, branches, commits, preferences, artifacts, artifact links, runtime events, agent briefs, move executions, branch scores, intent scores, approvals, Hermes profile bindings, Kanban task bindings, and task packets. \
**WorldState Snapshots:** Store periodic JSON snapshots for replay, debugging, scoring, move sandboxing, and recovery. \
**Normalized Objects:** Branches, tensions, commits, artifacts, moves, approvals, preferences, features, evaluations, events, and Hermes bindings should be normalized while keeping flexible payload JSON for evolving runtime details. \
**Artifact Lineage:** Each artifact can link to source artifacts, originating move, Hermes task, affected branch, related tension, commit, evaluator result, agent/profile, validation status, and storage path. \
**Commit Ledger:** Commits are persisted as first-class project-truth records and are never silently overwritten. \
**Preference Store:** Preferences are scoped by tenant/user/team/project/session/agent profile, filtered before retrieval, resolved deterministically, and logged with source manifests when used.

### 3.5.3 API Surface

**Bootstrap and Health:** `GET /api/health` and `GET /api/bootstrap` for initial project/session/world hydration, bridge status, and mode data. \
**World State:** `GET /api/projects/:projectId/sessions/:sessionId/world`, `POST /api/projects/:projectId/sessions/:sessionId/world/recompute`, and world snapshot routes. \
**Affordances:** List, recompute, approve, and reject available moves. \
**Moves:** Create, inspect, execute, cancel, and retry moves; inspect score breakdown, expected feature effects, and task bindings. \
**Move Patterns:** List, propose, sandbox, validate, promote, deprecate, merge, and inspect move patterns and success stats. \
**Features and Evaluations:** List feature registry entries, evaluator outputs, score breakdowns, sensitivity matrix entries, target feature vectors, and measured deltas. \
**Tensions:** List, create, patch, resolve, and defer tensions. \
**Branches:** List, create, develop, critique, compare, kill, merge, and commit branches. \
**Commits:** List, create, and revert commits. \
**Preferences:** List allowed preferences, create session preferences, propose inferred preferences, promote to project/team where approved, resolve conflicts, and forget where allowed. \
**Agent Briefs:** Generate and inspect Agent Briefs for role-specific turns. \
**Artifacts and Events:** List artifacts, fetch artifact metadata/content, stream events, inspect lineage, and inspect evaluator reports. \
**Hermes Bridge:** Inspect profile bindings, Kanban task bindings, task packets, task logs, bridge watcher state, and dispatcher status.

### 3.5.4 Field Runtime Services

**AffordanceCompiler:** Reads WorldState, process grammar, trajectory, design debt, feature state, move library, and scoped preferences to generate available and blocked moves with score breakdowns. \
**ContextDistiller:** Produces Agent Briefs from WorldState, memory, scoped preferences, artifacts, commits, tensions, evaluations, events, and output contracts. \
**IntentGradient:** Scores move candidates across process, design, search, execution, user alignment, learning, governance, elegance, and explicit penalties. \
**ProcessGrammar:** Tracks soft phase, landmarks, entry/exit conditions, preferred moves, discouraged moves, and process maturity. \
**DesignDebtTracker:** Tracks unresolved obligations and ranks moves that reduce high-payoff debt. \
**MovePatternLibrary:** Stores primitives, reusable architectural tactics, effect priors, execution templates, validation tests, examples, and stats. \
**MoveCompiler:** Maps moves to Hermes task packets, task groups, dependencies, profiles, expected artifacts, expected feature effects, and completion contracts. \
**FeatureRegistry:** Defines registered variables, measurement methods, sources, confidence, range, and artifact hooks. \
**EvaluatorRegistry:** Runs concept, plan, section, model, render, board, and QA evaluators to produce feature scores, evidence, confidence, and critique. \
**TensionEngine:** Detects contradictions, links affected objects, tracks resolution status, and generates resolution moves. \
**BranchEcology:** Spawns, develops, critiques, compares, kills, merges, and commits branches. \
**CommitmentLedger:** Creates, enforces, and reverts project-truth decisions through evented state transitions. \
**Critic, Supervisor, and Curator:** Separate design quality critique, process governance, approvals, pattern lifecycle, risk, legality, drift, and finalization gates.

### 3.5.5 Hermes, Compute, and Generation Integration

**Hermes Integration:** MoveCompiler dispatches work through Hermes Kanban tasks and profile assignments. The bridge captures task state, comments, logs, artifacts, heartbeats, blocks, retries, and completions. \
**Profile Pack Manager:** A.A.S. can sync base and project-scoped Hermes profiles from A.A.S. agent definitions, role files, skills, allowed tools, and profile settings. \
**Rhino Compute:** Geometry work is invoked through model moves for massing, plan cuts, section cuts, area checks, view/privacy analysis, rebuilds, and spatial validation. \
**GPT Image V2:** Image generation is invoked through representation moves, using branch state, commits, feature targets, visual constraints, and ground-truth references. \
**Deterministic Renderer:** Board assembly uses structured board packages and deterministic rendering for repeatable PNG/PDF outputs. \
**Validation and Evaluation Services:** Segmentation, geometry checks, artifact completeness checks, render consistency checks, design feature evaluators, and board QA produce validation artifacts and events.

### 3.5.6 Event System

**Event Normalization:** Runtime, evaluator, and Hermes events are converted into stable A.A.S. product events before storage and broadcast. \
**Core Events:** `aas.world.updated`, `aas.affordances.generated`, `aas.move.proposed`, `aas.move.selected`, `aas.move.started`, `aas.move.completed`, `aas.move.failed`, `aas.pattern.proposed`, `aas.pattern.promoted`, `aas.evaluation.completed`, `aas.feature.delta.measured`, `aas.tension.created`, `aas.tension.resolved`, `aas.branch.spawned`, `aas.branch.developed`, `aas.branch.critiqued`, `aas.branch.killed`, `aas.branch.merged`, `aas.branch.committed`, `aas.commit.created`, `aas.commit.reverted`, `aas.artifact.created`, `aas.preference.conflict`, `aas.supervisor.warning`, and `aas.user.approval.required`. \
**Hermes Events:** Kanban ready, running, heartbeat, blocked, comment, complete, failed, retry, cancelled, and log updates are translated into A.A.S. move/task events. \
**Audit Trail:** Events include project ID, session ID, move ID, pattern ID, task ID, profile ID, agent attribution, timestamps, payloads, and links to affected artifacts or state objects. \
**Frontend Sync:** Events update the Field Navigator, Chat, Model Mode, Trace View, Move Library View, inspectors, and approval surfaces.

### 3.5.7 Storage Model

**Storage Root:** All durable application files live under `storage/` with subdirectories for database files, uploads, projects, world snapshots, task packets, generated artifacts, models, renders, boards, evaluator reports, thumbnails, cache, and logs. \
**Immutable Uploads:** Uploaded references are stored as immutable originals. \
**Revisioned Artifacts:** Generated outputs are stored as distinct revisions linked by lineage. \
**Run, Move, and Task Organization:** Move outputs can be grouped by project, session, branch, move ID, and Hermes task ID for inspection and replay. \
**Media Serving:** The UI consumes backend-served URLs and metadata, not raw filesystem paths.

### 3.5.8 Bootstrap and Seeding

**Initial Project:** Seed a default project with an initialized WorldState rather than a static pipeline graph. \
**Initial Moves:** Seed deterministic first moves such as normalize brief, ask blocking clarification, generate concept branches, run precedent scan, define success metrics, and identify design tensions. \
**Initial Move Library:** Seed stable primitives and a first architectural move pattern set for intake, research, concept, branch, ground truth, representation, QA, and commit workflows. \
**Initial Feature Registry:** Seed core features such as goal alignment, concept strength, spatial coherence, artifact completeness, ground-truth readiness, drawing consistency, tension reduction, branch diversity, user alignment, cost, risk, and elegance. \
**Demo Field:** Seed example branches, tensions, commits, artifacts, feature scores, and evaluations only when useful for local demo mode. \
**Idempotence:** Bootstrap must never overwrite existing projects, artifacts, commits, preferences, pattern stats, or world history.

### 3.5.9 Failure and Recovery

**Move-Local Recovery:** Retry, cancel, correct, or replace failed moves without resetting the whole project. \
**Blocked Moves:** Preserve blocked moves with reasons so the operator can see what preconditions are missing. \
**Hermes Recovery:** Task block, failure, heartbeat loss, retry, cancellation, or missing artifacts are translated into move status, supervisor warnings, and recovery affordances. \
**Supervisor Warnings:** Drift, unresolved critical tensions, commit conflicts, preference conflicts, risky tool execution, and finalization problems emit warnings and may block execution. \
**Reversibility:** Major moves declare whether they are reversible. Reverts create events and new state transitions rather than deleting history. \
**Artifact Preservation:** Failed or low-quality outputs can remain as evidence, comparison material, evaluator input, or QA references. \
**Learning From Failure:** Failed move patterns update contextual stats and may trigger curator review, stricter validation tests, or deprecation.
