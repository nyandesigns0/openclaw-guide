# Executive summary

The user appears to be a **builder/operator working primarily on web application and agent-oriented product work**, with repeated focus on **frontend implementation, debugging, structured prompt/spec design, and persona/configuration documents for AI agents**. The strongest durable context is not biography; it is workflow: the user repeatedly uses the assistant for **building UI-heavy apps, debugging code surgically, defining agent behavior files like SOUL.md / USER.md, and turning loosely defined goals into concrete structured artifacts**.

The user likely works in a **U.S. Pacific timezone context** and appears comfortable operating at a relatively high technical level, especially around modern React-based stacks and AI-product scaffolding. Their repeated concerns suggest they care most about **precision, speed, maintainability, functional completeness, and high-fidelity execution against constraints**.

---

# Explicit user facts

## 1) Name is Nicholas
- **Finding:** The name "Nicholas" appears explicitly.
- **Confidence:** High
- **Evidence:** The uploaded Rocket Money dashboard screenshot visibly includes the greeting "Hi. Nicholas".
- **Why it belongs in USER.md:** This is direct, user-relevant identity context that may help with personalization and addressing the user.

## 2) Likely preferred working timezone is Pacific Time
- **Finding:** The conversation/project context uses a `-0700` timezone.
- **Confidence:** Medium
- **Evidence:** Project conversation metadata states the default timezone is `-0700`.
- **Why it belongs in USER.md:** Timezone helps with scheduling assumptions, date references, and interpreting "today/this week/last month".

## 3) Professional/working domain includes web app development
- **Finding:** The user repeatedly works on web applications.
- **Confidence:** High
- **Evidence:** Repeated requests involve creating one-page web apps, updating layouts, fixing React code, troubleshooting implementation issues, and specifying frontend stacks.
- **Why it belongs in USER.md:** This is durable context about the kinds of tasks the assistant should expect.

## 4) The user works with AI-agent configuration and persona documents
- **Finding:** The user repeatedly asks for extraction work to build `SOUL.md` and `USER.md` for an OpenClaw agent.
- **Confidence:** High
- **Evidence:** Multiple repeated requests in project history ask to search prior chats and extract evidence for `SOUL.md`; current request asks for `USER.md`.
- **Why it belongs in USER.md:** This is a recurring project domain and helps the assistant anticipate future support needs.

## 5) The user works with a modern React-centered frontend stack
- **Finding:** The user explicitly specifies a preferred implementation stack.
- **Confidence:** High
- **Evidence:** Repeated requirements: ReactJS, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, Lucide React, Vercel AI SDK, and context for global state management.
- **Why it belongs in USER.md:** This is stable tool and platform context useful for future implementation help.

---

# Stable inferred user context

## 6) Likely a technical product builder rather than a casual end user
- **Finding:** The user appears to operate as someone designing, building, and refining software systems.
- **Confidence:** High
- **Evidence:** Requests include app implementation, debugging workflows, stack constraints, agent profile docs, and UI/product reconstruction from screenshots and data files.
- **Why it belongs in USER.md:** This shapes the level of abstraction and technical specificity the assistant should assume.

## 7) Likely works across both product definition and implementation
- **Finding:** The user moves between product framing and code-level execution.
- **Confidence:** High
- **Evidence:** Requests range from target audience discovery and app concept work to pixel-perfect layout updates, code debugging, and persona-document generation.
- **Why it belongs in USER.md:** The assistant should be ready to support both strategic framing and implementation detail.

## 8) Likely values financial planning / budgeting products as a recurring topic
- **Finding:** Finance tooling appears in at least one substantial build request.
- **Confidence:** Medium
- **Evidence:** The user requested a one-page app called Financior using uploaded banking/budget CSVs and a Rocket Money-style dashboard screenshot.
- **Why it belongs in USER.md:** This may be a recurring product area or at least an active project thread.

## 9) Likely works in a desktop/web development environment with access to code canvases and uploaded files
- **Finding:** The user repeatedly works through file uploads, code canvases, screenshots, and generated artifacts.
- **Confidence:** High
- **Evidence:** Uploaded CSVs, HTML, screenshot assets, and repeated requests to create docs or apps in canvas.
- **Why it belongs in USER.md:** This is stable environment context that affects how the assistant should deliver work.

---

# Recurring projects and interests

## 10) OpenClaw agent profile files (`SOUL.md`, `USER.md`)
- **Finding:** The user is actively building agent guidance/profile documents.
- **Confidence:** High
- **Evidence:** Repeated chat requests specifically about extracting prior-chat evidence to build `SOUL.md`, and now `USER.md`.
- **Why it belongs in USER.md:** This is a current recurring project and likely part of a larger agent system setup.

## 11) React/TypeScript UI implementation and debugging
- **Finding:** Frontend app implementation is a recurring activity.
- **Confidence:** High
- **Evidence:** Conversation titles and requests include demo app creation, pixel-perfect layout updates, countdown timer solution, chatbot tool-call, and React-based prediction app work.
- **Why it belongs in USER.md:** This is one of the main things the user returns to.

## 12) Structured extraction and profile inference from prior chats
- **Finding:** The user is interested in mining chat history for durable assistant context.
- **Confidence:** High
- **Evidence:** Multiple repeated prompts ask to search previous chats and infer assistant persona and user profile artifacts.
- **Why it belongs in USER.md:** This reflects an ongoing interest in improving continuity and personalization.

## 13) Finance/budgeting UI and planning workflows
- **Finding:** Finance dashboarding and budgeting is at least one concrete application domain.
- **Confidence:** Medium
- **Evidence:** The Financior project uses statement CSVs and annual budget cashflow data to create a budgeting app.
- **Why it belongs in USER.md:** Useful as project context, but should be treated as medium-confidence unless it repeats more.

