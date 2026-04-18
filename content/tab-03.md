# Chapter 2 — Architecture

## 2.1 Multi-Agent Architecture

Current OpenClaw docs support this pattern with one clean mental model:

**full agent** = real OpenClaw agent object with its own workspace, `agentDir`, auth store, and session store.
**subagent** = isolated session run under an agent id, not a second full agent definition. By default subagents are leaf workers; if you set `maxSpawnDepth: 2`, a depth-1 subagent can itself orchestrate depth-2 workers. ([OpenClaw][1])

### 1. Recommended shape

Use this topology:

* `orchestrator` — only public/bound entrypoint
* `research` — full agent
* `builder` — full agent
* `ops` — full agent
* optional later: `docs`, `qa`, `planner`

Public traffic routes only to `orchestrator` through `bindings`. Specialist full agents exist as internal profiles with their own workspaces/tool policies. The orchestrator delegates to them by spawning runs under their `agentId`, not by exposing them all as public chat endpoints. OpenClaw bindings are deterministic and route inbound traffic to an `agentId`; each `agentId` is a separate brain with separate auth and sessions. ([OpenClaw][1])

### 2. How to think about “full agents” vs “subagents”

Full agents are your durable roles. They own:

* workspace files like `AGENTS.md`, `SOUL.md`, `TOOLS.md`, `IDENTITY.md`, `USER.md`
* per-agent auth in `~/.openclaw/agents/<agentId>/agent/auth-profiles.json`
* per-agent transcripts in `~/.openclaw/agents/<agentId>/sessions/*.jsonl` ([OpenClaw][2])

Subagents are task executions. They run in their own session keys like `agent:<id>:subagent:<uuid>` and are tracked as background tasks. They do not become new top-level agents with their own `agentDir`. If sandboxing is enabled for non-main sessions, they can get per-session sandbox workspaces, but that is sandbox runtime behavior, not a new full-agent workspace model. ([OpenClaw][3])

### 3. Best delegation pattern

Use **`sessions_spawn(agentId: "<specialist>")` as primary dispatch**.

Why:

* it creates an isolated background run
* it returns immediately with `runId` and `childSessionKey`
* it reports completion back through the announce chain
* it can target another agent id if allowed via `subagents.allowAgents` ([OpenClaw][4])

Use **`sessions_send`** only for cases where the orchestrator must talk to an already-existing specialist session, usually that specialist’s `main` session, and optionally wait for a reply inline. `sessions_send` is session-to-session messaging; `sessions_spawn` is task execution. ([OpenClaw][4])

So, practical rule:

* **job-style work** → `sessions_spawn(agentId: specialist)`
* **persistent specialist conversation** → `sessions_send` to specialist main session

### 4. Exact orchestration chain I recommend

Use a 3-level max model:

* depth 0: `orchestrator` main session
* depth 1: specialist run under `research` / `builder` / `ops`
* depth 2: worker leaf subagents spawned by that specialist

That matches current OpenClaw depth semantics exactly. Docs recommend depth 2 for orchestrator patterns: main → orchestrator subagent → worker sub-subagents. Depth-1 orchestrators get `sessions_spawn`, `subagents`, `sessions_list`, and `sessions_history`; depth-2 workers never get recursive spawn. ([OpenClaw][3])

So your desired model becomes:

1. User talks to `orchestrator`
2. `orchestrator` spawns `research` or `builder` under that full agent’s profile
3. that specialist, if needed, spawns leaf subagents for parallel tool work
4. results bubble up child → specialist → orchestrator → user ([OpenClaw][3])

### 5. Separation rules

Keep these boundaries hard:

**Orchestrator**

* broad visibility
* narrow mutation authority
* can route and synthesize
* should not own every dangerous tool

**Research**

* read-heavy tools
* web/search/memory/file read
* maybe no `exec`

**Builder**

* code/file mutation
* shell/process
* maybe sandboxed but writable

**Ops**

* diagnostics, logs, maintenance
* probably strongest approvals

