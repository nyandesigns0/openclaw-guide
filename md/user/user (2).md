# 1) Executive summary
- **Finding:** You use this assistant primarily as a **senior engineering + product-UX copilot** for building **high-fidelity interactive prototypes**, drafting **implementation prompts/specs**, and designing **agent docs** (SOUL.md/USER.md) for AAS.
  - **Confidence:** High
  - **Evidence:** You requested a “high-fidelity UI prototype” with detailed interaction requirements and later requested a “full prompt… Nextjs, tailwind and TS”; you also repeatedly request extraction for “SOUL.md for an AAS agent” and now “USER.md for an AAS agent.”
  - **Why it belongs in USER.md:** It tells the agent what kinds of tasks you routinely delegate and what context to assume.

- **Finding:** You operate in a workflow centered on **clear specifications**, **hard constraints**, and **iterative polish**.
  - **Confidence:** High
  - **Evidence:** You provide constraint-heavy specs (“CRITICAL”, “MUST”, “do NOT”) and iterate on concrete bugs (“zoom and timeline labels… not responsive… make it 1px per year”).
  - **Why it belongs in USER.md:** Helps the agent align to your working cadence (spec → build → targeted fixes).

---

# 2) Explicit user facts

- **Finding:** Your name is **not explicitly stated** in the available prior chat context.
  - **Confidence:** High
  - **Evidence:** No message contains a self-identified name.
  - **Why it belongs in USER.md:** Prevents the agent from inventing a name; encourages neutral address.

- **Finding:** What to call you is **not explicitly stated**.
  - **Confidence:** High
  - **Evidence:** No explicit instruction like “call me X.”
  - **Why it belongs in USER.md:** Avoids incorrect personalization.

- **Finding:** Pronouns are **not explicitly stated**.
  - **Confidence:** High
  - **Evidence:** No pronoun preference given.
  - **Why it belongs in USER.md:** Avoids assumptions; default to “you.”

---

# 3) Stable inferred user context

- **Finding:** Likely working timezone: **America/Los_Angeles (UTC−07/−08)**.
  - **Confidence:** Medium
  - **Evidence:** Project context includes “Default timezone is -0700” (not explicitly stated by you as a preference).
  - **Why it belongs in USER.md:** Helps with date/time phrasing for schedules and deadlines.
  - **Assumption note:** This is inferred from project/system context, not an explicit user statement.

- **Finding:** Professional domain: **frontend engineering + UX design**.
  - **Confidence:** High
  - **Evidence:** You directed: “You are a senior frontend engineer and UX designer…” and requested implementation details (scroll/zoom, ruler ticks, responsiveness, maintainable UI logic).
  - **Why it belongs in USER.md:** Guides default technical framing and vocabulary.

- **Finding:** You frequently work on **agent design / prompt engineering** (AAS) alongside UI prototyping.
  - **Confidence:** High
  - **Evidence:** Repeated requests to extract preferences for building SOUL.md/USER.md for an AAS agent.
  - **Why it belongs in USER.md:** The agent should expect meta-work: specs, prompts, and operating guidelines.

---

# 4) Recurring projects and interests

- **Finding:** Project/theme: **Investigative historical timeline tools** (esp. comparing competing models).
  - **Confidence:** High
  - **Evidence:** You specified an “investigative historical timeline web application” comparing “Egyptian baseline, Early Exodus model, Late Exodus model,” plus a “Biblical timeline overlay.”
  - **Why it belongs in USER.md:** The agent can reuse common UI patterns and terminology for future iterations.

- **Finding:** You repeatedly reference **AAS agent documentation** tasks (SOUL.md + USER.md).
  - **Confidence:** High
  - **Evidence:** Multiple prior chat titles/messages request SOUL.md extraction; current request targets USER.md.
  - **Why it belongs in USER.md:** Signals ongoing need for structured agent docs.

- **Finding:** You are involved in **design/architecture-related explorations** (likely creative/technical).
  - **Confidence:** Medium
  - **Evidence:** Prior chat titles include “Architecture Competitions 2026,” “Shadow Pattern Creation Techniques,” and “Woven Tunnels Homelessness Solution.”
  - **Why it belongs in USER.md:** Suggests broader project context where visual/structural reasoning is valuable.

---

# 5) Recurring software/tools/platforms you use

- **Finding:** You use modern web tooling: **Next.js, Tailwind CSS, TypeScript**.
  - **Confidence:** High
  - **Evidence:** You explicitly requested a “full prompt… Nextjs, tailwind and TS.”
  - **Why it belongs in USER.md:** The agent should default to these technologies when proposing implementations.

