# Development Setup

## Quick setup

1. Copy `.env.example` to `.env`
2. Run `npm install`
3. Run `npm run db:generate --workspace @AAS/backend`
4. Run `npx prisma migrate dev --name init --schema app/backend/prisma/schema.prisma`
5. Run `npm run dev`

If the database is already initialized, use a migration name that matches your change instead of `init`.

## Current local test loop

The current test loop lets you:
1. design or edit a multi-step pipeline in Build mode
2. persist it through the Fastify API
3. trigger the chain from Chat mode
4. inspect generated messages, artifacts, events, approvals, and project state through the backend routes

## Recommended validation before handoff

- `npm run build`
- `GET /api/bootstrap`
- one chat-session run through `POST /api/chat-sessions/:sessionId/messages`
- if the pipeline includes an approval node, one approval resolution through `POST /api/approvals/:approvalId/resolve`
