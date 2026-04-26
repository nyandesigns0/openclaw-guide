# A.A.A. Autonomous Architectural Agent Project Design Document

## 1. Purpose

**A.A.A. (Autonomous Architectural Agent)** is a local-first architectural generation system built on top of OpenClaw. It turns a design brief, reference assets, and revision feedback into structured intermediate artifacts and final reviewable outputs, including presentation boards.

This design chooses one architecture only:

- **Frontend:** Next.js + TypeScript
- **Backend control plane:** TypeScript API inside the A.A.A. app root
- **Agent runtime:** OpenClaw plugin/controller + TaskFlow + worker agents
- **Persistence:** local database + local file storage
- **Final output assembly:** deterministic renderer, not freeform end-to-end agent output

The system is designed to be inspectable, resumable, and human-steerable.

---

## 2. Canonical Location and Naming

### App root

```text
D:\openclaw\agents\developer\A.A.A.
```

This app root is owned by the **developer** domain. Developer manages that folder and the application artifacts inside it.

### Naming rule

All app-facing backend, storage, events, services, and runtime identifiers should be branded for **A.A.A. (Autonomous Architectural Agent)** and not use old project-specific naming such as `presentation-board`.

Examples:

- `aaa-api`
- `aaa-controller`
- `aaa-renderer`
- `aaa-run-service`
- `aaa-project-service`
- `aaa-flow-started`
- `aaa-step-completed`
- `aaa-render-failed`

---

## 3. System Architecture

## 3.1 Final architecture

```text
User
  -> A.A.A. Frontend (Autonomous Architectural Agent) (Next.js)
  -> A.A.A. Backend API / Control Plane
  -> Local DB + Local Storage
  -> OpenClaw A.A.A. Controller Plugin
  -> TaskFlow
  -> Worker Agents + Media Tools
  -> Structured Outputs + Assets
  -> A.A.A. Deterministic Renderer
  -> Final Reviewable Deliverables
```

## 3.2 Core principle

The **backend is the product control plane** and the **source of truth for user-facing state**.

OpenClaw is the **execution engine**.

TaskFlow is the **durable orchestration spine**.

Agents do not directly own product state. They produce bounded, typed, reviewable outputs that the backend validates, stores, and advances through the pipeline.

---

## 4. Top-Level Directory Layout

```text
D:\openclaw\agents\developer\A.A.A.\
  app\
    frontend\
    backend\
    shared\
  openclaw\
    plugins\
      aaa-controller\
    taskflow\
      pipelines\
      schemas\
      prompts\
  storage\
    db\
    projects\
    uploads\
    generated\
    renders\
    thumbs\
    cache\
    logs\
  docs\
    architecture\
    api\
    operations\
  scripts\
    dev\
    migrate\
    seed\
    repair\
  package.json
  pnpm-workspace.yaml
  turbo.json
  .env.example
```

### Purpose of each area

#### `app/frontend`
- Next.js operator UI
- project pages
- run pages
- asset review
- approvals and controls
- live event views

#### `app/backend`
- API routes
- workflow services
- project/run/asset services
- OpenClaw integration adapter
- render job creation
- WebSocket or SSE event streaming

#### `app/shared`
- shared TypeScript types
- DTOs
- Zod or JSON schemas
- event contracts

#### `openclaw/plugins/aaa-controller`
- product-specific OpenClaw controller plugin
- TaskFlow creation
- step dispatch
- worker coordination
- step result normalization

#### `storage`
- all durable local application data
- uploaded refs
- generated assets
- board packages
- final renders
- thumbnails
- logs and cache

---

## 5. Major Components

## 5.1 A.A.A. Frontend (Autonomous Architectural Agent)

**Stack:** Next.js + TypeScript + Tailwind + React Query + WebSocket client

### Responsibilities
- create and edit projects
- upload references
- edit design brief and run settings
- start runs
- inspect step status live
- preview intermediate artifacts
- compare image candidates
- approve or reject checkpoints
- retry or resume runs
- preview and download final boards

