# Chapter 3.6 - A.A.S. Backend

## 3.6.0 Overview

The A.A.S. backend is the canonical control plane for the Autonomous Architectural System. It owns product truth, validates all writes, derives WorldState, records events, manages artifacts, governs approvals, coordinates Field Runtime services, and dispatches execution through the A.A.S.-Hermes Bridge.

Hermes execution internals, profile memory, skills, Kanban state, logs, and runtime bridge surfaces are covered in Chapter 2. This chapter covers the A.A.S. backend side: truth, commands, schemas, APIs, events, storage, governance, and recovery.

### 3.6.1 Backend Truth Model

The A.A.S. backend owns canonical product truth.

**Source of Truth:** Product graph rows plus runtime events are canonical operational truth. \
**Derived State:** WorldState, Agent Direction State, Design Exploration Graph, feature pressures, available moves, and dashboard views are derived from canonical records. \
**Commit Gate:** Valid commands can change working graph truth. CommitmentLedger commits change committed design truth. \
**Single Write Pipe:** User actions, frontend gestures, Hermes outputs, agent patches, maintenance jobs, and tool results all enter the same backend validation path. \
**No Direct State Path:** Frontend, Hermes, memory stores, local caches, and external tools do not write product truth directly.

```text
Frontend / User
  -> Backend command API
  -> validation
  -> transaction
  -> product records
  -> runtime event
  -> derived WorldState
  -> event stream
  -> frontend and Hermes subscribers
```

### 3.6.2 Backend Responsibilities

**Project Records:** Projects, sessions, workspace state, active run state, and project metadata. \
**Direction Records:** Direction nodes, direction links, subcategories, snapshots, locks, confidence, and versions. \
**Runtime Records:** WorldState snapshots, affordances, moves, move executions, feature scores, evaluations, tensions, branches, commits, approvals, and runtime events. \
**Artifact Records:** Uploaded and generated files, lineage, metadata, previews, validation status, branch links, move links, commit links, and Hermes task links. \
**Preference Records:** User, team, project, session, prompt, and agent-profile preferences with scope, source, visibility, precedence, confidence, and expiry. \
**Bridge Records:** Hermes profile bindings, task bindings, task packets, task status, bridge events, log summaries, and artifact ingestion records. \
**API Contracts:** Typed query, command, move, approval, artifact, event, and bridge routes. \
**Governance:** Permission checks, approval gates, version conflicts, soft locks, finalization gates, and recovery decisions.

### 3.6.3 Canonical Schema Shape

The backend schema should normalize stable entities while allowing payload JSON for evolving design-intelligence details.

**Core Product:** `projects`, `sessions`, `project_members`, `workspace_states`. \
**Direction Graph:** `direction_nodes`, `direction_links`, `node_subcategories`, `direction_snapshots`, `concept_states`, `value_vectors`. \
**Field Runtime:** `world_states`, `affordances`, `moves`, `move_executions`, `move_patterns`, `move_pattern_stats`, `feature_registry`, `feature_scores`, `evaluations`, `sensitivity_matrix`, `design_debts`, `process_landmarks`, `trajectories`. \
**Design Governance:** `tensions`, `branches`, `branch_scores`, `commits`, `approvals`, `agent_patches`, `preferences`. \
**Artifacts:** `artifacts`, `artifact_links`, `artifact_versions`, `artifact_validations`, `boards`, `exports`. \
**Hermes Binding:** `hermes_profile_bindings`, `kanban_task_bindings`, `task_packets`, `bridge_events`. \
**Events:** `runtime_events` with actor, operation, payload, before hash, after hash, affected records, and event cursor.

Direction nodes store one fixed primary type: Object, Subject, Vector, Boundary, or Seed. Live subcategories are separate governed vocabulary records and do not create new primary ontology.

### 3.6.4 Command API

Every backend mutation enters a command envelope.

**Envelope Fields:** Project ID, session ID where relevant, actor type, actor ID, operation, payload, affected IDs, expected versions, idempotency key, approval reference, and source context. \
**Command Verbs:** Create, update, move, delete, link, unlink, lock, unlock, merge, split, change status, create subcategory, archive subcategory, create artifact, register evaluation, raise tension, resolve tension, spawn branch, merge branch, propose commit, commit decision, revert commit, create move, execute move, cancel move, retry move. \
**Validation:** Check schema, permission, locked state, expected version, approval requirements, reversibility, commit conflicts, preference conflicts, artifact availability, and domain rules. \
**Transaction Rule:** Accepted commands write product records and runtime events in the same durable operation. \
**Result Shape:** Return changed records, new versions, event cursor, derived warnings, approval requirements, blocked reasons, and affected read-model hints.

### 3.6.5 Versioning and Conflict Rules

