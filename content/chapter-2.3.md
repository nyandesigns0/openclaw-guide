# Chapter 2.3 - Hermes Bridge and Runtime Surfaces

## 2.3.0 Overview

This chapter defines the bridge between A.A.S. and Hermes from the Hermes side. The bridge is backend-owned code that turns approved A.A.S. moves into Hermes execution work, watches Hermes runtime state, and translates Hermes outputs back into A.A.S. events, artifacts, patches, and task bindings.

The A.A.S.-Hermes Bridge is the only supported path from A.A.S. product state to Hermes execution state. The frontend never controls Hermes directly. Hermes never writes A.A.S. truth directly. The bridge sits between them.

### 2.3.1 Bridge Responsibilities

The bridge owns the execution boundary:

**Profile Binding:** Map A.A.S. roles and move requirements to Hermes profiles. \
**Task Packet Creation:** Write compact task packets with Agent Briefs, output contracts, artifact roots, and safety rules. \
**Task Creation:** Create Hermes Kanban tasks or task groups with dependencies and assigned profiles. \
**Dispatcher Coordination:** Start, observe, or request execution through supported Hermes surfaces. \
**Status Watching:** Watch task state, blocks, retries, failures, worker heartbeat, and completion. \
**Log Watching:** Tail or read task logs and comments, then convert meaningful updates into A.A.S. progress events. \
**Artifact Ingest:** Watch assigned artifact roots, register outputs as A.A.S. artifacts, and preserve lineage. \
**Event Translation:** Convert Hermes task state into stable A.A.S. runtime events. \
**Patch Submission:** Convert structured Hermes output into A.A.S. patches or commands. \
**Recovery Coordination:** Translate blocked or failed Hermes work into retry, cancel, replace, ask-user, or supervisor-review affordances.

### 2.3.2 Bridge Configuration

Bridge configuration should be explicit and environment-specific.

**Hermes Binary Path:** Location of the Hermes CLI or executable surface used for bridge control. \
**Kanban DB Path:** Location of Hermes task database if the bridge reads task state from SQLite or another local store. \
**Logs Directory:** Root path for worker logs, task logs, comments, and dispatcher traces. \
**Profile Roots:** Profile home locations and profile pack install paths. \
**Artifact Roots:** Directories where Hermes tasks are allowed to write outputs for A.A.S. ingestion. \
**Timeouts:** Task creation timeout, execution timeout, log stale timeout, artifact watch timeout, and heartbeat timeout. \
**Feature Flags:** Enable or disable CLI control, DB watching, log watching, artifact watching, MCP, plugin mode, or direct API mode. \
**Security Flags:** Local bind addresses, allowed commands, allowed artifact roots, redaction rules, and exposed surfaces.

### 2.3.3 CLI Bridge Foundation

The first practical bridge can use Hermes CLI commands if they are stable enough.

**Use CLI For:** Creating task groups, assigning profiles, starting dispatch, checking status, or exporting task metadata. \
**Do Not Use CLI For:** Frontend interaction, direct project truth mutation, unstructured state edits, or hidden artifact adoption. \
**Execution Pattern:** A.A.S. writes task packets first, calls Hermes CLI from backend bridge code, stores returned task IDs as bindings, then watches task state. \
**Traceability:** Every CLI call should record command intent, move ID, profile, task packet path, returned task ID, status, stderr/stdout summary where safe, and event ID. \
**Failure Rule:** CLI failure creates an A.A.S. bridge warning or move failure event. It should not leave a move pretending to be running.

```text
A.A.S. backend
  -> write task packet
  -> call Hermes CLI
  -> store KanbanTaskBinding
  -> watch Hermes status/logs/artifacts
  -> register outputs through A.A.S. backend
```

### 2.3.4 Kanban DB Watcher

If Hermes task state lives in a local Kanban database, the bridge may watch it as Hermes-owned execution state.

**Read Mostly:** Treat the Kanban DB as read-only unless Hermes explicitly supports writes. \
**State Mapping:** Map ready, running, blocked, done, failed, retrying, and cancelled states into A.A.S. move status. \
**Dependency Mapping:** Read dependency state to explain why a move is waiting. \
**Task Binding:** Store Hermes task IDs, task group IDs, profile names, move IDs, run IDs, status, timestamps, and last observed cursor. \
**Polling and Debounce:** Poll or subscribe conservatively. Debounce noisy state changes before emitting A.A.S. events. \
**Recovery:** If a watched task disappears, stalls, or conflicts with A.A.S. bindings, emit a supervisor warning.

### 2.3.5 Log and Comment Watcher

Hermes logs are execution evidence. They become A.A.S. events only after translation.

**Progress Events:** Summarize meaningful step changes, warnings, blocks, and completion messages. \
**Error Events:** Capture safe error summaries, failed command names, missing inputs, missing artifacts, and retry reasons. \
**Redaction:** Strip secrets, API keys, private local paths where unnecessary, raw prompt dumps, and unrelated environment data. \
**Cursoring:** Track last-read offsets or event IDs so reconnects and restarts do not duplicate events. \
**Linking:** Link log-derived events to move, task binding, run, profile, artifact, branch, and active tension where possible. \
**Retention:** A.A.S. may keep summarized events while Hermes keeps detailed execution logs.