### Boundaries
The frontend should not:
- call worker agents directly
- own workflow transition logic
- write final files directly
- couple itself to raw OpenClaw runtime details

It is a product shell over the backend API.

---

## 5.2 A.A.A. Backend API / Control Plane

**Stack:** TypeScript, preferably Fastify first. Prisma for DB access. SQLite first, Postgres later if needed.

### Responsibilities
- project CRUD
- asset upload and retrieval
- run creation and run lifecycle management
- validation of incoming requests
- mapping UI commands into pipeline actions
- database persistence
- local storage management
- OpenClaw integration
- event normalization and broadcast
- renderer job orchestration
- audit trail and activity history

### Design stance
This is not just an API wrapper. It is the product logic layer and the stable integration boundary.

---

## 5.3 OpenClaw A.A.A. Controller Plugin

**Location:** `D:\openclaw\agents\developer\A.A.A.\openclaw\plugins\aaa-controller`

### Responsibilities
- create and manage TaskFlow flows
- interpret step definitions
- dispatch worker tasks
- call generation tools where needed
- validate step outputs against contracts
- persist internal flow state
- emit lifecycle events back to the backend
- support retry, resume, wait, fail, finish, and cancel actions

### Design stance
The plugin is the execution-side workflow controller. It should be deterministic in orchestration and strict in contracts.

---

## 5.4 TaskFlow

### Responsibilities
- flow identity
- current step
- persistent `stateJson`
- waiting and blocked state
- child task linkage
- revision-safe flow mutations
- finish/fail/cancel state

### Usage stance
TaskFlow owns orchestration state, not product business logic. The backend remains the source of truth for user-visible project/run state.

---

## 5.5 Worker Agents

### Responsibilities
Worker agents handle bounded tasks such as:
- brief normalization
- strategy derivation
- image shot planning
- prompt preparation
- layout planning
- board package proposal
- QA review
- revision incorporation

### Rules
- outputs must fit predefined schemas
- agents should be replaceable and rerunnable
- no direct mutation of canonical project DB rows
- no hidden state dependency on chat alone
- all important outputs must be persisted as files and registered as artifacts

---

## 5.6 A.A.A. Deterministic Renderer

### Responsibilities
- consume a structured board package
- load referenced assets
- place content into exact regions
- render board PNG/PDF outputs
- generate thumbnails
- produce stable, repeatable exports

### Design stance
Agents decide composition intent. The renderer executes composition deterministically.

That split is essential. It prevents the final board from becoming an opaque one-shot generation artifact.

---

## 6. Data Ownership Model

There are two state systems on purpose.

## 6.1 Backend-owned product state

The backend database is the source of truth for:
- projects
- runs
- assets
- approvals
- board records
- user-facing statuses
- event history

## 6.2 OpenClaw-owned orchestration state

TaskFlow `stateJson` is the source of truth for:
- current step execution
- internal artifact paths
- retry counters
- child task linkage
- temporary selection state
- checkpoint state needed to resume execution

This separation keeps the product stable even if the runtime is restarted or replaced.

---

## 7. Storage Model

## 7.1 Storage root

```text
D:\openclaw\agents\developer\A.A.A.\storage
```

## 7.2 Proposed storage layout

```text
storage\
  db\
  uploads\
    <projectId>\
  projects\
    <projectId>\
      refs\
      runs\
        <runId>\
          input\
          step-01-brief-normalization\
          step-02-strategy\
          step-03-image-generation\
          step-04-layout-plan\
          step-05-board-assembly\
          step-06-qa\
      boards\
      exports\
  generated\
  renders\
  thumbs\
  cache\
  logs\
```

## 7.3 Storage rules

- Uploaded files are immutable originals.
- Generated assets are stored as distinct revisioned artifacts.
- Final board exports live separately from intermediate outputs.
- UI should consume backend-served asset URLs, never raw filesystem paths.
- Every important artifact should have a DB record and a run-local file path.

---

## 8. Database Model

Recommended initial stack:
- Prisma
- SQLite for v1 local-first development
- upgrade path to Postgres later

## 8.1 Core entities

