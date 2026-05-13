# Storage and Environment

## Storage roots

Project storage lives under:
- `storage/`

Key directories:
- `storage/db`
- `storage/uploads`
- `storage/projects`
- `storage/generated`
- `storage/renders`
- `storage/thumbs`
- `storage/cache`
- `storage/logs`

The backend ensures these roots exist on startup.

## Database

Current DB:
- SQLite

Current file:
- `storage/db/AAS.db`

## Artifact storage

Generated artifact bodies are currently written under:
- `storage/projects/<projectId>/<runId-or-sessionId>/...`

This is managed by:
- `app/backend/src/lib/artifacts.ts`

## Root env file

Main root env template:
- `.env.example`

Important variables:
- `AAS_APP_NAME`
- `AAS_FRONTEND_PORT`
- `AAS_BACKEND_PORT`
- `AAS_DATABASE_URL`
- `AAS_STORAGE_ROOT`
- `AAS_PUBLIC_APP_URL`
- `AAS_PUBLIC_API_URL`
- `NEXT_PUBLIC_AAS_API_URL`

## Practical notes

- the intended runtime database path is the repo-root `storage/db/AAS.db`
- Prisma commands should be run from the repo root using the provided scripts or explicit schema path
- stray local paths under `app/backend/prisma/storage` or `app/backend/storage` are not the canonical runtime location and should not be treated as source-controlled state
- `.gitignore` excludes backend-local temporary storage artifacts created by accidental pathing during local Prisma runs

## Operational footguns

- if port 4000 is already in use, backend dev will fail to bind
- if port 3000 is in use, frontend dev may move to 3001
- stale `.next` state can cause misleading Next errors
- Prisma pathing matters because schema-relative commands can create confusing local SQLite files if run carelessly
