# Next Agent Guide

## If you are starting fresh

Read these in order:
1. `docs/current-state/overview.md`
2. `docs/current-state/navigation.md`
3. `docs/current-state/architecture/system-architecture.md`
4. `docs/current-state/backend/pipeline-execution.md`
5. `docs/current-state/frontend/chat-run-mode.md`

## Current truth in one paragraph

A.A.S. already has a real local control plane with a polished Build/Chat frontend shell and a richer backend runtime. The backend persists pipelines, nodes, edges, chat sessions, chat messages, runs, run steps, artifacts, approvals, events, and project state in Prisma/SQLite. Chat mode currently executes a saved pipeline through a local backend simulator that can pause on approval nodes and resume after resolution, not yet through AAS + TaskFlow.

## Most important files

- `app/frontend/components/control-shell.tsx`
- `app/shared/src/contracts.ts`
- `app/backend/prisma/schema.prisma`
- `app/backend/src/routes/chat.ts`
- `app/backend/src/routes/projects.ts`
- `app/backend/src/routes/runs.ts`
- `app/backend/src/lib/pipeline-engine.ts`
- `app/backend/src/lib/runtime-store.ts`
- `app/backend/src/lib/artifacts.ts`
- `app/backend/src/lib/bootstrap.ts`

## What to avoid misunderstanding

- the project is not just a scaffold anymore
- the project is also not final against the original design doc yet
- the backend runtime is richer now, but it is still simulated locally
- the frontend shell is ahead of its live data hookup in some right-sidebar areas
- AAS plugin and TaskFlow folders are not the live runtime path yet
- scratch is not the project home

## Best next implementation targets

Recommended next sequence:
1. wire the frontend right-sidebar tabs to real backend artifacts, events, approvals, and project-state data
2. add explicit UI for approval resolution
3. add upload and media-serving support
4. replace the local runtime with the AAS controller boundary
5. add event streaming to the frontend
6. add deterministic renderer / board packaging stages
