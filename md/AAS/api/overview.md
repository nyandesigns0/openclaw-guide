# API Overview

The current API is additive and typed through `app/shared/src/contracts.ts`.

## Health and bootstrap

- `GET /api/health`
- `GET /api/bootstrap`

## Projects

- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:projectId`
- `GET /api/projects/:projectId/state`
- `GET /api/projects/:projectId/artifacts`
- `GET /api/projects/:projectId/events`

Query support on project artifacts and events:
- `runId`
- `sessionId`
- `pipelineId`

## Pipelines

- `GET /api/projects/:projectId/pipelines`
- `GET /api/pipelines/:pipelineId`
- `POST /api/pipelines`
- `PUT /api/pipelines/:pipelineId`

## Chat sessions

- `GET /api/projects/:projectId/chat-sessions`
- `POST /api/chat-sessions`
- `GET /api/chat-sessions/:sessionId`
- `GET /api/chat-sessions/:sessionId/messages`
- `POST /api/chat-sessions/:sessionId/messages`
- `GET /api/chat-sessions/:sessionId/artifacts`
- `GET /api/chat-sessions/:sessionId/events`
- `GET /api/chat-sessions/:sessionId/approvals`

## Approvals

- `POST /api/approvals/:approvalId/resolve`

This resolves a pending approval node and either resumes execution or fails the run, depending on the approval decision.

## Runs

- `POST /api/projects/:projectId/runs`
- `GET /api/runs/:runId`
- `GET /api/runs/:runId/steps`
- `GET /api/runs/:runId/events`
- `GET /api/runs/:runId/approvals`

## Response shape highlights

Important DTO families now exposed through shared contracts:
- `BootstrapDto`
- `ProjectStateDto`
- `ArtifactDto`
- `ExecutionEventDto`
- `ApprovalDto`
- `RunDetailDto`
- `ChatSessionDetailDto`

The frontend still only partially consumes the richer backend surface. The API is ahead of the UI in artifacts, approvals, terminal logs, and canonical project state.
