# Navigation Guide

## Top-level structure

```text
A.A.A/
  app/
    backend/
    frontend/
    shared/
  docs/
    current-state/
  AAS/
    plugins/
    taskflow/
  scripts/
  storage/
```

## Where to work

### Frontend
- path: `app/frontend`
- primary screen shell: `app/frontend/components/control-shell.tsx`
- page entry: `app/frontend/app/page.tsx`
- global styles: `app/frontend/app/globals.css`

### Backend
- path: `app/backend`
- app composition: `app/backend/src/app.ts`
- runtime config: `app/backend/src/config.ts`
- Prisma schema: `app/backend/prisma/schema.prisma`
- migrations: `app/backend/prisma/migrations/*`
- route handlers: `app/backend/src/routes/*`
- reusable backend logic: `app/backend/src/lib/*`

### Shared contracts
- path: `app/shared/src/contracts.ts`
- update this first when changing DTOs, API payloads, runtime enums, artifacts, approvals, or project-state shapes

### AAS integration area
- path: `AAS/plugins/AAS-controller`
- currently scaffolded, not yet wired to the live backend flow

### TaskFlow placeholders
- path: `AAS/taskflow`
- currently contains pipeline and schema placeholders, not the live execution path yet

### Local runtime storage
- path: `storage/`
- DB location: `storage/db/AAS.db`
- project artifact roots: `storage/projects/*`

## Key files for resuming work fast

If you only have a few minutes to orient:
1. `docs/current-state/overview.md`
2. `docs/current-state/handoff/next-agent-guide.md`
3. `app/frontend/components/control-shell.tsx`
4. `app/shared/src/contracts.ts`
5. `app/backend/prisma/schema.prisma`
6. `app/backend/src/routes/chat.ts`
7. `app/backend/src/lib/pipeline-engine.ts`
8. `app/backend/src/lib/runtime-store.ts`
9. `app/backend/src/lib/bootstrap.ts`

## Important placement rules

- active product code belongs here in `projects/_active/A.A.A`
- scratch is not the long-term home of this app
- AAS system architecture changes belong in the AAS system workspace unless they are explicitly part of A.A.S. integration work
