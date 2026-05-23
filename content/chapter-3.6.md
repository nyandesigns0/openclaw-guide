# Chapter 3.6 - Backend

## 3.6.0 Overview

The A.A.S. backend is the canonical control plane for the Field Runtime. Postgres graph rows plus the runtime event log are the source of truth. WorldState, Agent Direction State, and Design Exploration Graph are derived read models. Dashboard and Hermes are live clients that read and write through the same backend API.

### 3.6.1 Technology Stack

**Runtime Framework:** TypeScript backend service suitable for local-first development, with schema validation, background workers, file watching, command handlers, transactions, and streaming support. \
**Canonical Database:** Postgres is the canonical A.A.S. truth database. It stores graph rows, events, snapshots, taxonomy, permissions, versions, patches, approvals, preferences, and runtime records. SQLite may be used only for throwaway local demos or tests, not as the target architecture. \
**Live Event Bus:** Redis or NATS transports live graph and runtime events between backend workers, dashboard clients, and Hermes subscribers. The bus is ephemeral transport and not truth. \
**Live Client Stream:** WebSocket is the primary dashboard and Hermes live-update channel. Server-Sent Events may be a simple fallback, but WebSocket is the default collaboration path. \
**Command API:** REST, tRPC, or GraphQL may expose commands, but every write must enter the same command pipeline with validation, transaction, event write, and publish. \
**Memory Database:** OpenViking or equivalent stores derived context cards and retrieval summaries. Memory is context cache, not graph truth. \
**Artifact Storage:** S3, R2, local blob storage, or managed file storage stores images, PDFs, models, renders, task packets, board exports, evaluator reports, and uploads referenced by graph records.

### 3.6.2 Backend Truth Model

**Source of Truth:** `Postgres graph rows + runtime_events` are canonical operational truth. Dashboard state, Hermes local cache, OpenViking memory, profile memory, and Redis/NATS messages are not truth. \
**Derived Read Models:** WorldState, Agent Direction State, and Design Exploration Graph are derived from graph rows, commits, artifacts, preferences, and events. They can be snapshotted for speed and replay, but they do not replace graph truth. \
**Design Truth Gate:** Valid commands can change current graph truth. Only CommitmentLedger commits change committed design truth. \
**Single Write Pipe:** User commands and Hermes commands use the same backend command pipeline. Hermes never edits the dashboard and dashboard never edits Hermes state. \
**No Direct State Path:** Dashboard and Hermes do not trust each other directly. Both observe and update the backend.

```text
User Dashboard
  <-> API / WebSocket
AAS Backend
  <-> Postgres graph rows + event log
  <-> Redis / NATS live event bus
Hermes Agent Worker

OpenViking memory = context cache
Artifact storage = blob/file storage
```

### 3.6.3 Canonical Schema Shape

**Direction Nodes:** `direction_nodes` store `id`, `project_id`, `primary_type`, `secondary_type_id`, `title`, `summary`, `confidence`, `status`, `position_x`, `position_y`, `weight`, `locked`, `locked_by_user`, `agent_claim`, `created_by`, `updated_by`, and `version`. \
**Direction Links:** `direction_links` store `id`, `project_id`, `source_node_id`, `target_node_id`, `relation_type`, `strength`, `confidence`, `created_by`, `updated_by`, and `version`. \
**Runtime Events:** `runtime_events` store `id`, `project_id`, `actor_type`, `actor_id`, `operation`, `payload`, `before_hash`, `after_hash`, and `created_at`. \
**Direction Snapshots:** `direction_snapshots` store graph state, selected field mode, layout state, active nodes, locks, expanded/collapsed state, event cursor, and created timestamp. \
**Agent Patches:** `agent_patches` store `id`, `project_id`, `title`, `reason`, `operations`, `risk_level`, `status`, `created_by`, `applied_by`, and timestamps. \
**Approvals:** `approvals` store requested operation, risk reason, affected records, requester, approver, status, decision notes, and timestamps. \
**Node Subcategories:** `node_subcategories` store mutable vocabulary with scope, primary type, label, description, status, usage count, merge target, created source, last used timestamp, and archival reason. \
**Supporting Records:** Projects, sessions, world_states, concept_states, value_vectors, affordances, moves, move_patterns, features, evaluations, design_debts, trajectories, tensions, branches, commits, artifacts, artifact_links, preferences, agent_briefs, move_executions, profile bindings, and task bindings remain normalized records around the graph.

### 3.6.4 Command API

