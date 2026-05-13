# Backend Control Plane

## Role

The backend is the current source of truth for user-facing A.A.S. state.

It owns:
- projects
- project state
- pipelines
- chat sessions
- chat messages
- runs
- run steps
- artifacts
- approvals
- execution events
- bootstrap seeding

## Runtime composition

Main app setup happens in:
- `app/backend/src/app.ts`

That setup currently does the following before serving requests:
- ensure storage roots exist
- ensure bootstrap state exists
- register CORS and multipart
- register routes

## Backend libraries

### `lib/prisma.ts`
Creates and reuses the Prisma client.

### `lib/storage.ts`
Ensures local runtime directories exist under the configured storage root.

### `lib/bootstrap.ts`
Seeds the first project, default multi-stage pipeline, canonical project state, and demo artifacts when needed.

### `lib/mappers.ts`
Converts Prisma models into shared frontend/backend DTOs.

### `lib/artifacts.ts`
Persists generated artifact bodies to storage and creates `ProjectAsset` records.

### `lib/runtime-store.ts`
Provides project-state creation, event persistence, run-detail loading, and chat-session-detail aggregation.

### `lib/pipeline-engine.ts`
Executes the current local runtime path, including artifact creation, event logging, state mutation, and approval wait/resume handling.

## Route groups

- `routes/bootstrap.ts`
- `routes/projects.ts`
- `routes/runs.ts`
- `routes/pipelines.ts`
- `routes/chat.ts`

## Why this matters

Even before full AAS integration, the backend now behaves like a real product control plane rather than a thin placeholder API.
