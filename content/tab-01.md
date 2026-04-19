# Chapter 1 — Introduction

## 1.1 Overview

### OpenClaw System Overview

(to-be-updated) **Goal:** Build a stable, maintainable OpenClaw core engine on a Windows ThinkPad to serve as a practical foundation for a new user. \
**OpenClaw Architecture:** A `Vite` + `Lit` browser UI served by the Gateway, talking directly to a WebSocket/HTTP control layer, backed by a `Node.js` `ESM` runtime/CLI, followed by model selection and failover, a plugin and skill extension layer, channel and node connectivity, and `JSON5` plus file-based persistence under `~/.openclaw/`. \
(to-be-updated) **Extension Architecture:** Implement an extension-first, Git-managed, runtime-separated, multi-agent capable, and upgrade-safe system. \
(to-be-updated) **Stack:** Expose secure browser access through a Cloudflare stack.

### Hardware Overview
**Laptop:** Lenovo ThinkPad \
**CPU:** Intel Core i5-8350U @ 1.70 GHz \
**RAM:** 16.0 GB installed, 15.8 GB usable \
**System type:** 64-bit operating system, x64-based processor \
**Storage:** 500 GB \
**Device ID:** 9CC8C135-1159-4E14-A450-18EEB977D876 \
**Product ID:** 00330-51685-69764-AAOEM

### Core Objective
(to-be-updated) **Objective:** Set up a practical, maintainable, new-user OpenClaw system on this Windows laptop. \
(to-be-updated) **Engine:** Keep OpenClaw as the runtime engine. \
(to-be-updated) **Customization:** Build custom behavior around it without turning the system into a second orchestration layer or a fragile deep fork.

### Hardlines
(to-be-updated) **Runtime:** Keep OpenClaw as runtime engine. \
(to-be-updated) **Extensions:** Use thin fork plus extensions. \
(to-be-updated) **Custom System:** Keep custom system mostly external to core. \
(to-be-updated) **Core Patches:** Patch core only when engine-level changes are truly necessary. \
(to-be-updated) **Orchestration:** Do not build a second orchestration framework on top unless there is a hard technical reason. \
(to-be-updated) **Source Control:** Separate source code from runtime state. \
(to-be-updated) **Store Source Code:** Do not store source repos inside `~/.openclaw/`. \
(to-be-updated) **Keep Canonical Agent State:** Keep canonical agent state in Git outside the live runtime workspace. \
(to-be-updated) **Prefer:** Prefer extension-based customization over core rewrites. \
(to-be-updated) **Prefer:** Prefer maintainability first, sophistication second. \
(to-be-updated) **Browser Deployment:** Keep OpenClaw bound to loopback for remote browser deployment. \
(to-be-updated) **Trusted Proxy:** Do not use same-host loopback trusted-proxy mode. \
(to-be-updated) **Port Forwarding:** Do not expose OpenClaw directly with public port forwarding.
