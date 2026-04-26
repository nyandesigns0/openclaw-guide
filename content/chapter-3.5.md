# Chapter 3.5 — Backend

## 3.5.0 Overview

The A.A.A. backend is a Fastify-based control plane that serves as the product logic layer, source of truth for all user-facing state, and the stable integration boundary between the operator frontend and the OpenClaw execution runtime.

### 3.5.1 Technology Stack

**Runtime Framework:** Fastify (TypeScript), chosen for its performance, schema validation, and plugin ecosystem. \
**ORM and Database:** Prisma ORM backed by SQLite for local-first development, with a planned upgrade path to Postgres for future multi-user or hosted deployments. \
**Shared Contracts:** All DTOs, API payloads, runtime enums, artifact shapes, and event types are defined in `app/shared/src/contracts.ts`, ensuring type alignment between frontend and backend. \
**Local Storage:** Artifact bodies, generated files, and media assets are stored under the `storage/` directory tree, managed by the backend storage service.

### 3.5.2 Data Persistence

**Core Entities:** The database persists the following first-class entities: Projects, Project State, Project Assets (artifacts), Pipelines, Pipeline Nodes, Pipeline Edges, Chat Sessions, Chat Messages, Runs, Run Steps, Approvals, Events, and Boards. \
**Project State:** A dedicated `ProjectState` record tracks canonical session state per project, including the active session ID, active run ID, concept JSON, rules, constraints, artifact references, and a monotonically increasing revision counter. \
**Artifact Lineage:** Each `ProjectAsset` can reference a source asset, enabling lineage chains that track how generated artifacts derive from prior outputs across pipeline steps. \
**Agent Attribution:** Artifacts and events carry agent attribution metadata, recording which agent produced each output and from which pipeline node. \
**Relationship Model:** One Project owns many pipelines, sessions, runs, assets, and events. One Run owns many steps, approvals, assets, and events. One ChatSession accumulates messages, approvals, and artifacts across multiple runs.

### 3.5.3 API Surface

**Bootstrap and Health:** `GET /api/health` for service health checks and `GET /api/bootstrap` for initial UI hydration with the primary project, pipelines, sessions, project state, and recent artifacts. \
**Projects:** Full CRUD for projects, plus dedicated routes for project state (`GET /api/projects/:projectId/state`), project artifacts (filterable by run, session, or pipeline), and project events. \
**Pipelines:** CRUD for pipeline definitions. `PUT /api/pipelines/:pipelineId` atomically replaces the pipeline metadata, nodes, and edges. \
**Chat Sessions:** Create sessions bound to pipelines, load rich session detail (pipeline, messages, artifacts, events, approvals, active run, project state), and send messages that trigger pipeline execution. \
**Runs:** Create runs, load rich run detail including steps, approvals, artifacts, and events. \
**Approvals:** `POST /api/approvals/:approvalId/resolve` resolves a pending approval, resuming or failing the run based on the operator's decision.

### 3.5.4 Pipeline Execution Engine

**Local Runtime Path:** The current executor in `lib/pipeline-engine.ts` runs the saved pipeline within the backend process. It loads the pipeline graph, topologically orders the nodes, and executes each node sequentially, simulating agent outputs based on the configured prompts and context. \
**Execution Lifecycle:** For each node: create a run-step record, emit start events, generate role-aware output using the task prompt, system prompt, persistent context, context mode, user message, summarized history, upstream handoff notes, and project state. Persist artifacts, update project state, emit completion events. \
**Approval Pause and Resume:** When an approval node is reached, the executor creates an `AaaApproval` record, moves the run and session to a waiting state, and returns without executing remaining nodes. When the approval is later resolved, execution resumes from the next node or fails the run on rejection. \
**Context Modes:** Three context modes control how upstream information flows to each node: `inherit` (full summarized context), `summary` (summarized upstream only), and `isolated` (no broader conversation snapshot).

### 3.5.5 Compute and Generation Integration

**Rhino Compute Integration:** For the Explore mode, the backend interfaces with a Rhino Compute server to generate 3D geometry. Commands are sent from the frontend through the backend to Rhino Compute, which returns computed geometry for the web viewer. \
**AI Model Coordination:** The backend coordinates calls to advanced reasoning and image generation models (GPT-4o, GPT Image V2) for design tasks such as image generation, concept rendering, and board composition. \
**Deterministic Renderer:** A dedicated rendering service consumes structured board packages and produces final PNG and PDF outputs deterministically, ensuring that agents decide composition intent while the renderer executes that intent repeatably.

### 3.5.6 Event System

**Event Normalization:** Raw execution events from the OpenClaw runtime are converted into stable, typed product events before storage and broadcast. \
**Event Types:** Core event types include `aaa.run.started`, `aaa.step.updated`, `aaa.asset.created`, `aaa.approval.required`, and `aaa.run.completed`, each carrying structured payload data. \
**Event Flow:** OpenClaw emits execution-side lifecycle results. The backend normalizes them, stores them in the `AaaEvent` table, and broadcasts to the UI. The frontend depends only on these stable event contracts, never on raw OpenClaw event semantics.

### 3.5.7 Storage Model

**Storage Root:** All durable application data lives under `storage/` with subdirectories for `db/`, `uploads/`, `projects/`, `generated/`, `renders/`, `thumbs/`, `cache/`, and `logs/`. \
**Immutable Uploads:** Uploaded reference files are stored as immutable originals, never modified after initial storage. \
**Revisioned Artifacts:** Generated assets are stored as distinct revisioned artifacts, each with a database record and a run-local file path. \
**Media Serving:** The UI consumes backend-served asset URLs. Raw filesystem paths are never exposed to the frontend.

### 3.5.8 Bootstrap and Seeding

**Automatic Bootstrap:** On first startup, the backend seeds a default project, a multi-stage pipeline (Research Agent → Concept Agent → Design Critic → Operator Approval → Board Composer), initial project state, and demo artifacts. \
**Idempotent Seeding:** The bootstrap logic runs only when the database is empty, ensuring that existing data is never overwritten on subsequent startups.

### 3.5.9 Failure and Recovery

**Step-Local Recovery:** The architecture prefers step-local recovery over whole-run resets. If a step fails (schema validation, generation quality, or assembly error), only that step is retried with corrective context while all prior valid outputs remain intact. \
**Validation Failures:** If a worker output fails schema validation, the step does not advance. The failure is recorded, and the run can retry the same step. \
**Generation Quality Failures:** If image quality is poor, generated assets are preserved for reference, and the operator can request a new batch without rerunning upstream steps.
