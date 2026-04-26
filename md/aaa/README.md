# A.A.A. Documentation Index

This documentation set describes the current implemented state of A.A.A. (Autonomous Architectural Agent), not just the original design intent.

## Current snapshot

A.A.A. is now a working local-first product skeleton with:
- a redesigned two-mode frontend shell for Build and Chat
- a Fastify + Prisma + SQLite backend control plane
- persisted pipelines, sessions, runs, run steps, artifacts, approvals, events, and project state
- a local simulated execution runtime that can pause on approval nodes and resume execution
- a richer bootstrap workspace with a default multi-stage pipeline and demo artifacts

It is still not the final OpenClaw-native runtime from the design document. Real OpenClaw dispatch, live streaming, and production artifact generation remain future work.

## Start here

- `current-state/overview.md`: what exists today, what works, and what is still missing
- `current-state/navigation.md`: repo layout and the fastest places to edit
- `current-state/handoff/next-agent-guide.md`: quickest path for a fresh agent to resume work

## Architecture

- `architecture/overview.md`
- `current-state/architecture/system-architecture.md`
- `current-state/architecture/connectors-and-data-flow.md`
- `current-state/architecture/runtime-status-vs-design.md`
- `architecture/AAA_PROJECT_DESIGN_DOC.md` (reference design intent, not the current implementation snapshot)

## Frontend

- `current-state/frontend/operator-console.md`
- `current-state/frontend/pipeline-design-mode.md`
- `current-state/frontend/chat-run-mode.md`

## Backend

- `current-state/backend/control-plane.md`
- `current-state/backend/routes.md`
- `current-state/backend/pipeline-execution.md`

## Data and storage

- `current-state/data/prisma-models.md`
- `current-state/data/storage-and-env.md`

## Development workflow

- `current-state/development/runbook.md`
- `current-state/development/change-guide.md`
- `operations/dev-setup.md`
