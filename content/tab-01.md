# Chapter 1 — Introduction

## 1.1 Overview

### OpenClaw System Overview

**One-line summary:** Build OpenClaw as stable core engine on Windows ThinkPad, keep custom multi-agent system in extensions and registry repos, keep runtime state separate, and expose browser access securely through Cloudflare stack.

### Overall Design Position
This system is meant to be:
- extension-first
- Git-managed
- runtime-separated
- multi-agent capable
- browser-accessible
- upgrade-safe
- operator-focused, not public multi-tenant SaaS

### Primary Goal
Build a new OpenClaw system on this Windows machine that is practical, maintainable, upgrade-safe, and usable by a new user.

### Core Objective
Use OpenClaw as engine. Build custom system around it without turning system into second orchestration layer or fragile fork.

### Hardlines
- Keep OpenClaw as runtime engine.
- Use thin fork plus extensions.
- Keep custom system mostly external to core.
- Patch core only when engine-level changes are truly necessary.
- Do not build second orchestration framework on top unless hard technical reason exists.
- Separate source code from runtime state.
- Do not store source repos inside `~/.openclaw/`.
- Keep canonical agent state in Git outside live runtime workspace.
- Prefer extension-based customization over core rewrites.
- Prefer maintainability first, sophistication second.

### Machine Facts
- **Device name:** DESKTOP-OESD4AG
- **Laptop:** Lenovo ThinkPad
- **Likely model:** ThinkPad Carbon, still unconfirmed
- **CPU:** Intel Core i5-8350U @ 1.70 GHz
- **RAM:** 16.0 GB installed, 15.8 GB usable
- **System type:** 64-bit OS, x64-based processor
- **Storage:** 500 GB
- **Device ID:** 9CC8C135-1159-4E14-A450-18EEB977D876
- **Product ID:** 00330-51685-69764-AAOEM

### Repository / State Model
- `~/dev/openclaw-upstream/`: tracked upstream or fork of official OpenClaw
- `~/dev/openclaw-extensions/`: dashboard, router logic, fallback logic, sync tooling, orchestration helpers
- `~/dev/openclaw-agent-registry/`: canonical agent markdown and schemas
- `~/.openclaw/`: runtime config, sessions, agent state, workspace files

### Source of Truth Policy
Canonical source of truth lives in Git-managed registry, not only in live workspace.

**Canonical files:**
- `AGENTS.md`
- `SOUL.md`
- `TOOLS.md`
- memory schemas
- board schemas

**Runtime rule:**
- Registry repo = canonical state
- `~/.openclaw/` = operational live state
- Sync or generate canonical files into runtime workspace as needed

### Planned System Features
- External dashboard
- File-backed task boards
- File-backed memory system where possible
- Custom tools through supported extension points
- Clean sub-agent support
- Narrow router / pipeline / fallback boundary
- GPT/API fallback chain
- Sync / generation tooling from registry into runtime workspace
- Remote browser access stack

### Multi-Agent Direction
System should support:
- main agent
- sub-agents with clean isolation
- agent-to-agent coordination
- routing / fallback logic in one narrow extension boundary
- minimal core interference

### Feature Placement Rules
Best place for features:
- Dashboard: external
- Boards: file-backed, shown in dashboard
- Memory: file-backed where possible
- Tools: extension points first
- Sub-agents: isolated
- Routers / pipelines / chains: one narrow boundary
- Fallback chain: in extensions repo first

### Risk Boundaries
**Low-risk**
- dashboards
- board UIs
- markdown registries
- sync tools

**Medium-risk**
- sub-agent coordination
- memory integration rules
- some pipeline hooks

**High-risk**
- model routers inside core
- prompt assembly rewrites
- runtime scheduler changes
- deep execution-chain changes

**Upgrade Rule:** More internal execution changes = harder future upstream updates.

### Remote Access Goal
Access same local OpenClaw instance from any browser, including locked-down devices, without exposing origin directly.

### Remote Access Hardlines
- Keep OpenClaw bound to loopback
- Use Cloudflare Tunnel for publication
- Use Cloudflare Access for identity and MFA
- Use OpenClaw token/password auth as second layer
- Set explicit `allowedOrigins`
- Do not use same-host loopback trusted-proxy mode
- Do not expose OpenClaw directly with public port forwarding

### Remote Access Stack
- Cloudflare Tunnel
- Cloudflare Access
- OpenClaw token or password auth
- exact `gateway.controlUi.allowedOrigins`

### Open Questions
- Exact ThinkPad model
- Exact Windows version and edition
- Admin access availability
- OpenClaw source repo / package source
- Dependency needs: Python, Docker, WSL, virtualization
- Local model execution vs API-only operation
