# USER.md Research Extract (Evidence-Limited)

> **Scope note:** The accessible “previous chats” content here is heavily truncated and mostly repeats your SOUL.md extraction prompt. I only include items supported by that visible content and the current conversation. Where something is inferred (e.g., timezone), I label it clearly.

---

## 1) Executive summary
- You use the assistant primarily for **practical, structured work**: extracting patterns from prior chats to build agent docs (SOUL.md / USER.md), and **researching/design-scoping** tasks (e.g., architecture competitions with specific date/eligibility constraints).
- Your domain signals suggest **architecture/design** interests and **agent-building / workflow specification** work.
- **Direct personal identifiers** (name, pronouns) are not explicitly stated in the visible chat history.

---

## 2) Explicit user facts

### 2.1 Name
- **Finding:** Your name is **not explicitly stated** in the accessible chat excerpts.
- **Confidence:** High
- **Evidence:** No occurrences of a self-declared name appear in the visible prior-chat snippets.
- **Why it belongs in USER.md:** Prevents the agent from inventing a name.

### 2.2 What to call you
- **Finding:** Preferred form of address is **not explicitly stated**.
- **Confidence:** High
- **Evidence:** No explicit instruction like “call me X” appears in the visible excerpts.
- **Why it belongs in USER.md:** Avoids incorrect salutations.

### 2.3 Pronouns
- **Finding:** Pronouns are **not explicitly stated**.
- **Confidence:** High
- **Evidence:** No pronoun preference appears in the visible excerpts.
- **Why it belongs in USER.md:** Avoids assuming identity attributes.

---

## 3) Stable inferred user context

### 3.1 Likely working timezone
- **Finding:** Likely working timezone: **America/Los_Angeles**.
- **Confidence:** Medium
- **Evidence:** Workspace/system context indicates a user timezone of America/Los_Angeles (not a user-typed statement).
- **Why it belongs in USER.md:** Helpful for interpreting “today/tomorrow,” deadlines, and scheduling-related requests.

### 3.2 Professional / interest domain
- **Finding:** You have recurring interest in **architecture / design**.
- **Confidence:** Medium
- **Evidence:** You requested project-based **architecture competitions** with eligibility and schedule constraints, and rejected initial options asking for deeper search.
- **Why it belongs in USER.md:** Guides the assistant’s default framing, sources, and vocabulary when researching opportunities.

### 3.3 Agent-building / operational documentation
- **Finding:** You work on **OpenClaw agent docs** (SOUL.md/USER.md) and care about extracting durable patterns.
- **Confidence:** High
- **Evidence:** Multiple prior-chat entries (titles + repeated prompts) request extracting preferences to build SOUL.md for an OpenClaw agent, and you now request USER.md.
- **Why it belongs in USER.md:** Core context for what you’re building and why these documents matter.

---

## 4) Recurring projects and interests

### 4.1 OpenClaw agent configuration docs
- **Finding:** Recurring project: building **SOUL.md** and **USER.md** as operating/profile documents for an OpenClaw agent.
- **Confidence:** High
- **Evidence:** Repeated prompt in multiple prior-chat entries; current request explicitly asks for USER.md.
- **Why it belongs in USER.md:** Helps the assistant maintain continuity and reuse the same extraction rigor.

### 4.2 Architecture competitions (project-based / unbuilt design)
- **Finding:** Recurring interest: finding **open** competitions that are **not student-only**, **project-based/unbuilt**, with **tight date windows** for deadlines and results.
- **Confidence:** Medium
- **Evidence:** You specified criteria (not student, open, submission Feb–June/July, results by Jul/Aug) and asked for deeper search for design-only submissions.
- **Why it belongs in USER.md:** Enables the assistant to default to filtering for open/unbuilt concept competitions and focusing on schedule fit.

---

## 5) Recurring constraints

### 5.1 Eligibility constraint
- **Finding:** Competition must **not** be student-only.
- **Confidence:** High
- **Evidence:** You explicitly stated: “must not be a student competition.”
- **Why it belongs in USER.md:** A reusable filter for future searches.

### 5.2 Schedule constraint
- **Finding:** You often need **deadline windows** and **results windows**.
- **Confidence:** Medium
- **Evidence:** You specified submission deadlines Feb–June/July and results by late July/August.
- **Why it belongs in USER.md:** The agent should treat dates as first-class constraints and verify them.

### 5.3 Format constraint
- **Finding:** Prefer **design submission** (ideas/project-based), not “submit your built work.”
- **Confidence:** High
- **Evidence:** “They dont have to be real project site… design and not u submit ur built.”
- **Why it belongs in USER.md:** Directs competition/award selection.

---

## 6) Working style and habits

### 6.1 Iterative refinement when outputs don’t fit
- **Finding:** You will reject a set that technically matches criteria but doesn’t match taste/fit, and you want the assistant to **search deeper** rather than stop.
- **Confidence:** Medium
- **Evidence:** “Whatever you found so far is good, but I don’t like anything… do a deeper search.”
- **Why it belongs in USER.md:** The agent should interpret rejection as a request to broaden/shift the search space.

### 6.2 Preference for structured, operational docs
- **Finding:** You prefer **formatted** docs with explicit sections and schemas.
- **Confidence:** High
- **Evidence:** You repeatedly specify structured output formats and schemas in your SOUL.md and USER.md requests.
- **Why it belongs in USER.md:** Helps the assistant deliver work products in your preferred structure.

---

## 7) Suggested USER.md fields
- **Identity**
  - Name: (unknown; do not assume)
  - What to call you: (unknown; default to neutral address)
  - Pronouns: (unknown; use name/neutral they)
  - Timezone: America/Los_Angeles (inferred)

- **Primary domains**
  - Architecture/design opportunity research (competitions)
  - Agent-building documentation (OpenClaw: SOUL.md/USER.md)

- **Common task types**
  - Constrained web research (eligibility + schedule windows)
  - Document drafting in strict templates
  - Iterative refinement / deeper search when first pass isn’t good enough

- **Reusable constraints**
  - Prefer project-based/unbuilt design submissions
  - Avoid student-only competitions
  - Respect deadline/result windows; verify dates

---

# Draft USER.md candidate (concise)

## Name
- Unknown (not stated explicitly in accessible chats)

## What to call them
- Default: neutral (no stated preference)

## Pronouns
- Unknown (not stated). Use neutral language.

## Timezone
- America/Los_Angeles (inferred from workspace context; treat as tentative)

## Notes
- Uses the assistant to build OpenClaw agent docs (SOUL.md/USER.md) using evidence-based extraction.
- Prefers structured, template-driven outputs.

## Context
- Interested in architecture/design opportunities, especially project-based/unbuilt competitions.
- Common filters: not student-only; must be open; constrained submission/result date windows; design submission (not built-project awards).

