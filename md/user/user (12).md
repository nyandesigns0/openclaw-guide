# Executive summary

The user appears to be a technically sophisticated builder working primarily on web application design and implementation, with a strong emphasis on product fidelity, front-end completeness, and precise execution. Their repeated work centers on React/TypeScript web apps, UI reconstruction, dashboard/product experiences, and agent configuration documents such as SOUL.md and USER.md. The most useful durable context for assistance is that they operate like a product-minded developer/designer who repeatedly uses the assistant for implementation planning, debugging, UI recreation, structured extraction tasks, and behavior/spec writing for agents.

The user seems to work in a Pacific time context and has repeatedly referenced Pomona / Los Angeles time in product personalization requests, but this is still somewhat inferential unless treated as likely working timezone rather than confirmed personal timezone.

---

# Explicit user facts

- Finding: The user wants artifacts created in canvas/doc form when requested.
- Confidence: High
- Evidence: “Create doc using canvas.” and “In a canvas doc, create a new formatted doc…”
- Why it belongs in USER.md: This is a stable preference about how they want certain deliverables produced.

- Finding: The user works extensively with React, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, and Lucide React.
- Confidence: High
- Evidence: Repeated technology instructions explicitly require “ReactJS, TypeScript, Tailwind CSS, Radix UI, Shadcn/ui components, and Lucide React icons.”
- Why it belongs in USER.md: This is recurring project/tool context that helps the assistant propose relevant solutions without re-asking.

- Finding: The user expects Vercel AI SDK for AI-related backends and middlewares.
- Confidence: High
- Evidence: “Use the Vercel AI SDK for AI-related backends and middlewares.”
- Why it belongs in USER.md: This is a stable stack/tool preference that affects implementation choices.

- Finding: The user prefers context for global state management.
- Confidence: High
- Evidence: “Use context for global state management.”
- Why it belongs in USER.md: This is a recurring architectural preference tied to how they build apps.

- Finding: The user prefers shell-command-based file operations.
- Confidence: High
- Evidence: “Always use shell commands like ‘mkdir -p’ or ‘mv’ to move, copy, delete, and edit files.”
- Why it belongs in USER.md: This is stable workflow context that helps the assistant align with their environment and habits.

---

# Stable inferred user context

- Finding: The user is likely a professional or highly capable builder working in web product development.
- Confidence: High
- Evidence: Repeated requests for full demo apps, complete one-page recreations, debugging, component-level control, product fidelity, and stack-specific implementation constraints.
- Why it belongs in USER.md: This helps the assistant calibrate technical depth, assumptions, and the level of abstraction to use.

- Finding: The user likely works in a Pacific-time context.
- Confidence: Medium
- Evidence: Repeated personalization references to “Pomona, CA” and “LA time” in UI/product work. No explicit direct statement of timezone from the user.
- Why it belongs in USER.md: This is useful operational context, but should be marked as likely rather than confirmed.

- Finding: The user operates in an environment where preserving existing UI and structure matters.
- Confidence: High
- Evidence: Repeated instructions not to remove content, animations, style, comments, or component connections during fixes.
- Why it belongs in USER.md: This reflects project reality and editing constraints, not just assistant style.

- Finding: The user likely works with reference-driven product recreation and parity tasks.
- Confidence: High
- Evidence: Multiple requests to recreate or match attached websites and dashboards “at the same level of completeness.”
- Why it belongs in USER.md: This is recurring project context that helps the assistant understand the nature of their work.

---

# Recurring projects and interests

- Finding: The user repeatedly works on finance/budgeting app experiences.
- Confidence: High
- Evidence: “Financior” was defined as “a finance budgeting app that manages my finances, and help me plan my future,” with repeated dashboard recreation and budget/cashflow planning requests.
- Why it belongs in USER.md: This is durable product context, not a one-off topic.

- Finding: The user is building or configuring agent identity/docs such as SOUL.md and USER.md for an AAS agent.
- Confidence: High
- Evidence: Multiple extraction tasks: “Search through my previous chats and extract only information relevant to building SOUL.md…” and now the same for USER.md.
- Why it belongs in USER.md: This is an active recurring project area where continuity helps.

- Finding: The user often returns to UI reconstruction, dashboard completeness, and fidelity against references.
- Confidence: High
- Evidence: Multiple iterations around Rocket Money-like reconstruction and feedback about completeness.
- Why it belongs in USER.md: It is a recurring class of work the assistant should anticipate.

- Finding: The user frequently uses the assistant for debugging, implementation planning, and full-stack UI prototyping.
- Confidence: High
- Evidence: Requests include “Create me a full demo app,” debugging syntax/runtime issues, structured troubleshooting workflows, and rebuilding full websites in one doc.
- Why it belongs in USER.md: This describes the primary task modes the assistant is used for.

---

# Recurring constraints

- Finding: The user wants minimal-change bugfixes rather than exploratory rewrites.
- Confidence: High
- Evidence: “only analyze and make minimum changes to fix the problem. BE SURGICAL. DO NOT MAKE ANY OTHER CHANGES.”
- Why it belongs in USER.md: This is a stable project constraint that affects how assistance should be delivered.