### `projects`
```ts
{
  id: string
  name: string
  description: string | null
  status: 'active' | 'archived'
  createdAt: string
  updatedAt: string
}
```

### `project_assets`
```ts
{
  id: string
  projectId: string
  kind: 'reference' | 'generated' | 'board' | 'thumbnail' | 'document'
  role: string | null
  filePath: string
  mediaUrl: string | null
  metadataJson: object
  createdAt: string
}
```

### `aaa_runs`
```ts
{
  id: string
  projectId: string
  flowId: string | null
  status: 'queued' | 'running' | 'waiting' | 'failed' | 'completed' | 'cancelled'
  currentStep: string | null
  triggerSource: 'user' | 'retry' | 'resume' | 'system'
  createdAt: string
  updatedAt: string
}
```

### `aaa_run_steps`
```ts
{
  id: string
  runId: string
  stepId: string
  status: 'pending' | 'running' | 'waiting' | 'completed' | 'failed' | 'skipped'
  attempt: number
  startedAt: string | null
  completedAt: string | null
  inputPath: string | null
  outputPath: string | null
  summary: string | null
}
```

### `aaa_approvals`
```ts
{
  id: string
  runId: string
  stepId: string
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: string
  resolvedAt: string | null
  note: string | null
}
```

### `aaa_boards`
```ts
{
  id: string
  runId: string
  boardPackagePath: string
  finalImagePath: string
  finalPdfPath: string | null
  qaStatus: 'pass' | 'fail' | 'warning'
  createdAt: string
}
```

### `aaa_events`
```ts
{
  id: string
  runId: string | null
  eventType: string
  payloadJson: object
  createdAt: string
}
```

---

## 9. Pipeline Definition Model

The pipeline should be declared as data, executed by code.

## 9.1 Pipeline definition location

```text
D:\openclaw\agents\developer\A.A.A.\openclaw\taskflow\pipelines\board-generation.pipeline.json
```

## 9.2 Example step sequence

1. `brief_normalization`
2. `board_strategy`
3. `image_generation`
4. `layout_plan`
5. `board_assembly`
6. `qa_review`
7. `delivery_finalize`

## 9.3 Step contract

Each step should declare:
- step id
- executor type
- agent or tool
- input schema
- output schema
- retry policy
- approval requirement
- next-step rules

---

## 10. End-to-End Workflow Data Flow

## 10.1 Intake

1. User creates or opens project in the A.A.A. frontend.
2. User uploads references and enters the design brief.
3. Frontend sends request to backend.
4. Backend validates and stores canonical input.
5. Backend creates an `aaa_run` record.
6. Backend asks OpenClaw to start a flow.

## 10.2 Flow creation

1. A.A.A. controller plugin creates a TaskFlow managed flow.
2. TaskFlow state stores run directory, input paths, current step, artifact map, retry state, and history.
3. Controller dispatches the first worker task.

## 10.3 Step execution pattern

For every step:

1. Controller reads prior artifact paths from flow state.
2. Controller composes exact step input.
3. Controller launches worker agent or tool call.
4. Worker returns structured output.
5. Controller validates output against schema.
6. Controller writes step output to run-local storage.
7. Controller updates TaskFlow `stateJson` and step history.
8. Controller emits a normalized event to backend.
9. Backend updates DB records.
10. Backend pushes live update to the frontend.

## 10.4 Human checkpoint pattern

If a step requires approval:

1. Controller marks flow waiting.
2. Backend records approval request.
3. Frontend displays required review action.
4. User approves, rejects, or annotates.
5. Backend sends resume/retry instruction.
6. Controller resumes TaskFlow from the checkpoint.

## 10.5 Completion

1. Board package is finalized.
2. Deterministic renderer outputs final board PNG/PDF.
3. QA report is written.
4. Backend marks run completed.
5. Frontend shows completed outputs and download actions.

---

## 11. Canonical TaskFlow State Shape

