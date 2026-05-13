# Current Pipeline Execution

## Important framing

The current execution path is a local backend runtime for validating the A.A.S. operator loop.
It is richer than the original first-test executor, but it is still not the final AAS + TaskFlow runtime.

## Execution entry points

- `POST /api/chat-sessions/:sessionId/messages`
- `POST /api/approvals/:approvalId/resolve`

## Core executor

- implementation: `app/backend/src/lib/pipeline-engine.ts`

## What the executor does now

1. load the chat session, pipeline, nodes, edges, prior messages, and project state
2. mark the session as running
3. create an `AASRun` record
4. create a `run.started` event
5. topologically order the nodes using edges and the entry node
6. for each node:
   - create a run-step record
   - create step-start events
   - simulate role-aware agent output from:
     - task prompt
     - system prompt
     - persistent context
     - context mode
     - latest user message
     - summarized chat history
     - upstream handoff notes
     - current project state
   - persist generated artifacts when the step produces them
   - update canonical project state
   - persist an agent or system message
   - persist step-complete events
7. if the node type is `approval`:
   - create an `AASApproval`
   - move the run and session to `waiting`
   - create approval-related events
   - return the session detail without executing remaining nodes
8. if approval is later resolved:
   - record approval resolution
   - resume remaining nodes on approval
   - or fail the run on rejection
9. when the final node completes:
   - mark the run completed
   - mark the session completed
   - create a `run.completed` event
   - return updated session detail

## Context modes supported now

- `inherit`: include full summarized context
- `summary`: include summarized upstream context
- `isolated`: exclude broader conversation snapshot from the generated node message

## Runtime outputs now persisted

- `ChatMessage`
- `AASRun`
- `AASRunStep`
- `ProjectAsset`
- `AASEvent`
- `AASApproval`
- `ProjectState`

## Why this exists

This executor makes the saved pipeline structure operational now, gives the frontend a real backend to target, and establishes the data model that a future AAS-native runtime should preserve.

## What is still simulated

- no real worker-model calls
- no true multi-branch concurrency
- no streaming event transport to the frontend
- no production artifact generators
- no external controller handoff yet