---

# Recurring constraints

## 14) Strong stack constraints
- **Finding:** The user often wants work done inside a specific approved stack.
- **Confidence:** High
- **Evidence:** Repeatedly instructs use of ReactJS, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, Lucide React, Vercel AI SDK, and context.
- **Why it belongs in USER.md:** This is a stable implementation constraint, not just a stylistic preference.

## 15) Constraint toward surgical modifications in troubleshooting
- **Finding:** When debugging, the user wants minimum-change fixes rather than broad rewrites.
- **Confidence:** High
- **Evidence:** Repeated instruction to make the minimum changes needed and avoid removing existing content, animations, styles, comments, or connections.
- **Why it belongs in USER.md:** This is part of how the user prefers collaborative support on their projects.

## 16) Constraint toward preserving existing UI/features
- **Finding:** The user is sensitive to regressions and removal of existing implementation details.
- **Confidence:** High
- **Evidence:** Explicit repeated prohibitions against removing front-end elements, comments, animations, and cross-component connections.
- **Why it belongs in USER.md:** This is important context for any editing task.

## 17) Constraint toward responsive, functional UI
- **Finding:** The user expects interactive components to be real and responsive.
- **Confidence:** High
- **Evidence:** Explicit requirement that sections be responsive and that buttons, toggles, and inputs be functional.
- **Why it belongs in USER.md:** This is a quality bar the assistant should remember.

## 18) No explicit evidence on budget limits, admin restrictions, or device limitations
- **Finding:** There is not enough evidence for stable personal/org constraints like budget caps, admin access limits, or hardware limits.
- **Confidence:** High
- **Evidence:** Prior chats in this project do not provide durable evidence for such constraints.
- **Why it belongs in USER.md:** Important to mark absent rather than inventing constraints.

---

# Working style and habits

## 19) Uses the assistant for both creation and repair
- **Finding:** The user uses the assistant to create net-new artifacts and to debug/refine existing ones.
- **Confidence:** High
- **Evidence:** Requests include creating apps/docs in canvas and fixing runtime/build issues after code execution.
- **Why it belongs in USER.md:** This is a durable usage pattern.

## 20) Prefers structured, reusable deliverables
- **Finding:** The user often asks for formatted docs and implementation-ready artifacts.
- **Confidence:** High
- **Evidence:** Requests repeatedly specify output structure, schema fields, headings, and final deliverable formats.
- **Why it belongs in USER.md:** This helps the assistant package outputs in a useful way.

## 21) Likely iterates through repeated refinement loops
- **Finding:** The user seems to work iteratively, reusing the same goal template across multiple chats and refining outputs.
- **Confidence:** Medium
- **Evidence:** Similar extraction requests recur across multiple conversation titles; code is run, errors are reported, then fixes are requested.
- **Why it belongs in USER.md:** This helps the assistant expect continuation and incremental improvement workflows.

## 22) Frequently uses screenshots and uploaded source files as grounding material
- **Finding:** The user commonly supplies concrete artifacts for the assistant to work from.
- **Confidence:** High
- **Evidence:** Uploaded CSVs, HTML, screenshots, and direct visual references in the Financior request.
- **Why it belongs in USER.md:** This is useful context for how to support them effectively.

## 23) Cares most about precision, maintainability, and fidelity to constraints
- **Finding:** The user’s highest-priority output qualities appear to be correctness, maintainability, responsiveness, and spec fidelity.
- **Confidence:** High
- **Evidence:** Repeated emphasis on exact stack usage, minimal changes, comments, debug support, responsive design, and working interactivity.
- **Why it belongs in USER.md:** These are durable criteria for successful assistance.

---

# Suggested USER.md fields

- Name: Nicholas
- What to call them: Nicholas (explicit name seen; no alternate preference explicitly stated)
- Pronouns: Not explicitly stated
- Timezone: Likely Pacific (`-0700` project context)
- Professional domains: Web app development, frontend engineering, AI-agent/product configuration
- Recurring projects: OpenClaw agent docs, React/TypeScript app builds, UI debugging, persona/profile extraction workflows
- Recurring tools/platforms: ReactJS, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, Lucide React, Vercel AI SDK, canvas-based artifact workflows
- Recurring goals: Build working responsive apps, debug surgically, create structured guidance/profile docs for agents
- Recurring frustrations: Unnecessary changes, regression risk, unsupported invention, non-functional UI, vague fixes
- Decision criteria: Precision, speed, maintainability, responsiveness, functional completeness, stack fidelity

---

# USER.md candidate

## Name
Nicholas

## What to call them
Nicholas

## Pronouns
Not explicitly stated

## Timezone
Likely Pacific (`-0700` project context)

## Notes
- Technical user working on modern web apps and AI-agent configuration.
- Commonly uses the assistant for implementation, debugging, and structured document generation.
- Often supplies screenshots, CSVs, HTML, and prior-chat context as source material.
- Prefers outputs that are precise, implementation-ready, and aligned to stated constraints.

## Context
- Recurring stack: ReactJS, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, Lucide React, Vercel AI SDK, context-based state management.
- Recurring project themes: OpenClaw profile docs (`SOUL.md`, `USER.md`), one-page web apps, UI refinement, debugging, and app planning.
- Likely working style: iterative build/test/fix loop with strong emphasis on maintainability, responsiveness, and preserving existing work during troubleshooting.
- No explicit stable evidence yet for pronouns, budget limits, device constraints, or org/admin-access restrictions.