```json
{
  "pipelineId": "aaa-board-generation",
  "projectId": "proj_001",
  "runId": "run_001",
  "runDir": "storage/projects/proj_001/runs/run_001",
  "status": "running",
  "currentStep": "image_generation",
  "inputs": {
    "briefPath": "storage/projects/proj_001/runs/run_001/input/brief.json",
    "referenceAssetIds": ["asset_01", "asset_02"]
  },
  "artifacts": {
    "normalizedBriefPath": "storage/projects/proj_001/runs/run_001/step-01-brief-normalization/output.json",
    "boardStrategyPath": "storage/projects/proj_001/runs/run_001/step-02-strategy/output.json",
    "imageBatchPath": null,
    "layoutPlanPath": null,
    "boardPackagePath": null,
    "qaReportPath": null
  },
  "selectedAssets": [],
  "retries": {
    "image_generation": 0
  },
  "history": [
    {
      "step": "brief_normalization",
      "status": "completed"
    }
  ],
  "finalOutputs": {
    "boardImagePath": null,
    "boardPdfPath": null
  }
}
```

---

## 12. Recommended Step Responsibilities

## 12.1 `brief_normalization`
**Owner:** worker agent

Converts the raw project brief and references into a clean structured planning brief.

## 12.2 `board_strategy`
**Owner:** worker agent

Defines board narrative, required sections, image shot list, and content priorities.

## 12.3 `image_generation`
**Owner:** controller + media tools + optional worker prep

Generates candidate imagery from structured shot definitions. Persists every generated variant and selection record.

## 12.4 `layout_plan`
**Owner:** worker agent

Produces structured board region placement, hierarchy, margins, and layout rules.

## 12.5 `board_assembly`
**Owner:** worker agent produces package, renderer executes package

Outputs a strict board package consumed by the deterministic renderer.

## 12.6 `qa_review`
**Owner:** worker agent or validation service

Checks completeness, layout validity, asset presence, and package consistency.

## 12.7 `delivery_finalize`
**Owner:** backend

Registers final outputs, emits completion events, and exposes download links.

---

## 13. API Surface

All frontend interaction should go through the backend API.

## 13.1 Projects

```http
POST   /api/projects
GET    /api/projects/:projectId
PATCH  /api/projects/:projectId
GET    /api/projects
```

## 13.2 Assets

```http
POST   /api/projects/:projectId/assets
GET    /api/projects/:projectId/assets
GET    /api/assets/:assetId
DELETE /api/assets/:assetId
```

## 13.3 Runs

```http
POST   /api/projects/:projectId/runs
GET    /api/runs/:runId
GET    /api/runs/:runId/steps
POST   /api/runs/:runId/cancel
POST   /api/runs/:runId/resume
POST   /api/runs/:runId/retry-step
POST   /api/runs/:runId/approve-step
POST   /api/runs/:runId/reject-step
POST   /api/runs/:runId/restart-from-step
```

## 13.4 Boards

```http
GET    /api/runs/:runId/board
GET    /api/boards/:boardId
GET    /api/boards/:boardId/download
```

## 13.5 Live events

```http
GET    /api/runs/:runId/events
WS     /ws
```

---

## 14. Event Model

The backend should normalize runtime events into stable product events.

## 14.1 Example events

```json
{
  "type": "aaa.run.started",
  "runId": "run_001",
  "projectId": "proj_001",
  "currentStep": "brief_normalization"
}
```

```json
{
  "type": "aaa.step.updated",
  "runId": "run_001",
  "stepId": "image_generation",
  "status": "running",
  "progress": 0.5
}
```

```json
{
  "type": "aaa.asset.created",
  "runId": "run_001",
  "assetId": "asset_003",
  "kind": "generated",
  "url": "/media/projects/proj_001/runs/run_001/step-03-image-generation/shot-01.png"
}
```

```json
{
  "type": "aaa.approval.required",
  "runId": "run_001",
  "stepId": "image_generation",
  "message": "Select preferred hero image before layout planning."
}
```

```json
{
  "type": "aaa.run.completed",
  "runId": "run_001",
  "boardId": "board_001"
}
```

## 14.2 Event flow