**Versioned Records:** Direction nodes, direction links, artifacts, branches, tensions, commits, preferences, move records, and key runtime records carry versions. \
**Semantic Updates:** Title, summary, primary type, subcategory, status, lock state, branch lifecycle, commit state, artifact acceptance, and deletion require expected versions. \
**Position Updates:** Low-risk layout movement can use relaxed conflict handling, but semantic graph changes require conflict checks. \
**Conflict Response:** Version mismatch returns a conflict with the current record summary and version. Agents re-read, re-plan, retry, or submit a suggestion for user review. \
**Locked Records:** User locks and committed decisions block agent overwrite unless explicitly approved.

### 3.6.6 Approvals and Patches

**Agent Patch:** A proposed set of backend operations with title, reason, risk level, affected records, expected versions, and output evidence. \
**Low-Risk Auto Apply:** Low-risk suggestions can apply automatically when they do not overwrite user-authored meaning, committed truth, or high-impact records. \
**Approval Required:** Delete, merge, branch kill, finalization, revert, expensive generation batch, major commit, locked-record overwrite, risky preference conflict, and destructive artifact operation require approval. \
**Approval Result:** Approval applies the patch through commands. Rejection records the decision and preserves evidence. \
**Auditability:** Every approval request and decision records requester, approver, affected records, rationale, result, and timestamp.

### 3.6.7 Event System

Runtime events provide audit, replay, synchronization, and explanation.

**Core Event Families:** Direction graph events, world events, affordance events, move events, Hermes bridge events, artifact events, evaluation events, tension events, branch events, commit events, approval events, supervisor warnings, and recovery events. \
**Event Fields:** ID, project ID, session ID, actor type, actor ID, operation, event type, level, summary, payload, affected IDs, before hash, after hash, timestamp, and cursor. \
**Replay:** Product records give current state. Runtime events explain how the state happened. Undo is an inverse command that creates a new event, not history deletion. \
**Reconnect:** Frontend and Hermes subscribers reconnect with the last event cursor. The backend sends missed events or a full snapshot when the cursor is too old.

Stable event names include:

```text
aas.world.updated
aas.direction.node.created
aas.direction.node.updated
aas.direction.node.moved
aas.direction.node.deleted
aas.direction.link.created
aas.direction.link.deleted
aas.direction.snapshot.saved
aas.ontology.subcategory.created
aas.ontology.subcategory.archived
aas.affordances.generated
aas.move.proposed
aas.move.selected
aas.move.started
aas.move.progress
aas.move.completed
aas.move.failed
aas.agent_patch.created
aas.agent_patch.applied
aas.agent_patch.rejected
aas.tension.created
aas.tension.resolved
aas.branch.spawned
aas.branch.merged
aas.branch.committed
aas.commit.created
aas.artifact.created
aas.evaluation.completed
aas.supervisor.warning
aas.user.approval.required
```

### 3.6.8 Field Runtime Services

**WorldState Compiler:** Derives active design state from product records, events, artifacts, preferences, commits, evaluations, and branch/tension state. \
**AffordanceCompiler:** Generates available and blocked moves with reasons, expected outputs, score breakdowns, cost, risk, and approval needs. \
**ContextDistiller:** Builds Agent Briefs for Hermes profiles with source manifests, context boundaries, and output contracts. \
**MoveCompiler:** Maps moves to Hermes task packets, task groups, dependencies, profile assignments, artifact roots, and completion contracts. \
**EvaluatorRegistry:** Runs concept, plan, section, model, render, board, and QA evaluators. \
**TensionEngine:** Detects and resolves conflicts across goals, constraints, artifacts, preferences, branches, and commits. \
**BranchEcology:** Manages competing hypotheses, branch scores, comparisons, merges, kills, and commits. \
**CommitmentLedger:** Creates, enforces, and reverts committed design truth. \
**Supervisor:** Enforces legality, approvals, drift control, locked state, risky execution, preference conflicts, and finalization gates.

### 3.6.9 API Surface

The backend exposes typed APIs around product concepts rather than raw infrastructure.

**Projects and Sessions:** Create, read, update, and activate project/session context. \
**World and Direction:** Query WorldState, direction graph, snapshots, feature pressures, active tensions, branches, commits, and available moves. \
**Commands:** Submit typed backend commands for graph, artifact, branch, tension, commit, preference, and workspace mutations. \
**Moves:** List, inspect, approve, execute, cancel, retry, and explain moves. \
**Artifacts:** Upload, register, inspect, link, validate, version, preview, and export artifacts. \
**Approvals:** Request, resolve, annotate, defer, or reject approvals. \
**Events:** Stream and replay runtime events. \
**Bridge:** Inspect Hermes profile bindings, task bindings, task packet status, bridge warnings, and task-linked artifacts.

