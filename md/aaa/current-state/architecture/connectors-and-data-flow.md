# Connectors and Data Flow

## Primary connectors in the current build

### 1. Frontend -> backend HTTP
The frontend talks directly to the backend using JSON fetch calls.

Configured by:
- `NEXT_PUBLIC_AAA_API_URL`

Main bootstrap connector:
- `GET /api/bootstrap`

### 2. Backend -> database
The backend uses Prisma Client against SQLite.

Files:
- `app/backend/src/lib/prisma.ts`
- `app/backend/prisma/schema.prisma`

### 3. Backend -> local storage roots
The backend ensures storage directories exist before serving traffic and persists generated artifact bodies under `storage/projects`.

Files:
- `app/backend/src/lib/storage.ts`
- `app/backend/src/config.ts`
- `app/backend/src/lib/artifacts.ts`

### 4. Backend -> local simulated runtime
Chat message submission currently calls the local execution path.

Primary flow:
- create user message
- mark chat session as running
- create run and execution events
- execute pipeline node by node
- write run steps
- write artifacts
- update project state
- pause on approvals when needed
- resume or fail after approval resolution

Files:
- `app/backend/src/routes/chat.ts`
- `app/backend/src/lib/pipeline-engine.ts`
- `app/backend/src/lib/runtime-store.ts`

## Current end-to-end flow

```text
Frontend
  -> GET /api/bootstrap
  -> select pipeline
  -> edit node prompts / context / edges
  -> PUT /api/pipelines/:pipelineId
  -> POST /api/chat-sessions
  -> POST /api/chat-sessions/:sessionId/messages
Backend
  -> persist user message
  -> load pipeline, project state, and chat history
  -> create run + run.started event
  -> execute each node in order
  -> persist step history, messages, artifacts, and events
  -> if approval node: move session/run to waiting and return detail
  -> if approved later: POST /api/approvals/:approvalId/resolve
  -> continue remaining nodes
  -> return updated chat session detail
Frontend
  -> render conversation now
  -> future UI can also render artifacts, approvals, terminal events, and project state
```

## Future connectors not yet active

These are planned but not live yet:
- backend -> OpenClaw controller plugin
- controller plugin -> TaskFlow
- controller plugin -> real worker agents
- backend -> upload/media-serving path
- backend -> live event-stream connector
- renderer / packaging pipeline
