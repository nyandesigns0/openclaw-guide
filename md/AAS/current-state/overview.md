# Current State Overview

## Canonical project home

`D:\AAS\agents\developer\projects\_active\A.A.A`

This is the long-term home of the A.A.S. app. Scratch was only used for early staging and design-note intake.

## What A.A.S. currently is

A.A.S. is now a working local-first monorepo with a real operator shell and a richer backend runtime layer.

Implemented now:
- Next.js frontend operator console
- redesigned dark two-mode shell for Build and Chat workflows
- Fastify backend control plane
- Prisma + SQLite persistence
- persisted pipeline definitions with nodes and edges
- persisted chat sessions and chat messages
- persisted runs and run steps
- persisted artifacts with lineage and agent attribution
- persisted execution events for terminal-style history
- persisted approval checkpoints
- persisted canonical project state
- bootstrap flow that seeds a default multi-stage pipeline and demo artifacts
- local simulated pipeline executor that can pause on approvals and resume execution

## Current default demo path

The seeded workspace now uses a richer default chain:
1. Research Agent
2. Concept Agent
3. Design Critic
4. Operator Approval
5. Board Composer

The backend also seeds bootstrap artifacts so the file-browser and artifact concepts are represented in persisted data, not just mock UI.

## What works today

The main working product loop is:
1. open Build mode
2. edit a saved pipeline
3. save the pipeline into the backend
4. create a chat session from that pipeline
5. send a user message
6. let the backend execute each node in order
7. inspect generated messages, run steps, artifacts, events, approvals, and project state
8. if an approval node is hit, resolve it and continue or fail the run

That path works locally.

## Important implementation milestone history

- UI redesign shell commit: `29887aa` (`Implement AAS UI redesign shell`)
- UI polish tightening commit: `e02f58e` (`Tighten AAS UI layout polish`)
- backend runtime layer commit: `d2a0ef5` (`Complete AAS backend runtime layer`)

## What is not done yet

The project is still not final against the original design doc.

Still missing or intentionally simulated:
- real AAS plugin/controller execution path
- real worker agent dispatch instead of the current backend simulator
- live event streaming to the UI
- real uploads and media serving workflows
- richer frontend wiring for the new artifact, approval, project-state, and terminal surfaces
- deterministic board assembly and rendering pipeline
- QA, packaging, and delivery completion stages
- auth, permissions, and deployment hardening

## Main implementation areas

- `app/frontend`: operator console UI
- `app/backend`: API, persistence, bootstrap, and local runtime logic
- `app/shared`: shared contracts used by frontend and backend
- `AAS/plugins/AAS-controller`: scaffolded future integration surface
- `AAS/taskflow`: scaffolded future orchestration surface
- `storage`: SQLite DB and local runtime storage roots

## Verification completed on the current state

The current repo state has passed:
- `npm run db:generate --workspace @AAS/backend`
- `npx prisma migrate dev --name richer_runtime --schema app/backend/prisma/schema.prisma`
- `npm run build`

The latest backend pass also fixed a TypeScript nullability issue during validation before final commit.
