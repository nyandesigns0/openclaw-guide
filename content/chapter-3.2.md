# Chapter 3.2 - Feature List

## 3.2.0 Overview

The A.A.S. application is organized around the Field Runtime and its primary UI, the Field Navigator. Chat, Model Mode, Trace View, and Move Library View support the same world-state-driven design field rather than separate workflow silos. Hermes is the execution substrate behind the visible field.

### 3.2.1 Field Navigator

**Design Field Canvas:** A 2.5D or 3D spatial canvas where goals, branches, tensions, affordances, commits, artifacts, features, Hermes agents, and task state appear as field objects. \
**Intent Core:** The current system intent sits at the center, pulling in active branches, tensions, required artifacts, top moves, blocked moves, open debts, and feature pressures. \
**Affordance Wheel:** Selecting an object reveals contextual moves such as develop, critique, validate, commit, merge, defer, ask user, generate artifact, or compile execution. \
**Commit Spine:** Project-truth decisions appear as a stable spine with evidence, rationale, affected artifacts, reversibility, approval state, and downstream constraints. \
**Branch Clusters:** Competing hypotheses are shown as clusters that can be developed, compared, merged, killed, or committed. \
**Tension Nodes:** Design conflicts appear as stress nodes connected to affected branches, artifacts, feature pressures, and blocked moves. Severity is visible through color, size, and motion. \
**Feature Pressure View:** Local design variables such as privacy, view, coherence, cost, risk, artifact completeness, ground-truth readiness, and elegance can be shown as pressure fields without exposing the whole score matrix. \
**Hermes Task Presence:** Hermes profiles appear as lightweight agent probes. Kanban task states map to field states: ready, running, heartbeat, blocked, completed, failed, retry, and archived. \
**Artifact Constellations:** Research, concept, ground-truth, model, drawing, render, diagram, board, evaluator, and QA artifacts cluster by type and lineage. \
**Inspector Panel:** Selecting a field object opens exact data: rationale, score breakdown, feature deltas, linked artifacts, task bindings, logs, approval state, and raw JSON when needed.

### 3.2.2 Chat Mode

**Conversation Layer:** Chat is used for explanations, questions, corrections, options, and conversational steering. \
**WorldState-Linked Messages:** Agent messages update the Field Navigator, and Field Navigator actions produce chat-visible reasoning and execution status. \
**Move Presentation:** Agents can present available moves, explain scoring, request approvals, and justify overrides in chat. \
**Preference Awareness:** Chat can surface which scoped preferences influenced an answer, such as a project commit, current prompt, user preference, or team standard. \
**Approval Flow:** High-impact commits, branch kills, expensive generation batches, finalization, reverts, preference conflicts, and overwrites can request user approval through chat and the field UI. \
**Artifact References:** Chat messages link to artifacts, branches, tensions, commits, evaluator outputs, and move results instead of treating messages as durable state.

### 3.2.3 Model Mode

**Ground-Truth Workspace:** Model Mode is the validation environment for spatial truth. \
**Model Affordances:** Moves can generate massing from a committed branch, cut floor plans, cut sections, validate render perspective, compare area against program, or rebuild after a branch commit. \
**Rhino Compute Integration:** Rhino Compute is invoked by MoveExecutor when a move requires geometry computation. It is not exposed as a raw everyday agent choice. \
**Geometry-Derived Features:** Model analysis can measure area, view orientation, solar exposure, adjacency, circulation length, section depth, openness, privacy zones, and other features. \
**Spatial QA:** Agents use model state to check consistency across plans, sections, renders, diagrams, boards, and commitments. \
**Versioned Models:** Model artifacts are versioned and linked to the moves, branches, commits, Hermes tasks, feature evaluations, and validation events that created them.

### 3.2.4 Trace View

**Execution History:** Trace View preserves graph utility by showing move history, Hermes Kanban dependencies, artifact lineage, feature deltas, retries, failures, approvals, and logs. \
**Replay:** WorldState snapshots and runtime events allow users to replay how the design field evolved. \
**Debugging:** Developers and operators can inspect failed moves, blocked preconditions, supervisor warnings, evaluator failures, bridge failures, validation failures, and branch decisions. \
**Not the Primary Model:** Trace View explains what happened. It does not replace the Field Navigator as the main design interface.

### 3.2.5 Move Library View

**Pattern Registry:** Shows stable, sandbox, proposed, and deprecated move patterns. \
**Pattern Detail:** Displays primitive type, domain, preconditions, inputs, outputs, expected effects, scoring hints, cost/risk profile, execution template, validation tests, examples, success stats, and failure modes. \
**Sandbox Results:** Shows how a pattern performed against saved WorldState snapshots and synthetic worlds. \
**Curator Controls:** Allows authorized users or curator agents to deduplicate, merge, promote, deprecate, or prune patterns. \
**Sensitivity Matrix:** Shows expected feature effects for each pattern and compares them against measured feature deltas over time.
