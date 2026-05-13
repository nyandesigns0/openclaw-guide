# 1) Executive summary
This USER.md profile is derived only from the project’s accessible prior conversation excerpts. The durable, assistance-relevant context is that you are building and iterating on **SemiChan**, a **Next.js** full-stack application for **architectural jury comment analysis** that produces **concept themes** and an **interactive juror–concept graph**. You repeatedly work on **NLP pipeline design**, **determinism/explainability**, and **product-quality diagnostics** (e.g., mega-concepts, micro-concepts, label bleed, unstable concept counts). You use the assistant primarily as a **technical + product consultant** for architecture/NLP systems.

---

# 2) Explicit user facts

- **Finding:** Name is not explicitly stated in the accessible excerpts.
- **Confidence:** High
- **Evidence:** No message includes an explicit name.
- **Why it belongs in USER.md:** Prevents the agent from inventing or guessing.

- **Finding:** Preferred form of address (“what to call you”) is not explicitly stated.
- **Confidence:** High
- **Evidence:** No explicit instruction like “call me X.”
- **Why it belongs in USER.md:** Avoids incorrect personalization.

- **Finding:** Pronouns are not explicitly stated.
- **Confidence:** High
- **Evidence:** No pronoun preference given.
- **Why it belongs in USER.md:** Avoids assumptions.

- **Finding:** Working timezone appears to be **America/Los_Angeles**.
- **Confidence:** Medium
- **Evidence:** Project/system context indicates timezone = America/Los_Angeles.
- **Why it belongs in USER.md:** Helps with date/time references and scheduling assumptions.

---

# 3) Stable inferred user context

- **Finding:** You operate in the **architecture / design competitions** domain and translate jury critique into actionable design priorities.
- **Confidence:** High
- **Evidence:** Repeated descriptions of “architectural jury feedback,” “competitions,” “design priorities,” “juror values.”
- **Why it belongs in USER.md:** Guides domain-aware explanations and examples.

- **Finding:** You are doing both **product thinking** and **implementation** (hands-on engineering).
- **Confidence:** High
- **Evidence:** You describe concrete file changes, module refactors, API route updates, UI updates, and documentation updates.
- **Why it belongs in USER.md:** Assistant should provide implementation-level guidance (not just strategy).

- **Finding:** You care about **determinism and explainability** as core product properties.
- **Confidence:** High
- **Evidence:** “Deterministic processing,” “reproducible results,” “backed by underlying sentences (explainability).”
- **Why it belongs in USER.md:** Informs recommendation style and evaluation criteria.

---

# 4) Recurring projects and interests

- **Finding:** Primary recurring project: **SemiChan** (Next.js full-stack app).
- **Confidence:** High
- **Evidence:** Multiple detailed pipeline and architecture descriptions; iterative improvements.
- **Why it belongs in USER.md:** Central context for most assistance.

- **Finding:** Core feature set: hybrid-style NLP pipeline (now refactored to semantic clustering + BM25 labeling/evidence), interactive **3D concept graph** visualization.
- **Confidence:** High
- **Evidence:** Described pipeline steps; UI described as React Three Fiber / Three.js graph; refactor notes.
- **Why it belongs in USER.md:** Assistant should understand constraints and artifacts produced.

- **Finding:** Recurring analytic concerns: **Auto-K selection**, **hierarchical granularity/cut policies**, **soft membership**, **labeling distinctiveness**, **graph weighting**.
- **Confidence:** High
- **Evidence:** You request diagnosis and improvement plan for these specific components.
- **Why it belongs in USER.md:** Helps assistant focus on the right levers and terminology.

- **Finding:** You sometimes work on agent-persona documentation (SOUL.md / USER.md) for an **AAS** agent.
- **Confidence:** Medium
- **Evidence:** Repeated requests to extract preferences/context for SOUL.md, now USER.md.
- **Why it belongs in USER.md:** Indicates meta-work on tooling/agents in addition to SemiChan.

---

# 5) Recurring constraints

- **Finding:** Preference/constraint for **server-side compute** for heavy analysis in Next.js API routes.
- **Confidence:** High
- **Evidence:** “Server-side processing for heavy compute,” API routes for analysis/segment/export.
- **Why it belongs in USER.md:** Shapes feasible implementations.

- **Finding:** Constraint for **deterministic outputs** (seeded algorithms; reproducible runs).
- **Confidence:** High
- **Evidence:** “Deterministic processing (seeded algorithms).”
- **Why it belongs in USER.md:** Determines acceptable algorithm choices.

- **Finding:** Explainability constraint: every theme/link must be backed by sentences.
- **Confidence:** High
- **Evidence:** “every theme/link can be backed by the underlying sentences.”
- **Why it belongs in USER.md:** Requires evidence-trace features.

- **Finding:** No explicit budget/device/org/admin constraints are stated in accessible excerpts.
- **Confidence:** High
- **Evidence:** Not mentioned.
- **Why it belongs in USER.md:** Avoids inventing constraints.

---

# 6) Working style and habits

- **Finding:** You iterate via **systematic refactors** with explicit phases, file-level changes, and test considerations.
- **Confidence:** High
- **Evidence:** You described an 8-phase refactor plan with exact file edits and testing checklist.
- **Why it belongs in USER.md:** Assistant should respond with stepwise plans that map to code structure.

- **Finding:** You use the assistant for: architecture docs synthesis, failure-mode diagnosis, algorithm selection, and validation planning.
- **Confidence:** High
- **Evidence:** You request mental models, diagnoses, mitigation/refactor split, prioritized plan, metrics/tests.
- **Why it belongs in USER.md:** Guides the assistant toward the right deliverable types.

- **Finding:** You value “on-the-right-track” confirmations and then next actions.
- **Confidence:** Medium
- **Evidence:** You explicitly requested short confirmation + next steps.
- **Why it belongs in USER.md:** Helps assistant structure collaboration cadence.

---

# 7) Suggested USER.md fields

- **Finding:** Domain keywords to anchor responses: architecture critique, jury feedback, concept discovery, clustering, labeling, graphs, determinism, explainability.
- **Confidence:** High
- **Evidence:** Repeated usage throughout.
- **Why it belongs in USER.md:** Improves relevance and reduces re-explaining context.

- **Finding:** Tech stack keywords: Next.js, React, React Three Fiber / Three.js, server API routes, TypeScript.
- **Confidence:** High
- **Evidence:** Explicitly named in pipeline/implementation description.
- **Why it belongs in USER.md:** Helps assistant tailor code and architecture suggestions.

---

# USER.md Candidate (concise)

## Name
- Not explicitly provided.

## What to call them
- Not explicitly provided.

## Pronouns
- Not explicitly provided.

## Timezone
- America/Los_Angeles (inferred from project context; confirm if needed).

## Notes
- Building **SemiChan**: a Next.js app that analyzes architectural jury feedback to extract concept themes and render an interactive juror–concept graph.
- Priorities: **determinism** (seeded/reproducible), **explainability** (every concept/link backed by sentences), and high-quality concept discovery.

## Context
- Typical tasks: pipeline design review, failure-mode diagnosis (mega/micro concepts, label bleed, unstable K), algorithm/parameter recommendations, acceptance criteria + lightweight validation tests.
- Stack: Next.js API routes for compute; React UI with 3D graph (React Three Fiber/Three.js); NLP pipeline with semantic embeddings and BM25/n-gram analysis (now separated: semantic clustering + BM25 contrastive labeling/evidence ranking).

