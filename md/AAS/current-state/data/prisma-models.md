# Prisma Models

The canonical schema lives in:
- `app/backend/prisma/schema.prisma`

## Core models currently in use

### `Project`
Top-level container for pipelines, chat sessions, runs, assets, events, and project state.

### `ProjectState`
Canonical durable project/session state.
Fields include:
- active session id
- active run id
- concept JSON
- rules JSON
- constraints JSON
- artifact references JSON
- state JSON
- revision
- updated by

### `ProjectAsset`
First-class artifact record.
Fields include:
- project, pipeline, run, session, step, and pipeline-node links
- title and description
- kind and artifact type
- role and status
- file path and media URL
- content text
- agent attribution
- lineage JSON
- metadata JSON

### `AASPipeline`
Saved pipeline definition.
Fields include:
- name
- description
- status
- entryNodeId

### `AASPipelineNode`
One block in the execution graph.
Fields include:
- key
- label
- nodeType
- agentRole
- taskPrompt
- systemPrompt
- persistentContext
- contextMode
- sortOrder
- x / y

### `AASPipelineEdge`
Directed connection between pipeline nodes.
Fields include:
- sourceNodeId
- targetNodeId
- label

### `ChatSession`
A conversational run surface tied to a pipeline.
Fields include:
- title
- status
- projectId
- pipelineId

### `ChatMessage`
Persisted chat item inside a chat session.
Fields include:
- role
- authorName
- content
- pipelineNodeId
- metadataJson

### `AASRun`
Execution record for a pipeline run.
Fields include:
- projectId
- pipelineId
- chatSessionId
- status
- currentStep
- triggerSource

### `AASRunStep`
Per-step execution history.
Fields include:
- pipelineNodeId
- stepId
- stepLabel
- status
- attempt
- startedAt
- completedAt
- summary
- outputJson
- agentName
- agentRole

### `AASApproval`
Approval checkpoint record.
Fields include:
- run and chat-session links
- run-step link
- stepId
- title
- requestNote
- status
- requestedAt
- resolvedAt
- note
- responseJson

### `AASEvent`
Simplified execution log record.
Fields include:
- project, run, session, pipeline, step, and node links
- eventType
- level
- summary
- payloadJson
- agent attribution

### `AASBoard`
Reserved board package record for later rendering and final-delivery workflows.

## Relationship summary

- one `Project` owns many pipelines, sessions, runs, assets, and events
- one `Project` owns one `ProjectState`
- one `AASRun` owns many steps, approvals, assets, and events
- one `ChatSession` can accumulate many messages, approvals, assets, and events across runs
- `ProjectAsset` can reference a source asset for lineage chains

## Practical note

The schema is now materially ahead of the UI. It supports richer artifact, approval, and log workflows than the frontend currently renders.