- Finding: Existing UI/content/comments/connections should generally be preserved.
- Confidence: High
- Evidence: “do not remove any existing content, animations, style, front-end UI elements, comments in code, or connections across components.”
- Why it belongs in USER.md: This is an enduring collaboration constraint tied to their environment and workflow.

- Finding: Functional UI is required; dead mock controls are not acceptable.
- Confidence: High
- Evidence: “All the buttons, toggles, and other inputs must work/be functional.”
- Why it belongs in USER.md: This is a practical acceptance criterion for the work they request.

- Finding: The user prefers token-based styling rather than hardcoded visual values.
- Confidence: High
- Evidence: “Instead of hardcoding the colors in Tailwind, match the color variables…” and similar instruction for font styles and dimensions.
- Why it belongs in USER.md: This is a recurring design-system constraint.

---

# Working style and habits

- Finding: The user provides detailed specification blocks and expects the assistant to execute within them.
- Confidence: High
- Evidence: Repeated long instruction blocks covering technology, troubleshooting rules, solution steps, and output templates.
- Why it belongs in USER.md: This is a stable collaboration pattern that helps the assistant interpret future requests correctly.

- Finding: The user often works reference-first rather than blank-slate.
- Confidence: High
- Evidence: They repeatedly attach sample CSVs, HTML snapshots, screenshots, and ask for parity or extraction from previous chats.
- Why it belongs in USER.md: This helps the assistant know to anchor outputs to provided artifacts whenever possible.

- Finding: The user values structured analysis before implementation.
- Confidence: High
- Evidence: Repeated required workflow: list tasks, find the problem, plan, counter alternatives, select the best one, then implement.
- Why it belongs in USER.md: This is a stable working pattern relevant to collaboration.

- Finding: The user cares most about precision, completeness, fidelity, maintainability, and functional realism.
- Confidence: High
- Evidence: Repeated insistence on “same level of completeness,” “be surgical,” “all buttons/toggles must work,” preservation of structure, and implementation-ready outputs.
- Why it belongs in USER.md: These priorities explain what makes outputs useful to them.

- Finding: The user frequently uses the assistant for extracting structured knowledge from prior chats.
- Confidence: High
- Evidence: Multiple requests to search prior chats and extract durable behavioral/profile guidance for SOUL.md and USER.md.
- Why it belongs in USER.md: This is a repeated meta-task the assistant should remember.

---

# Suggested USER.md fields

- Finding: Include the user as a product-minded web app builder focused on high-fidelity UI and functional implementations.
- Confidence: High
- Evidence: Strong recurring pattern across web app, demo app, dashboard, and reconstruction tasks.
- Why it belongs in USER.md: Gives future assistants the right baseline model of the user.

- Finding: Include recurring stack: React, TypeScript, Tailwind, Radix, shadcn/ui, Lucide, Vercel AI SDK, context state.
- Confidence: High
- Evidence: Explicit repeated stack instructions.
- Why it belongs in USER.md: Useful stable tooling context.

- Finding: Include likely Pacific-time working context as tentative.
- Confidence: Medium
- Evidence: Pomona/LA-time references in repeated personalization.
- Why it belongs in USER.md: Helpful scheduling/context signal, but should be marked as likely.

- Finding: Include recurring tasks: UI recreation, debugging, full demo apps, agent-doc extraction, structured implementation plans.
- Confidence: High
- Evidence: Repeated project/task patterns.
- Why it belongs in USER.md: Helps assistants anticipate likely asks and useful context.

- Finding: Include recurring constraints around preservation, minimal-change fixes, and functional UI.
- Confidence: High
- Evidence: Repeated explicit instructions.
- Why it belongs in USER.md: These are user-environment and workflow realities, not just tone preferences.

---

# USER.md candidate

## Name
- Not explicitly stated.

## What to call them
- Not explicitly stated.

## Pronouns
- Not explicitly stated.

## Timezone
- Likely Pacific Time (Pomona / Los Angeles context), but not explicitly confirmed.

## Notes
- Product-minded web app builder with a strong focus on frontend fidelity, completeness, and functional realism.
- Frequently works on React + TypeScript + Tailwind + Radix + shadcn/ui + Lucide stacks.
- Prefers Vercel AI SDK for AI integrations and React context for global state.
- Often uses the assistant for UI recreation, debugging, implementation planning, and structured extraction tasks for agent docs.
- Typically works from references: screenshots, HTML captures, sample CSVs, and prior-chat evidence.

## Context
- Recurring project area: finance/budgeting app experiences (for example, Financior) and dashboard-heavy product UIs.
- Recurring meta-project area: defining assistant identity/config docs such as SOUL.md and USER.md for an AAS agent.
- Stable constraints: preserve existing UI/structure/comments when fixing issues, keep bugfixes minimal, and ensure controls are functional rather than decorative.
- Core output criteria: precision, completeness, maintainability, and strong alignment with the requested reference or spec.

