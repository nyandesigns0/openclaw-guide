# Backend Routes

## Health and bootstrap

### `GET /api/health`
Simple service health check.

### `GET /api/bootstrap`
Returns the primary project, saved pipelines, recent chat sessions, current project state, and recent artifacts for initial UI hydration.

## Projects

### `GET /api/projects`
List projects.

### `POST /api/projects`
Create a project.

### `GET /api/projects/:projectId`
Load a single project.

### `GET /api/projects/:projectId/state`
Load the canonical `ProjectState` record for the project.

### `GET /api/projects/:projectId/artifacts`
List project artifacts, optionally filtered by `runId`, `sessionId`, or `pipelineId`.

### `GET /api/projects/:projectId/events`
List project execution events, optionally filtered by `runId`, `sessionId`, or `pipelineId`.

## Pipelines

### `GET /api/projects/:projectId/pipelines`
List pipelines for a project.

### `GET /api/pipelines/:pipelineId`
Load one pipeline with nodes and edges.

### `POST /api/pipelines`
Create a pipeline.

### `PUT /api/pipelines/:pipelineId`
Replace pipeline metadata, nodes, and edges.

## Chat sessions

### `GET /api/projects/:projectId/chat-sessions`
List chat sessions for the project.

### `POST /api/chat-sessions`
Create a new chat session bound to a pipeline.

### `GET /api/chat-sessions/:sessionId`
Load a rich chat session detail payload with:
- pipeline
- messages
- artifacts
- events
- approvals
- active run detail
- project state

### `GET /api/chat-sessions/:sessionId/messages`
Load messages only.

### `POST /api/chat-sessions/:sessionId/messages`
Append a user message and execute the current pipeline.

### `GET /api/chat-sessions/:sessionId/artifacts`
List artifacts scoped to the chat session.

### `GET /api/chat-sessions/:sessionId/events`
List events scoped to the chat session.

### `GET /api/chat-sessions/:sessionId/approvals`
List approvals scoped to the chat session.

## Approvals

### `POST /api/approvals/:approvalId/resolve`
Resolve a pending approval as approved or rejected, then continue or fail the run.

## Runs

### `POST /api/projects/:projectId/runs`
Create a run record directly.

### `GET /api/runs/:runId`
Load rich run detail including steps, approvals, artifacts, and events.

### `GET /api/runs/:runId/steps`
Load persisted step history for the run.

### `GET /api/runs/:runId/events`
Load persisted execution events for the run.

### `GET /api/runs/:runId/approvals`
Load approvals for the run.