- **Finding:** You also use **vanilla JS prototypes** and **CDN-based libraries** for quick demos.
  - **Confidence:** High
  - **Evidence:** You required a “single self-contained HTML file… vanilla JavaScript… external libraries allowed ONLY via CDN.”
  - **Why it belongs in USER.md:** The agent can choose the right fidelity (prototype vs app) depending on request.

- **Finding:** You leverage **Canvas-style preview workflows** and expect runnable artifacts.
  - **Confidence:** Medium
  - **Evidence:** You required the HTML “must run inside ChatGPT Canvas preview.”
  - **Why it belongs in USER.md:** Guides deliverable packaging.

---

# 6) Recurring constraints

- **Finding:** You frequently impose **hard output-format constraints** (single file, specific stack, no build step, etc.).
  - **Confidence:** High
  - **Evidence:** “Output Format Rules (CRITICAL)… single self-contained HTML… include HTML+CSS+JS in one file.”
  - **Why it belongs in USER.md:** Helps the agent anticipate the need for exact packaging.

- **Finding:** You often enforce strict scope boundaries: **UI/interaction demo only; mock data; no real research/parsing**.
  - **Confidence:** High
  - **Evidence:** “This is strictly a visual and interaction demo — do NOT implement real transcript parsing… Use realistic mock data placeholders only.”
  - **Why it belongs in USER.md:** The agent should avoid over-scoping into prohibited implementation.

- **Finding:** Numeric/behavioral requirements can be precise (e.g., zoom min “1px/year”).
  - **Confidence:** High
  - **Evidence:** “The zoom min is 3.6px. Make it 1px per year to be min.”
  - **Why it belongs in USER.md:** Indicates you care about correctness at the UI mechanics level.

---

# 7) Working style and habits

- **Finding:** You work via **spec-first prompts** and then iterate with **targeted bug reports**.
  - **Confidence:** High
  - **Evidence:** Large initial spec followed by focused fix requests.
  - **Why it belongs in USER.md:** The agent should expect a tight feedback loop and support rapid iterations.

- **Finding:** You prefer deliverables that are **ready-to-run / copy-pasteable**.
  - **Confidence:** High
  - **Evidence:** “Must run inside Canvas preview” and request for “full prompt” for Next.js/Tailwind/TS.
  - **Why it belongs in USER.md:** The agent should bias toward complete artifacts rather than conceptual advice.

- **Finding:** You use the assistant for **prompt drafting** (meta-instructions) as much as for code.
  - **Confidence:** High
  - **Evidence:** You requested a “full prompt” for porting to Next.js.
  - **Why it belongs in USER.md:** The agent should offer structured prompt templates when useful.

---

# 8) Suggested USER.md fields

- **Finding:** Name field should remain blank/unknown unless you explicitly provide it.
  - **Confidence:** High
  - **Evidence:** No explicit name found.
  - **Why it belongs in USER.md:** Prevents incorrect personalization.

- **Finding:** Primary domains: “Frontend Engineering”, “UX/UI Prototyping”, “Agent spec/prompt engineering.”
  - **Confidence:** High
  - **Evidence:** Your repeated requests span these categories.
  - **Why it belongs in USER.md:** Helps the agent choose defaults and vocabulary.

- **Finding:** Preferred stacks: Next.js + Tailwind + TypeScript; and single-file HTML prototypes when requested.
  - **Confidence:** High
  - **Evidence:** Explicit requests for both.
  - **Why it belongs in USER.md:** Tooling defaults.

- **Finding:** Common deliverable types: runnable UI demos, structured prompts/specs, agent docs.
  - **Confidence:** High
  - **Evidence:** Timeline prototype + Next.js prompt + SOUL/USER extraction.
  - **Why it belongs in USER.md:** Sets expectations for output packaging.

---

# Final step — USER.md candidate (concise)

## Name
- Unknown (not provided)

## What to call them
- Default: “you” (no preferred form provided)

## Pronouns
- Unknown (not provided)

## Timezone
- Likely America/Los_Angeles (inferred from project context; confirm if needed)

## Notes
- Primary use: senior-level **frontend + UX prototyping** and **prompt/spec drafting**.
- Often requests **runnable artifacts** (Canvas-friendly single-file demos) and/or **Next.js + Tailwind + TS** implementations.
- Frequently working on **AAS agent documentation** (SOUL.md / USER.md) and structured agent prompts.

## Context
- Recurring project theme: **comparative investigative timelines** (multi-lane timelines, zoom/pan, ruler ticks, range selectors, tooltips, detail panels, connectors).
- Common constraints: **mock data only**, UI/interaction demo scope, strict output formatting, exact numeric behavior requirements (e.g., 1px/year min zoom).