**Command Verbs:** Backend commands include `create_node`, `update_node`, `move_node`, `delete_node`, `link_nodes`, `unlink_nodes`, `lock_node`, `change_status`, `merge_nodes`, `split_node`, `create_subcategory`, and `archive_subcategory`. \
**Command Envelope:** Each command includes project ID, actor type, actor ID, operation, payload, expected versions where required, idempotency key, and optional approval or patch reference. \
**Shared Pipe:** User actions, dashboard gestures, agent patches, Hermes worker outputs, and maintenance jobs all enter the same command pipe. \
**Transaction Rule:** Every accepted mutation follows `validate -> transaction -> write graph row -> write runtime event -> publish event -> dashboard applies -> Hermes observes`. \
**Write Result:** Successful commands return updated record IDs, new versions, event ID, and any derived warnings. Failed commands return validation errors, approval requirements, or conflict status.

### 3.6.5 Versioning and Conflict Rules

**Version Field:** Nodes and links carry monotonically increasing `version` values. Semantic updates must submit `expectedVersion`. \
**Conflict Response:** If `expectedVersion` does not match the current row version, the backend returns `409 conflict` with current record summary and version. \
**Agent Recovery:** Hermes handles `409` by re-reading affected nodes, re-planning the patch, retrying if still valid, or creating a suggestion for user review. \
**Position Policy:** `position_x` and `position_y` can usually use last-write-wins because drag collisions are low semantic risk. \
**Semantic Policy:** `title`, `summary`, `primary_type`, `secondary_type_id`, `status`, `locked`, merge, split, and delete require version checks and may require approval. \
**Edge Policy:** New edges are usually append-safe, but deleting, weakening, or overwriting strong/locked edges requires version checks and sometimes approval.

### 3.6.6 Agent Patches and Approvals

**Patch Model:** Hermes should prefer patches over silent edits. A patch contains operations, reason, affected records, expected versions, risk level, and approval status. \
**Low-Risk Auto-Apply:** Low-risk patches may auto-apply for extracted Object/Subject nodes, suggested weak edges, confidence updates, annotations, and draft Seeds. \
**Approval Required:** Approval is required for delete node, merge nodes, lock node, reject Seed, change Boundary, overwrite user-authored Subject or Value-like semantic content, expensive generation batches, branch kills, finalization, reverts, and direction snapshot restores. \
**Approval Flow:** High-risk patch creates `agent_patch.created` plus `aas.user.approval.required`. Approval applies the patch through commands. Rejection writes a rejection event and preserves audit trail. \
**Soft Locks:** `locked_by_user` blocks agent overwrite unless explicitly approved. `agent_claim` means an agent is analyzing or proposing; it is presence, not a lock, and users can override it. \
**Presence States:** Dashboard may show agent looking, proposing, editing, or waiting approval based on `agent_claim`, active patches, and runtime events.

### 3.6.7 Event System

**Event Normalization:** Runtime, command, evaluator, and Hermes events are converted into stable A.A.S. product events before storage and broadcast. \
**Core Events:** `aas.direction.node.created`, `aas.direction.node.updated`, `aas.direction.node.moved`, `aas.direction.node.deleted`, `aas.direction.link.created`, `aas.direction.link.deleted`, `aas.direction.snapshot.saved`, `aas.ontology.subcategory.created`, `aas.ontology.subcategory.archived`, `aas.agent_patch.created`, `aas.agent_patch.applied`, `aas.agent_patch.rejected`, `aas.world.updated`, `aas.affordances.generated`, `aas.move.started`, `aas.move.completed`, `aas.move.failed`, `aas.tension.created`, `aas.branch.committed`, `aas.commit.created`, `aas.artifact.created`, `aas.supervisor.warning`, and `aas.user.approval.required`. \
**Audit Trail:** Events include actor type, actor ID, operation, payload, before hash, after hash, timestamps, affected IDs, and event cursor. \
**Replay:** Current graph can be rebuilt from latest database rows. History, undo, audit, and reasoning traces come from runtime events. Undo is an inverse command that creates a new event. \
**Reconnect:** Dashboard and Hermes reconnect with `last_event_id`. The backend sends missed events when available; if the cursor is too old, it sends a full snapshot and a new event cursor. \
**Snapshot Fallback:** Snapshots accelerate recovery and replay, but snapshots are derived from graph truth and event history.

### 3.6.8 Frontend and Hermes Sync

