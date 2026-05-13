# Development Runbook

## First setup

```bash
copy .env.example .env
npm install
npm run db:generate --workspace @AAS/backend
npx prisma migrate dev --name init --schema app/backend/prisma/schema.prisma
```

If the repo already has migrations applied, use a migration name appropriate to your change instead of `init`.

## Start services

### Backend
```bash
npm run dev:backend
```

### Frontend
```bash
npm run dev:frontend
```

### Or both
```bash
npm run dev
```

## Build and verification

```bash
npm run build
```

## Smoke test the current runtime flow

1. start backend
2. call `GET /api/bootstrap`
3. confirm bootstrap project, project state, recent artifacts, and default pipeline exist
4. create a chat session with `POST /api/chat-sessions`
5. send a message with `POST /api/chat-sessions/:sessionId/messages`
6. confirm returned session includes:
   - user message
   - agent/system messages
   - active run detail
   - artifacts
   - events
   - project state
7. if execution hits an approval node, inspect pending approvals and resolve one with `POST /api/approvals/:approvalId/resolve`
8. inspect run detail via `GET /api/runs/:runId`

## UI smoke test

1. open the frontend shell
2. confirm Build and Chat mode switch works
3. confirm pipelines and chat sessions load from bootstrap
4. confirm Build mode can save a pipeline
5. confirm Chat mode can create a session and post a message

## Known operational footguns

- if port 4000 is already in use, backend dev will fail to bind
- if port 3000 is in use, frontend dev may move to 3001
- stale `.next` state can cause misleading Next errors
- Prisma pathing matters, use the root-oriented commands shown above
- a failed background coding-agent session can leave noisy logs behind, but it should not be confused with repo state