OpenClaw supports per-agent sandbox and per-agent tool policy. Agent-specific sandbox settings override global defaults, and tool policy is filtered through global, provider, agent, sandbox, and subagent layers. Deny always wins. ([OpenClaw][5])

### 6. How cross-agent calling actually works

For cross-agent session tools, two gates matter:

* `tools.sessions.visibility`
* `tools.agentToAgent`

`tools.sessions.visibility: "all"` is what allows session tools to target any session; cross-agent targeting still requires `tools.agentToAgent`. Default visibility is `tree`, which only sees current session plus spawned subagents. ([OpenClaw][6])

That means:

* workers should usually stay at `tree`
* only orchestrator should get cross-agent reach
* if you sandbox orchestrator, verify you are not getting clamped back to `tree` by sandbox session-visibility rules ([OpenClaw][6])

### 7. Important auth caveat

Cross-agent subagent spawn is not perfect isolation yet.

When a subagent is spawned under another `agentId`, auth resolves by target agent id, **but** the main agent’s auth profiles are merged in as fallback. Docs explicitly say fully isolated auth per agent is not supported yet. So if you care about strong auth isolation, treat cross-agent spawning as logical separation, not hard security separation. ([OpenClaw][3])

That is biggest current design caveat.

### 8. File structure I would use

```text
~/.openclaw/
  openclaw.json

  workspace-orchestrator/
    AGENTS.md
    SOUL.md
    TOOLS.md
    IDENTITY.md
    USER.md
    HEARTBEAT.md
    skills/

  workspace-research/
    AGENTS.md
    SOUL.md
    TOOLS.md
    IDENTITY.md
    USER.md
    skills/

  workspace-builder/
    AGENTS.md
    SOUL.md
    TOOLS.md
    IDENTITY.md
    USER.md
    skills/

  workspace-ops/
    AGENTS.md
    SOUL.md
    TOOLS.md
    IDENTITY.md
    USER.md
    skills/

  agents/
    orchestrator/
      agent/
        auth-profiles.json
      sessions/
    research/
      agent/
        auth-profiles.json
      sessions/
    builder/
      agent/
        auth-profiles.json
      sessions/
    ops/
      agent/
        auth-profiles.json
      sessions/
```

That matches current docs: workspace bootstrap files are injected into context; sessions live under `~/.openclaw/agents/<agentId>/sessions`; auth is per-agent in `agentDir`. ([OpenClaw][2])

### 9. Workspace/bootstrap guidance

OpenClaw injects `AGENTS.md`, `SOUL.md`, `TOOLS.md`, `IDENTITY.md`, `USER.md`, `HEARTBEAT.md`, and first-run `BOOTSTRAP.md` into project context. Large bootstrap files are truncated by config caps. If you pre-seed workspaces yourself, `agents.defaults.skipBootstrap: true` disables auto-creation. ([OpenClaw][7])

That means: keep each full agent’s `AGENTS.md` role-specific and short. Do not dump giant routing registries into every workspace file. Put only role contract, decision boundary, and escalation rules there. ([OpenClaw][7])

### 10. Minimal config strategy

Use one public default agent plus internal specialists. Sketch:

```json5
{
  agents: {
    defaults: {
      subagents: {
        maxSpawnDepth: 2,
        maxChildrenPerAgent: 5,
        maxConcurrent: 4,
        runTimeoutSeconds: 900
      }
    },
    list: [
      {
        id: "orchestrator",
        default: true,
        workspace: "~/.openclaw/workspace-orchestrator",
        agentDir: "~/.openclaw/agents/orchestrator/agent",
        subagents: {
          allowAgents: ["orchestrator", "research", "builder", "ops"],
          requireAgentId: true
        }
      },
      {
        id: "research",
        workspace: "~/.openclaw/workspace-research",
        agentDir: "~/.openclaw/agents/research/agent"
      },
      {
        id: "builder",
        workspace: "~/.openclaw/workspace-builder",
        agentDir: "~/.openclaw/agents/builder/agent"
      },
      {
        id: "ops",
        workspace: "~/.openclaw/workspace-ops",
        agentDir: "~/.openclaw/agents/ops/agent"
      }
    ]
  },

  tools: {
    agentToAgent: {
      enabled: true,
      allow: ["orchestrator", "research", "builder", "ops"]
    },
    sessions: {
      visibility: "all"
    }
  },

  bindings: [
    { agentId: "orchestrator", match: { channel: "webchat" } }
  ]
}
```