### 2.3.6 Artifact Watcher and Registration

Hermes-produced files become A.A.S. artifacts only after registration.

**Allowed Roots:** Tasks write only under assigned artifact roots. \
**Expected Outputs:** The task packet declares expected file types, names, metadata, and completion criteria. \
**Detection:** The bridge watches for new or changed files after task start. \
**Registration:** The bridge creates A.A.S. artifact records with title, description, kind, type, path or served URL, source move, source task, profile, lineage, metadata, and status. \
**Validation:** Required artifacts can run validators before they become accepted. Failed validation creates warnings or follow-up moves. \
**Lineage:** Artifacts should link to source artifacts, branches, tensions, commits, evaluator outputs, and task bindings where relevant.

### 2.3.7 Profile and Skill Pack Sync

A.A.S. may install or sync Hermes profile packs so Hermes knows how to execute A.A.S. task packets.

**Profile Pack Contents:** Role instructions, allowed tools, task packet reader behavior, artifact conventions, patch format, and escalation rules. \
**Skill Pack Contents:** A.A.S. output contracts, artifact writing helpers, validation procedures, critique procedure, model procedure, and board/package procedure. \
**Versioning:** Profile and skill packs should carry version IDs so task packets can record which execution behavior was used. \
**Compatibility:** A bridge should detect missing or stale profile packs before dispatching work. \
**No Truth Transfer:** Syncing a profile pack does not copy A.A.S. project truth into Hermes memory.

### 2.3.8 MCP, Plugin, and Direct API Surfaces

Cleaner Hermes integration should come after the bridge foundation works.

**MCP Surface:** Useful for tool-style operations if Hermes exposes stable operations. MCP should not replace A.A.S. truth, scoring, command validation, artifact registration, or event history. \
**Hermes Plugin:** Useful if Hermes supports an internal plugin that can read A.A.S. task packets, report progress, and write structured results. \
**Direct API:** Best long-term surface if Hermes exposes stable HTTP/WebSocket controls for profiles, Kanban, dispatch, status, logs, and artifacts. \
**Bridge Abstraction:** A.A.S. frontend and product APIs should not change when the bridge swaps CLI internals for MCP, plugin, or direct API. \
**Selection Rule:** Use the simplest stable surface that supports task creation, status observation, artifact registration, and failure recovery.

### 2.3.9 Failure and Recovery

Bridge failures should degrade into visible A.A.S. states.

**Task Creation Failure:** Move remains not started or failed with bridge error summary. \
**Profile Missing:** Supervisor warning plus repair affordance to install or bind profile. \
**Task Blocked:** A.A.S. shows the block reason and asks for missing input or approval when needed. \
**Worker Failure:** Move enters failed or retryable state with task log reference. \
**Artifact Missing:** Move can complete execution but fail artifact validation, producing follow-up recovery moves. \
**Stale Heartbeat:** Bridge emits runtime warning and can retry, cancel, or reassign if supported. \
**Conflict on Writeback:** Hermes structured output becomes an A.A.S. patch. If versions conflict, A.A.S. re-reads state and asks Hermes or the user to resolve. \
**Partial Output:** Preserve useful failed outputs as provisional artifacts when they help debugging, comparison, critique, or QA.

### 2.3.10 Security and Exposure

Hermes surfaces are local execution surfaces and should be protected.

**Local Binding:** Bind Hermes and bridge services conservatively during local-first development. \
**No Public Profile Homes:** Do not expose Hermes profile homes, task DBs, logs, API keys, or artifact roots directly through public forwarding. \
**Backend Gate:** All user-facing operations go through the A.A.S. backend. \
**Command Allowlist:** CLI bridge commands should be explicit, narrow, and auditable. \
**Path Allowlist:** Artifact watching should stay inside approved project roots. \
**Secret Redaction:** Logs and structured results should redact secrets before becoming A.A.S. events. \
**Permission Mapping:** A.A.S. permissions and approvals decide whether a Hermes output can become an accepted patch, artifact, branch change, or commit.

### 2.3.11 Bridge Anti-Patterns

**Frontend Runs CLI:** The frontend must not shell out to Hermes or mutate Kanban directly. \
**Kanban as A.A.S. Database:** Hermes Kanban is execution state, not A.A.S. product truth. \
**Raw Log Streaming as UI Contract:** Logs should be translated into stable A.A.S. events and summaries. \
**Unregistered Files:** Files are not A.A.S. artifacts until registered. \
**Bridge Writes Truth Directly:** Structured outputs must pass through A.A.S. commands, patches, approvals, and version checks. \
**Surface Lock-In:** Do not couple A.A.S. product APIs to one Hermes integration method such as CLI or MCP. \
**Silent Recovery:** Retries, stalls, missing artifacts, and bridge failures should be visible through events and supervisor warnings.
