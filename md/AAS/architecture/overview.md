# Architecture Overview

A.A.S. currently has three live layers and two future integration surfaces.

## Live layers

1. **Next.js operator frontend**
   - Build mode for graph editing
   - Chat mode for run interaction
   - API-driven shell in `app/frontend`

2. **Fastify backend control plane**
   - owns product truth
   - persists projects, pipelines, sessions, runs, steps, artifacts, approvals, events, and project state
   - exposes typed JSON routes in `app/backend`

3. **Prisma + SQLite + local storage**
   - structured persistence in SQLite
   - artifact and generated file roots under `storage/`

## Future integration surfaces

4. **AAS controller plugin**
   - intended long-term execution boundary
   - scaffolded under `AAS/plugins/AAS-controller`

5. **TaskFlow runtime assets**
   - intended long-term orchestration continuity layer
   - scaffolded under `AAS/taskflow`

## Important reality check

The backend currently simulates the orchestration layer locally. That means A.A.S. already behaves like a real product control plane, but it is not yet using the final AAS + TaskFlow execution path from the original design.

## Current architectural stance

- the backend is the source of truth for product state
- the frontend is a typed client of backend DTOs
- the local pipeline runtime is a bridge layer, not the final engine
- the AAS integration folders are future-facing, not yet the active path