Canonical route families include:

```text
GET  /api/projects
POST /api/projects
GET  /api/projects/:projectId
GET  /api/projects/:projectId/state
GET  /api/projects/:projectId/world
POST /api/projects/:projectId/world/recompute

POST /api/projects/:projectId/commands

GET  /api/projects/:projectId/direction
POST /api/projects/:projectId/direction/snapshots
GET  /api/projects/:projectId/direction/snapshots

GET  /api/projects/:projectId/affordances
POST /api/projects/:projectId/affordances/recompute

GET  /api/projects/:projectId/moves
POST /api/projects/:projectId/moves
GET  /api/moves/:moveId
POST /api/moves/:moveId/execute
POST /api/moves/:moveId/cancel
POST /api/moves/:moveId/retry

GET  /api/projects/:projectId/move-patterns
POST /api/move-patterns/:patternId/sandbox
POST /api/move-patterns/:patternId/promote
POST /api/move-patterns/:patternId/deprecate

GET  /api/projects/:projectId/features
GET  /api/projects/:projectId/evaluations

GET  /api/projects/:projectId/tensions
POST /api/projects/:projectId/tensions
POST /api/tensions/:tensionId/resolve

GET  /api/projects/:projectId/branches
POST /api/projects/:projectId/branches
POST /api/branches/:branchId/merge
POST /api/branches/:branchId/kill
POST /api/branches/:branchId/commit

GET  /api/projects/:projectId/commits
POST /api/projects/:projectId/commits
POST /api/commits/:commitId/revert

GET  /api/projects/:projectId/artifacts
POST /api/projects/:projectId/artifacts
GET  /api/artifacts/:artifactId
POST /api/artifacts/:artifactId/validate

GET  /api/projects/:projectId/approvals
POST /api/approvals/:approvalId/resolve

GET  /api/projects/:projectId/events
GET  /api/projects/:projectId/events/stream

GET  /api/projects/:projectId/bridge/hermes
GET  /api/moves/:moveId/hermes-tasks
GET  /api/hermes-tasks/:taskBindingId/logs
```

### 3.6.10 Storage Model

**Database:** Product truth, events, graph records, runtime records, preferences, approvals, task bindings, and metadata live in the canonical database. \
**Blob Storage:** Images, PDFs, models, renders, reports, boards, task packets, evaluator outputs, logs, uploads, and exports live in managed artifact storage. \
**Memory Store:** Retrieval cards and procedural summaries can live in a memory database, but memory is context cache, not product truth. \
**Hermes Storage:** Hermes owns profile homes, task logs, task-local files, skills, and Kanban state. A.A.S. references Hermes execution through bridge bindings. \
**Media Serving:** The frontend consumes backend-served URLs and metadata, not raw filesystem paths.

### 3.6.11 Bootstrap and Seeding

Bootstrap creates enough structure for a valid A.A.S. project:

**Project and Session:** Initial project, active session, workspace state, and event cursor. \
**Ontology Constants:** Object, Subject, Vector, Boundary, and Seed as fixed primary types. \
**Subcategory Library:** Starter subcategories for common project facts, values, forces, limits, and design possibilities. \
**Feature Registry:** Goal alignment, concept strength, spatial coherence, feasibility, artifact completeness, ground-truth readiness, drawing consistency, tension reduction, branch diversity, user alignment, cost, risk, and elegance. \
**Move Patterns:** Seed patterns for intake, research, concept, tension, branch, ground truth, model, drawing, render, board, QA, and commit work. \
**Hermes Bindings:** Base profile bindings for research, concept, model, representation, critic, and supervisor work.

Bootstrap must be idempotent and must not overwrite existing project truth, artifacts, commits, preferences, approvals, events, pattern stats, or world history.

### 3.6.12 Failure and Recovery

**Command Failure:** Validation, permission, approval, conflict, and schema failures return structured responses and do not partially mutate product truth. \
**Move Failure:** Failed moves can be retried, cancelled, corrected, replaced, or converted into recovery affordances. \
**Hermes Failure:** Task block, task failure, heartbeat loss, missing artifacts, retries, and cancellations become move status, supervisor warnings, and recovery options. \
**Artifact Failure:** Invalid or low-quality artifacts can remain as evidence, comparison material, evaluator input, or QA references without becoming accepted truth. \
**Conflict Recovery:** Agents re-read conflicting records, re-plan patches, retry safe work, or request user resolution. \
**Reversibility:** Reverts create inverse commands and new events. History is preserved. \
**Finalization Gates:** Final outputs are blocked by unresolved critical tensions, missing commits, missing model checks, failed validation, or render/model inconsistency.
