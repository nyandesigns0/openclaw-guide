# Chapter 1 — Introduction

## 1.1 Overview

### OpenClaw System Overview

**Goal:** Build a stable, maintainable OpenClaw core engine on a Windows ThinkPad to serve as a practical foundation for a new user. \
**OpenClaw Architecture:** A `Vite` + `Lit` browser UI served by the Gateway, talking directly to a WebSocket/HTTP control layer, backed by a `Node.js` `ESM` runtime/CLI, followed by model selection and failover, a plugin and skill extension layer, channel and node connectivity, and `JSON5` plus file-based persistence under `~/.openclaw/`. \
**Extension Architecture:** Implement an extension-first, Git-managed, runtime-separated, multi-agent capable, and upgrade-safe system. \
**Stack:** Expose secure browser access through a Cloudflare stack.

### Hardware Overview
**Device name:** DESKTOP-OESD4AG \
**Laptop:** Lenovo ThinkPad \
**Likely model:** ThinkPad Carbon, still unconfirmed \
**CPU:** Intel Core i5-8350U @ 1.70 GHz \
**RAM:** 16.0 GB installed, 15.8 GB usable \
**System type:** 64-bit operating system, x64-based processor \
**Storage:** 500 GB \
**Device ID:** 9CC8C135-1159-4E14-A450-18EEB977D876 \
**Product ID:** 00330-51685-69764-AAOEM

### Core Objective
**Objective:** Set up a practical, maintainable, new-user OpenClaw system on this Windows laptop. \
**Engine:** Keep OpenClaw as the runtime engine. \
**Customization:** Build custom behavior around it without turning the system into a second orchestration layer or a fragile deep fork.

### Hardlines
Keep OpenClaw as runtime engine. \
Use thin fork plus extensions. \
Keep custom system mostly external to core. \
Patch core only when engine-level changes are truly necessary. \
Do not build a second orchestration framework on top unless there is a hard technical reason. \
Separate source code from runtime state. \
Do not store source repos inside `~/.openclaw/`. \
Keep canonical agent state in Git outside the live runtime workspace. \
Prefer extension-based customization over core rewrites. \
Prefer maintainability first, sophistication second. \
Keep OpenClaw bound to loopback for remote browser deployment. \
Do not use same-host loopback trusted-proxy mode. \
Do not expose OpenClaw directly with public port forwarding.