**Dashboard Read Path:** Dashboard loads a snapshot/read model once, then applies events to local stores. It should not refetch the whole graph after each event. \
**Dashboard Write Path:** Dashboard gestures submit commands. Optimistic UI may update local working state immediately, but backend events remain authoritative. \
**Hermes Read Path:** Hermes subscribes to project events, maintains a local graph cache, and treats the cache as disposable. Before important writes it re-reads affected records and checks versions. \
**Hermes Worker Loop:** Subscribe to events, apply to local cache, ignore agent echo events where appropriate, debounce recompute for 1-3 seconds, run ContextDistiller, retrieve OpenViking memory, compute affordances, score moves, create a patch, and apply or request approval. \
**Memory Path:** Graph state creates memory summaries. Memory retrieves context for Hermes. Hermes creates patch commands. Patch commands update graph. Memory never mutates graph directly. \
**Live Bus Role:** Redis/NATS fans out events and worker notifications. If the bus loses messages, clients recover from Postgres events and snapshots.

### 3.6.9 Field Runtime Services

**AffordanceCompiler:** Reads derived WorldState, current graph neighborhood, changed nodes, active seeds, locked boundaries, strong vectors, missing Object/Subject-to-Vector/Boundary pairs, weak Seeds, trajectory, design debt, move library, and scoped preferences to generate available and blocked moves. \
**ContextDistiller:** Produces Agent Briefs from graph-derived WorldState, memory, scoped preferences, artifacts, commits, tensions, evaluations, recent events, and output contracts. \
**MoveCompiler:** Maps approved moves to Hermes task packets, task groups, dependencies, profiles, expected artifacts, expected feature effects, and completion contracts. \
**CommitmentLedger:** Creates, enforces, and reverts committed design truth through commands and events. \
**Supervisor:** Enforces legality, approvals, version conflicts, locked nodes, preference conflicts, drift, risky operations, and finalization gates. \
**MemorySummarizer:** Writes OpenViking context cards from stable graph/event patterns without making memory authoritative.

### 3.6.10 Storage Model

**Postgres Storage:** Canonical graph, events, snapshots, taxonomy, approvals, patches, preferences, task bindings, and runtime records live in Postgres. \
**OpenViking Storage:** Context cards, summaries, old branch lessons, and reusable patterns live in OpenViking or equivalent memory DB. \
**Blob Storage:** Uploaded references, generated images, PDFs, models, renders, task packets, board exports, evaluator reports, thumbnails, and logs live in blob/file storage and are referenced by backend records. \
**Run, Move, and Task Organization:** Move outputs can be grouped by project, session, branch, move ID, and Hermes task ID for inspection and replay. \
**Media Serving:** The UI consumes backend-served URLs and metadata, not raw filesystem paths.

### 3.6.11 Bootstrap and Seeding

**Initial Project:** Seed a default project with initialized graph rows, derived WorldState, starter direction graph, event cursor, and baseline snapshots rather than a static pipeline graph. \
**Initial Ontology:** Seed the five primary node types as read-only constants and seed a small starter subcategory library for Object, Subject, Vector, Boundary, and Seed. \
**Initial Commands:** Seed deterministic command handlers and first moves such as normalize brief, ask blocking clarification, generate concept branches, run precedent scan, define success metrics, identify design tensions, and summarize memory. \
**Initial Feature Registry:** Seed core features such as goal alignment, concept strength, spatial coherence, artifact completeness, ground-truth readiness, drawing consistency, tension reduction, branch diversity, user alignment, cost, risk, and elegance. \
**Idempotence:** Bootstrap must never overwrite existing projects, graph rows, artifacts, commits, preferences, pattern stats, patches, approvals, events, or world history.

### 3.6.12 Failure and Recovery

**Move-Local Recovery:** Retry, cancel, correct, or replace failed moves without resetting the whole project. \
**Command Failure:** Failed commands return structured validation, conflict, permission, or approval responses and do not partially mutate graph truth. \
**Hermes Recovery:** Task block, failure, heartbeat loss, retry, cancellation, missing artifacts, or `409 conflict` are translated into move status, supervisor warnings, and recovery affordances. \
**Supervisor Warnings:** Drift, unresolved critical tensions, commit conflicts, preference conflicts, risky tool execution, semantic overwrite attempts, and finalization problems emit warnings and may block execution. \
**Reversibility:** Major moves declare whether they are reversible. Reverts create inverse commands and new events rather than deleting history. \
**Artifact Preservation:** Failed or low-quality outputs can remain as evidence, comparison material, evaluator input, or QA references. \
**Learning From Failure:** Failed move patterns update contextual stats and may trigger curator review, stricter validation tests, memory-card cleanup, or deprecation.
