# Change Guide

## When changing frontend behavior

Start in:
- `app/frontend/components/control-shell.tsx`
- `app/shared/src/contracts.ts`

If the change affects saved payloads or route shapes, update shared contracts first, then backend routes, then frontend UI.

## When changing pipeline persistence

Start in:
- `app/shared/src/contracts.ts`
- `app/backend/prisma/schema.prisma`
- `app/backend/src/routes/pipelines.ts`
- `app/backend/src/lib/mappers.ts`

If the Prisma schema changes:
1. update schema
2. run `npm run db:generate --workspace @AAS/backend`
3. run `npx prisma migrate dev --name <name> --schema app/backend/prisma/schema.prisma`
4. update mappers and DTOs
5. run `npm run build`

## When changing chat execution behavior

Start in:
- `app/backend/src/routes/chat.ts`
- `app/backend/src/lib/pipeline-engine.ts`
- `app/backend/src/lib/runtime-store.ts`
- `app/backend/src/lib/artifacts.ts`

This is where approval logic, artifact generation, project-state mutation, and future controller handoff logic should land first.

## When changing bootstrap behavior

Start in:
- `app/backend/src/lib/bootstrap.ts`

That file now seeds:
- the default project
- the default multi-stage pipeline
- initial project state
- initial artifacts

## When moving toward real AAS execution

The likely integration seam is:
- keep backend as product control plane
- replace or wrap the local executor in `pipeline-engine.ts`
- route execution into `AAS/plugins/AAS-controller`
- move durable orchestration continuity into TaskFlow rather than keeping the whole flow local inside the backend executor

## Editing caution

Do not mistake the current local runtime for the final architecture. It is a working bridge layer with real product state, not yet the final orchestration substrate.

## Documentation rule

If you change runtime surfaces, update the docs tree in the same pass. The current docs are meant to stay implementation-synchronous, not aspirational.
