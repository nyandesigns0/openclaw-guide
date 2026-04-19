# Chapter 2 — Architecture

## 2.1 Overview

This chapter outlines the multi-agent architecture, mental models, and recommended deployment topologies for OpenClaw.

### 2.2 Mental Model

**Full Agent:** A real OpenClaw agent object with its own workspace, `agentDir`, auth store, and session store. \
**Subagent:** An isolated session run under an agent ID, not a second full agent definition; depth-1 subagents can orchestrate depth-2 workers if `maxSpawnDepth: 2` is set. \
**Full Agents (Durable Roles):** They own workspace files (`AGENTS.md`, `SOUL.md`, etc.), per-agent auth (`~/.openclaw/agents/<agentId>/agent/auth-profiles.json`), and per-agent transcripts (`~/.openclaw/agents/<agentId>/sessions/*.jsonl`). \
**Subagents (Task Executions):** They run in their own session keys like `agent:<id>:subagent:<uuid>`, are tracked as background tasks, and do not become new top-level agents with their own `agentDir`.

### 2.3 Recommended Shape

**Orchestrator:** Only public/bound entrypoint. \
**Research:** Full agent specialist. \
**Builder:** Full agent specialist. \
**Ops:** Full agent specialist. \
**Optional Later:** Docs, QA, Planner. \
**Routing:** Public traffic routes only to `orchestrator` through `bindings`; specialist full agents exist as internal profiles with their own workspaces/tool policies. \
**Delegation:** The orchestrator delegates by spawning runs under their `agentId`, not by exposing them all as public chat endpoints.

### 2.4 Delegation Pattern

**`sessions_spawn`:** Use `sessions_spawn(agentId: "<specialist>")` as the primary dispatch for job-style work. \
**Spawn Benefits:** It creates an isolated background run, returns immediately with `runId` and `childSessionKey`, reports completion back through the announce chain, and can target another agent ID if allowed. \
**`sessions_send`:** Use `sessions_send` only for persistent specialist conversation where the orchestrator must talk to an already-existing specialist session. \
**Messaging vs Execution:** `sessions_send` is session-to-session messaging, whereas `sessions_spawn` is task execution.

### 2.5 Orchestration Chain

**Depth 0:** `orchestrator` main session. \
**Depth 1:** Specialist run under `research`, `builder`, or `ops` (gets `sessions_spawn`, `subagents`, etc.). \
**Depth 2:** Worker leaf subagents spawned by that specialist (never gets recursive spawn). \
**Execution Flow:** User talks to `orchestrator`, which spawns a specialist under that full agent's profile, the specialist spawns leaf subagents if needed, and results bubble up from child to specialist to orchestrator to user.

### 2.6 Separation Rules

**Orchestrator:** Broad visibility, narrow mutation authority, can route and synthesize, and should not own every dangerous tool. \
**Research:** Read-heavy tools like web, search, memory, and file read, and likely no `exec` permissions. \
**Builder:** Code and file mutation, shell/process execution, and may be sandboxed but writable. \
**Ops:** Diagnostics, logs, maintenance, and probably the strongest approvals. \
**Policies:** OpenClaw supports per-agent sandbox and per-agent tool policy; agent-specific sandbox settings override global defaults, and tool policy is filtered through all layers with deny always winning.

### 2.7 Cross-Agent Calling

**Visibility Gate:** `tools.sessions.visibility: "all"` allows session tools to target any session, while default visibility is `tree` (sees only current session plus spawned subagents). \
**Targeting Gate:** Cross-agent targeting requires `tools.agentToAgent`. \
**Worker Visibility:** Workers should usually stay at `tree` visibility. \
**Orchestrator Visibility:** Only the orchestrator should get cross-agent reach. \
**Sandbox Verification:** If you sandbox the orchestrator, verify you are not being clamped back to `tree` by sandbox session-visibility rules.

### 2.8 Auth Caveat

