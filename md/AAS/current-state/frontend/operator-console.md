# Frontend Operator Console

## Location

- main implementation: `app/frontend/components/control-shell.tsx`
- route entry: `app/frontend/app/page.tsx`

## UI shape

The app uses a left-sidebar shell plus workspace panels, not a marketing-style top-nav app.

### Left sidebar responsibilities
- switch between Build mode and Chat mode
- list pipelines
- list recent chat runs
- show active workspace context

### Main workspace responsibilities
- render the active mode
- show save/run notices
- show either the pipeline canvas or the chat conversation

### Right-side utility area in Chat mode
- vertical utility rail with tabs for General, Files, Editor, and Terminal
- panel layout aligned to the design direction
- current UI is partially live and partially preview-backed depending on which backend surfaces are already wired

## Frontend data source

The frontend is API-driven.

Primary hydration route:
- `GET /api/bootstrap`

Primary detail routes:
- `GET /api/chat-sessions/:sessionId`
- `POST /api/chat-sessions/:sessionId/messages`

## Current frontend philosophy

The console is intentionally closer to a control plane than a marketing UI.
It exposes backend-operable pipeline structure directly and is moving toward the calmer reference-driven visual language from the design images.

## Important reality check

The frontend shell has moved closer to the intended A.A.S. product experience, but it does not yet fully consume the richer artifact, approval, event, and project-state surfaces now available in the backend.
