# Chapter 1 — Introduction

## 1.1 Overview

This chapter outlines the foundational goals, architectural approach, and strict design constraints for establishing a stable, extension-driven OpenClaw environment.

### 1.2 OpenClaw System Overview

*(to-be-updated)* **Goal:** Build a stable, maintainable OpenClaw core engine on a Windows ThinkPad to serve as a practical foundation for a new user. \
**OpenClaw Architecture:** A `Vite` + `Lit` browser UI served by the Gateway, talking directly to a WebSocket/HTTP control layer, backed by a `Node.js` `ESM` runtime/CLI, followed by model selection and failover, a plugin and skill extension layer, channel and node connectivity, and `JSON5` plus file-based persistence under `~/.openclaw/`. \
*(to-be-updated)* **Extension Architecture:** Implement an extension-first, Git-managed, runtime-separated, multi-agent capable, and upgrade-safe system. \
*(to-be-updated)* **Stack:** Expose secure browser access through a Cloudflare stack.

### 1.3 Hardware Overview
**Laptop:** Lenovo ThinkPad \
**CPU:** Intel Core i5-8350U @ 1.70 GHz \
**RAM:** 16.0 GB installed, 15.8 GB usable \
**System type:** 64-bit operating system, x64-based processor \
**Storage:** 500 GB \
**Device ID:** 9CC8C135-1159-4E14-A450-18EEB977D876 \
**Product ID:** 00330-51685-69764-AAOEM

### 1.4 Design Objectives
*(to-be-updated)* **Objective:** Set up a practical, maintainable, new-user OpenClaw system on this Windows laptop. \
*(to-be-updated)* **Engine:** Keep OpenClaw as the runtime engine. \
*(to-be-updated)* **Customization:** Build custom behavior around it without turning the system into a second orchestration layer or a fragile deep fork.

### 1.5 Design Hardlines
*(to-be-updated)* **Core Engine:** Maintain OpenClaw as a pristine runtime engine by using a thin fork, preferring extension-based customization over core rewrites, and keeping custom orchestration strictly external. \
*(to-be-updated)* **State Management:** Strictly separate source code from runtime state by keeping repositories outside `~/.openclaw/` and tracking canonical agent state externally in Git. \
*(to-be-updated)* **Security:** Bind OpenClaw strictly to loopback without exposing it directly via public port forwarding or same-host trusted-proxy mode. \
*(to-be-updated)* **Philosophy:** Prioritize maintainability and stability over architectural sophistication.
