# Chapter 0.2 - Local Workstation and Tooling Setup

## 0.2.0 Overview

This chapter preserves local setup and workstation notes that support A.A.S. development. It is not part of the A.A.S. system architecture. Architecture belongs in Chapters 1-3, and implementation planning belongs in Chapter 4.

Private account identifiers, credentials, API keys, and login details should be stored in a private credential manager or handoff note, not in this reader-facing guide.

### 0.2.1 Workstation Reference

The source notes identify a Lenovo ThinkPad workstation used for A.A.S. work:

| Item | Value |
|------|-------|
| Laptop | Lenovo ThinkPad |
| CPU | Intel Core i5-8350U @ 1.70 GHz |
| RAM | 16.0 GB installed, 15.8 GB usable |
| System type | 64-bit operating system, x64-based processor |
| Storage | 500 GB |
| Device ID | 9CC8C135-1159-4E14-A450-18EEB977D876 |
| Product ID | 00330-51685-69764-AAOEM |

### 0.2.2 Windows Setup

**Clipboard History:** Press `Windows + V` and select **Turn on** to enable multi-item clipboard history. \
**Power Settings:** Set the power plan to **High Performance** and configure sleep timers to **Never** for uninterrupted long-running development or agent operations. \
**Startup Apps:** Disable non-essential applications in **Task Manager > Startup** to preserve resources for development, browser testing, local servers, and agent work. \
**Account Notes:** The source material included account setup details. Keep those details in private operational storage rather than this public guide.

### 0.2.3 Driver Setup

**Lenovo Service Bridge:** Use Lenovo Service Bridge for ThinkPad driver detection when needed. The source notes say Lenovo Service Bridge functions most reliably through Firefox. \
**Manual Driver Area:** Mouse, touchpad, keyboard, and pen drivers were called out as manually useful for this workstation. \
**Driver Utility:** The source notes also referenced IObit Driver Booster as a free utility option. Treat third-party driver utilities as optional and verify driver sources before use.

### 0.2.4 Development Tooling

Install the core tools required for local A.A.S. documentation and app development:

| Tool | Purpose |
|------|---------|
| Google Chrome | Browser testing and local app inspection |
| Firefox | Lenovo Service Bridge compatibility and browser cross-checking |
| Microsoft Visual C++ Redistributable | Native dependency support for Windows tools |
| Node.js | JavaScript/TypeScript runtime and package tooling |
| Git | Version control |
| VS Code | Code and documentation editing |
| OpenAI Codex | Agent-assisted development workflow |
| ChatGPT | Design, planning, and documentation support |

### 0.2.5 Guide Verification

For this documentation app, the minimum validation command is:

```text
npm run build
```

The build should pass after content, navigation, or markdown-rendering changes. If `content/index.json` is edited, verify that every indexed file exists and that the JSON parses before treating the docs as stable.
