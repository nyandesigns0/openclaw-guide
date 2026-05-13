# Chat Run Mode

## Purpose

Chat Run mode is the operator-facing execution loop.
The user sends a message into a saved pipeline and watches the chain respond step by step.

## Current capabilities

- create a chat session bound to a pipeline
- send a user message
- trigger pipeline execution
- render the resulting conversation
- show agent-authored messages in order
- persist the chat session and messages
- receive rich session detail from the backend, including artifacts, events, approvals, active run detail, and project state

## Current behavior

When the user submits a message:
1. the frontend calls `POST /api/chat-sessions/:sessionId/messages`
2. the backend stores the user message
3. the backend executes the pipeline in order
4. agent or system messages are created per step
5. artifacts, events, and project-state updates are persisted
6. if an approval node is hit, the session returns in a waiting state
7. the updated session detail is returned
8. the frontend re-renders the conversation shell

## Current limitation

This is still not a live streaming runtime.

It is currently a request -> execute until wait or completion -> return updated thread loop.

## Right sidebar status

The right sidebar design is now represented in the UI shell with tabs for:
- General
- Files
- Editor
- Terminal

The backend now has real data for those concepts, but the frontend still uses a mix of real data and preview scaffolding.

## What a future version should add

- explicit approval controls in the UI
- live event streaming into the Terminal tab
- real file-browser wiring against persisted artifacts
- real file/editor wiring for markdown and images
- interrupt / resume controls beyond the current approval route
- multi-branch execution visibility
