# Chapter 2.1 - Hermes Execution Architecture

## 2.1.0 Overview

Hermes is the durable execution substrate of A.A.S. It runs specialist work through profiles, Kanban task groups, workers, dispatcher behavior, skills, memory, logs, comments, and execution state.

A.A.S. decides what architectural work means. Hermes executes the work. The A.A.S. backend remains the product-truth layer, while Hermes remains the execution layer.

```text
A.A.S. Move
  -> backend validation
  -> MoveCompiler
  -> Hermes task packet
  -> Hermes profile / Kanban task
  -> worker execution
  -> logs, comments, artifacts, structured output
  -> bridge event and artifact registration
  -> A.A.S. command / patch / commit
```

### 2.1.1 Hermes Role in A.A.S.

**Execution Substrate:** Hermes runs approved A.A.S. work after the A.A.S. backend validates legality, risk, required context, and approval state. \
**Profile Host:** Hermes profiles act as durable specialist agent bodies such as research, concept, model, representation, critic, and supervisor profiles. \
**Task Coordinator:** Hermes Kanban coordinates task groups, dependencies, status, blocking, retries, comments, logs, and handoffs. \
**Worker Runtime:** Hermes workers execute assigned tasks, use tools, write logs, produce artifacts, and return structured outputs. \
**Procedural Memory:** Hermes memory and skills improve how profiles execute work. They do not define project truth. \
**Observable Runtime:** Hermes exposes task, log, comment, artifact, and heartbeat state for the A.A.S. bridge to translate into stable A.A.S. events.

### 2.1.2 Hermes Runtime Components

**Profiles:** Named specialist agent environments with role instructions, allowed tools, skill access, output expectations, and memory scope. \
**Kanban Tasks:** Durable work items with status, owner profile, dependencies, comments, logs, artifacts, and completion contract. \
**Task Groups:** Coordinated sets of tasks created from one A.A.S. move, usually with dependencies and shared artifact expectations. \
**Dispatcher:** The service that assigns ready tasks to workers, respects dependencies, handles blocked work, and retries or fails tasks when needed. \
**Workers:** Agent processes that receive task packets, read allowed context, run tools, produce artifacts, and submit structured results. \
**Memory:** Profile-local and shared procedural recall used for habits, lessons, reusable methods, and role improvement. \
**Skills:** Reusable executable or instructional capability packs that teach profiles how to perform recurring work. \
**Logs and Comments:** Hermes-owned execution traces. A.A.S. can ingest and summarize them, but they are not canonical project truth by themselves. \
**Artifact Roots:** Controlled locations where Hermes writes task outputs for A.A.S. ingestion and registration.

### 2.1.3 Hermes Task Packet Contract

Hermes receives compact, structured task packets from A.A.S. rather than raw project state or broad chat history.

Each packet contains:

**Move Reference:** A.A.S. move ID, primitive type, pattern ID, expected outcome, approval state, and reversibility. \
**Project Context:** Project ID, session ID, active branch or target artifact, relevant direction nodes, active tensions, relevant commits, and current constraints. \
**Role Assignment:** Assigned Hermes profile, role name, allowed tools, expected deliverables, and output contract. \
**Agent Brief:** A compact brief prepared by A.A.S. with only the context needed for the task. \
**Artifact Contract:** Input artifact references, output artifact root, expected file types, required metadata, and lineage requirements. \
**Completion Contract:** Required structured result, success criteria, failure reasons, warnings, evaluator hooks, and command or patch format. \
**Safety Rules:** Approval gates, locked records, forbidden mutations, cost limits, and tool boundaries.

### 2.1.4 Hermes Execution Loop

1. A.A.S. validates and approves a move.
2. MoveCompiler maps the move to a Hermes task group.
3. The A.A.S.-Hermes Bridge creates task packets and task bindings.
4. Hermes Kanban receives tasks with dependencies and assigned profiles.
5. The dispatcher assigns ready tasks to workers.
6. Workers execute with the task packet, profile memory, skills, and allowed tools.
7. Workers write comments, logs, artifacts, and structured completion data.
8. The bridge watches status, logs, and artifact folders.
9. A.A.S. registers artifacts and translates Hermes state into A.A.S. events.
10. Accepted structured outputs become A.A.S. patches or commands.
11. A.A.S. updates project truth, WorldState, move state, feature state, and next affordances.

### 2.1.5 Status and Event Translation

Hermes task states translate into stable A.A.S. events rather than leaking raw Hermes internals into the frontend.

| Hermes State | A.A.S. Event Meaning |
|--------------|----------------------|
| Task created | Move execution was queued or task group was created |
| Task ready | Dependencies are satisfied and execution can start |
| Task running | Move execution has started |
| Task comment/log update | Move progress or diagnostic event |
| Task blocked | Move requires input, approval, dependency, or recovery |
| Artifact written | Candidate artifact exists and needs registration |
| Task completed | Move execution produced structured output |
| Task failed | Move failed and needs retry, correction, replacement, or supervisor review |
| Worker heartbeat lost | Runtime warning or recovery affordance |

The frontend sees A.A.S. event names and record IDs. It does not depend on raw Hermes database paths, worker internals, or profile-home layouts.

### 2.1.6 Hermes Anti-Patterns

**Hermes as Project Truth:** Do not let profile memory, Kanban comments, task logs, or local worker caches define A.A.S. project state. \
**Frontend-to-Hermes Control:** Do not let the frontend run Hermes commands, mutate Kanban state, or read profile homes directly. \
**Raw Tool Maze:** Do not ask Hermes profiles to choose from every low-level tool for ordinary design reasoning. A.A.S. sends meaningful task packets. \
**Unscoped Shared Profiles:** Do not let one shared profile carry project-specific taste, facts, or commitments across unrelated projects without A.A.S. filtering. \
**Silent Artifact Adoption:** Do not treat a file written by Hermes as an accepted A.A.S. artifact until the bridge registers it with lineage and metadata. \
**Hidden State Mutation:** Do not let Hermes directly mutate A.A.S. database rows outside backend commands, patches, approvals, and version checks. \
**Bridge Bypass:** Do not allow ad hoc scripts, manual task edits, or profile-local shortcuts to become the normal execution path.