**Cross-Agent Isolation:** Cross-agent subagent spawn is not perfect isolation yet. \
**Auth Resolution:** When a subagent is spawned under another `agentId`, auth resolves by target agent ID, but the main agent's auth profiles are merged in as fallback. \
**Security Separation:** If you care about strong auth isolation, treat cross-agent spawning as logical separation rather than hard security separation.

### 2.9 File Structure

**Workspace Configuration:** Keep each workspace (`workspace-orchestrator`, `workspace-research`, etc.) in `~/.openclaw/` alongside the main `openclaw.json`. \
**Workspace Contents:** Include `AGENTS.md`, `SOUL.md`, `TOOLS.md`, `IDENTITY.md`, `USER.md`, `HEARTBEAT.md`, and a `skills/` directory. \
**Agent Data:** Keep `auth-profiles.json` and `sessions/` separated per agent under `~/.openclaw/agents/<agentId>/`. \
**Context Injection:** Workspace bootstrap files are injected into project context automatically.

### 2.10 Workspace Guidance

**Bootstrap Injection:** OpenClaw injects `AGENTS.md`, `SOUL.md`, `TOOLS.md`, `IDENTITY.md`, `USER.md`, `HEARTBEAT.md`, and first-run `BOOTSTRAP.md` into project context. \
**Disable Auto-creation:** If you pre-seed workspaces yourself, set `agents.defaults.skipBootstrap: true` to disable auto-creation. \
**Role Specificity:** Keep each full agent's `AGENTS.md` role-specific and short, focusing only on the role contract, decision boundary, and escalation rules. \
**Avoid Bloat:** Do not dump giant routing registries into every workspace file; large bootstrap files are truncated by config caps.

### 2.11 Minimal Config Strategy

**Default Agent:** Use one public default agent (`orchestrator`) bound to inbound channels like `webchat`. \
**Internal Specialists:** Configure internal specialists (`research`, `builder`, `ops`) without direct external bindings. \
**Subagent Defaults:** Set `maxSpawnDepth: 2`, `maxChildrenPerAgent: 5`, `maxConcurrent: 4`, and a reasonable `runTimeoutSeconds` in `agents.defaults.subagents`. \
**Orchestrator Setup:** Allow the orchestrator to route to other agents by configuring `allowAgents` and setting `requireAgentId: true`. \
**Agent Communication:** Enable `tools.agentToAgent` for your designated full agents and set `tools.sessions.visibility: "all"`. \
**Validation:** Verify final field paths against `openclaw config schema` as config validation is strict.

### 2.12 Agent Invocation

**External User to Orchestrator:** Inbound `bindings` route messages to the orchestrator; the most-specific binding wins, falling back to the default agent. \
**Orchestrator to Specialist:** Use `sessions_spawn(agentId: "research" | "builder" | "ops")` for isolated task runs. \
**CLI Testing:** Use `openclaw agent --agent <id> --message "..."` to target a configured agent directly, useful for testing specialist prompts and tools.

### 2.13 Anti-Patterns

**Context Engine Routing:** Do not put routing logic into a custom context engine first, as `prepareSubagentSpawn` is not invoked yet by runtime. \
**Day 1 Exposure:** Do not expose every specialist with inbound bindings on day 1; bind only the orchestrator to avoid accidental direct-user access to high-privilege agents. \
**Session IDs as Auth:** Do not treat session IDs as auth; session identifiers are routing selectors, not authorization tokens.

### 2.14 First Implementation

**Phase 1:** Create 4 full agents, bind only `orchestrator`, enable `maxSpawnDepth: 2`, let orchestrator dispatch with `sessions_spawn(agentId)`, keep worker tools tight, and keep specialists unbound. \
**Phase 2:** Give specialists their own leaf-worker subagent patterns, add per-agent skills/tool policies, and add explicit session visibility and agent-to-agent allowlists. \
**Phase 3:** Only consider pluginized router or custom context engine behavior if native primitives prove insufficient. \
**Next Steps:** Draft a concrete `openclaw.json` starter plus role-specific `AGENTS.md` templates for `orchestrator`, `research`, `builder`, and `ops`.