- OpenClaw emits execution-side lifecycle results.
- Backend converts them into stable app events.
- Backend stores them in `aaa_events`.
- Backend broadcasts them to the UI.

The browser should not depend directly on raw OpenClaw event semantics.

---

## 15. Human-in-the-Loop Controls

The UI must expose explicit controls for intervention.

## 15.1 Project-level controls
- edit project brief
- upload/remove references
- create new run
- compare prior runs

## 15.2 Run-level controls
- start
- cancel
- resume
- retry failed step
- restart from checkpoint
- duplicate run configuration

## 15.3 Step-level controls
- inspect input JSON
- inspect output JSON
- preview generated images
- select preferred candidate
- add operator note
- approve or reject checkpoint

These controls are not optional polish. They are central to the whole product value.

---

## 16. Failure and Retry Model

## 16.1 Validation failures
If a worker output fails schema validation:
- step does not advance
- step result is stored as failed
- controller emits structured failure
- backend records failure reason
- run can retry the same step with corrective context

## 16.2 Generation quality failures
If image quality is poor:
- generated assets remain preserved
- user can request another batch
- pipeline reruns only the image generation step
- downstream work remains intact until replaced

## 16.3 Assembly failures
If the board package or render fails:
- prior outputs remain intact
- renderer logs are stored
- rerun only assembly/render path

This architecture should prefer **step-local recovery** over whole-run resets.

---

## 17. Security and Exposure Posture

## 17.1 Local-first v1
Initial operation is local-first on the machine that runs OpenClaw and A.A.A.

## 17.2 Future internet exposure
When exposed later through Cloudflare Tunnel, the externally reachable surface should be:
- A.A.A. frontend
- A.A.A. backend API

OpenClaw itself should remain behind the backend boundary.

## 17.3 Security stance
- do not expose raw OpenClaw control surfaces publicly
- serve media through backend URLs
- add authentication before public exposure
- keep storage roots and internal runtime paths private

---

## 18. Recommended Build Phases

## Phase 1, app foundation
- create A.A.A. monorepo/app root under `D:\openclaw\agents\developer\A.A.A.`
- create frontend app
- create backend app
- create shared types package
- stand up SQLite + Prisma
- implement project/run/asset DB models

## Phase 2, storage and API
- implement local storage adapter
- implement uploads and media serving
- implement project and run endpoints
- implement event storage

## Phase 3, OpenClaw integration
- create `aaa-controller` plugin
- add TaskFlow-managed flow creation
- implement first three steps: brief normalization, board strategy, image generation
- persist step outputs to storage

## Phase 4, live UI
- run dashboard
- step timeline
- asset previews
- live event stream
- approval UI

## Phase 5, deterministic board pipeline
- implement layout plan step
- implement board package output
- build renderer for PNG/PDF
- add QA step and completion packaging

## Phase 6, hardening
- retries and resumptions
- checkpoint restart
- approval history
- auth and permission model
- Cloudflare Tunnel deployment path

---

## 19. Final Opinionated Decisions

### Use a backend control plane
Do not let the frontend orchestrate agents directly.

### Use TaskFlow for durable multi-step runs
Do not rely on chat history as pipeline state.

### Use files plus DB records
Do not rely on transient runtime outputs alone.

### Use structured contracts between steps
Do not pass unstructured prose between pipeline stages when deterministic assembly matters.

### Use a deterministic renderer
Do not ask an agent to one-shot the final board as the product primitive.

### Keep OpenClaw behind the backend
Do not expose raw agent orchestration directly to the web UI or internet.

---

## 20. Final Summary

A.A.A. should be built as a three-layer system:

1. **A.A.A. Frontend (Autonomous Architectural Agent)** for operator control and review
2. **A.A.A. Backend API** as the product control plane and state authority
3. **OpenClaw A.A.A. Controller + TaskFlow + workers** as the execution engine

The backend owns user-facing truth. TaskFlow owns execution continuity. Agents produce structured intermediate work. The renderer produces stable final deliverables.

That is the cleanest architecture for a serious agentic architectural generation pipeline with room to grow into internet hosting later without rebuilding the core design.


