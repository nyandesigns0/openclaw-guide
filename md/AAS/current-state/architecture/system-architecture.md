# System Architecture

## Current live architecture

```text
User
  -> Next.js operator console
  -> Fastify backend control plane
  -> Prisma + SQLite + local storage
  -> local simulated pipeline runtime
  -> persisted sessions, runs, steps, artifacts, approvals, events, and project state
```

## Major runtime pieces

### Frontend operator console
Responsibilities:
- show the left sidebar app shell
- switch between Build mode and Chat mode
- fetch bootstrap state from backend
- edit pipeline nodes and edges
- edit task prompts, system prompts, persistent context, and context mode
- create chat sessions
- send user messages that trigger pipeline execution
- present a right-side utility rail for General, Files, Editor, and Terminal concepts

### Backend control plane
Responsibilities:
- own product-facing state
- persist projects, pipelines, chat sessions, runs, run steps, artifacts, approvals, events, and project state
- seed bootstrap state when empty
- expose API routes used by the frontend
- execute the current local runtime path

### Shared contracts
Responsibilities:
- keep frontend and backend aligned on payloads and enums
- define project, project-state, pipeline, node, edge, chat, run, artifact, approval, and event shapes

### Local simulated runtime
Responsibilities:
- load the selected pipeline and prior chat state
- topologically order the nodes
- simulate agent outputs per node type and role
- emit artifacts and execution events during the run
- update canonical project state as steps complete
- pause on approval nodes and resume when resolved

## Architecture boundary to remember

The current runtime is a backend-local simulation layer for product validation.

It is not yet the final AAS-driven execution engine described in the original design document.

## Design intent versus implementation

The repo now has a real control plane, a polished frontend shell, and a richer runtime surface.
The AAS controller and TaskFlow directories still exist as future integration surfaces rather than the active runtime backbone.