Those are current config surfaces: `agents.list`, `bindings`, `agents.defaults.subagents.*`, `tools.agentToAgent`, and `tools.sessions.visibility`. Config validation is strict, so verify final field paths against `openclaw config schema` before locking them in. ([OpenClaw][6])

### 11. How each agent is “called”

Three clean call paths:

**External user → orchestrator**
Inbound `bindings` route message to orchestrator. Most-specific binding wins; fallback is default agent. ([OpenClaw][8])

**Orchestrator → specialist full agent**
Use `sessions_spawn(agentId: "research" | "builder" | "ops")` for isolated task runs. ([OpenClaw][3])

**CLI/operator → specific full agent for testing**
Use `openclaw agent --agent <id> --message "..."`. That targets a configured agent directly and is useful for testing specialist prompts and tools without going through external channels. ([OpenClaw][9])

### 12. What I would not do

Do **not** put routing logic into a custom context engine first. Context engines control context assembly and can influence subagent boundaries, but the docs state `prepareSubagentSpawn` exists for future use and is **not invoked yet** by runtime. Wrong seam for first implementation. ([OpenClaw][10])

Do **not** expose every specialist with inbound bindings on day 1. Bind only orchestrator. Keep specialists internal until you have a reason to make them externally addressable. That preserves a single control point and avoids accidental direct-user access to high-privilege agents. This recommendation follows current deterministic binding and per-agent tool-policy model. ([OpenClaw][1])

Do **not** treat session IDs as auth. OpenClaw security docs are explicit: session identifiers are routing selectors, not authorization tokens. ([OpenClaw][11])

### 13. Best first implementation

Phase 1:

* create 4 full agents
* bind only `orchestrator`
* enable `maxSpawnDepth: 2`
* let orchestrator dispatch with `sessions_spawn(agentId)`
* keep worker tools tight
* keep specialists unbound externally

Phase 2:

* give `research` and `builder` their own leaf-worker subagent patterns
* add per-agent skills/tool policies
* add explicit session visibility and agent-to-agent allowlists

Phase 3:

* only then consider pluginized router or custom context engine behavior if native primitives prove insufficient

This path stays close to documented OpenClaw primitives: bindings for ingress, per-agent workspaces/auth/sessions for full agents, session tools for coordination, and subagents for ephemeral delegated work. ([OpenClaw][1])

Next artifact should be a concrete `openclaw.json` starter plus role-specific `AGENTS.md` templates for `orchestrator`, `research`, `builder`, and `ops`.

[1]: https://docs.openclaw.ai/concepts/multi-agent "Multi-Agent Routing - OpenClaw"
[2]: https://docs.openclaw.ai/concepts/agent "Agent Runtime - OpenClaw"
[3]: https://docs.openclaw.ai/tools/subagents "Sub-Agents - OpenClaw"
[4]: https://docs.openclaw.ai/concepts/session-tool "Session Tools - OpenClaw"
[5]: https://docs.openclaw.ai/tools/multi-agent-sandbox-tools "Multi-Agent Sandbox & Tools - OpenClaw"
[6]: https://docs.openclaw.ai/gateway/configuration-reference "Configuration Reference - OpenClaw"
[7]: https://docs.openclaw.ai/concepts/context "Context - OpenClaw"
[8]: https://docs.openclaw.ai/channels/channel-routing "Channel Routing - OpenClaw"
[9]: https://docs.openclaw.ai/cli/agent "agent - OpenClaw"
[10]: https://docs.openclaw.ai/concepts/context-engine "Context Engine - OpenClaw"
[11]: https://docs.openclaw.ai/gateway/security?utm_source=chatgpt.com "Security"
