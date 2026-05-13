# USER.md Evidence Synthesis for AAS Agent

## 1. Executive summary
The available evidence points to a user who works primarily on **technical product and engineering implementation**, especially around **AI-assisted tooling, chat workflows, React/TypeScript applications, backend integrations, and agent/tool-calling systems**. The user repeatedly uses the assistant to help design and implement **practical systems**, especially UI-to-backend flows with real execution paths.

The most useful stable context for assistance is:
- the user appears to work in a **software/product/AI engineering** environment,
- they repeatedly work on **webapp architecture and implementation**,
- they use the assistant for **system design, implementation planning, backend flow design, UI interaction patterns, and agent/tooling architecture**,
- they care strongly about **precision, completeness, context-awareness, maintainability, and minimal unnecessary changes**,
- they likely operate in a **U.S. Pacific timezone context**.

A major caveat: the evidence available here is mostly from project chats and instructions, so this USER.md should stay focused on work context and assistance-relevant preferences rather than identity details.

---

## 2. Explicit user facts

- Finding: Likely working timezone is U.S. Pacific / America/Los_Angeles.
- Confidence: Medium
- Evidence: The project environment and conversation context repeatedly operate with `America/Los_Angeles`, and no contradictory timezone was provided by the user.
- Why it belongs in USER.md: Timezone helps with scheduling assumptions, recency framing, and temporal references.

- Finding: The user works on technical systems involving React, TypeScript, Tailwind, Radix UI, shadcn/ui, Lucide React, and Vercel AI SDK.
- Confidence: High
- Evidence: The standing project instructions explicitly require “ReactJS, TypeScript, Tailwind CSS, Radix UI and Shadcn/ui… Use Lucide React… Use Vercel AI SDK for AI related backends and middlewares.”
- Why it belongs in USER.md: These are stable tools and framework choices that materially improve future assistance.

- Finding: The user values context-aware AI systems that can infer project and workflow context from existing information.
- Confidence: High
- Evidence: “the model must be able to predict which project they must be or who to email based on the existing project infomation.”
- Why it belongs in USER.md: This reflects the kinds of systems the user builds and cares about.

- Finding: The user uses the assistant for implementation-heavy product and engineering work.
- Confidence: High
- Evidence: Repeated asks for backend implementation, prompt-engineering files, high-level architecture, review-card workflows, and full system updates.
- Why it belongs in USER.md: This is core task-context for future collaboration.

---

## 3. Stable inferred user context

- Finding: The user is likely a builder/operator working across frontend, backend, and AI workflow design rather than staying in a single narrow specialty.
- Confidence: High
- Evidence: The user repeatedly requested right-side chatbot UI, horizontal review cards, backend tool execution, prompt engineering, and context resolution in one end-to-end flow.
- Why it belongs in USER.md: It helps the assistant respond across layers without artificially narrowing scope.

- Finding: The user likely works on internal tools, workflow automation, or product features where AI actions must connect to real systems.
- Confidence: High
- Evidence: Repeated focus on tool-calling, contact creation, task updates, file saving, email forwarding, approval flows, and reviewable execution.
- Why it belongs in USER.md: This is durable work context that shapes useful suggestions.

- Finding: The user likely works in a codebase where preserving existing UX/UI and minimizing disruption matters.
- Confidence: High
- Evidence: Standing project instructions emphasize surgical fixes and explicitly preserving “existing content, animations, style, front-end UI elements, comments in code or connections across components.”
- Why it belongs in USER.md: This reflects the operating environment the assistant should assume.

- Finding: The user likely has authority to shape product architecture, implementation plans, and interaction design.
- Confidence: Medium
- Evidence: The user repeatedly directs system-level architecture choices, asks for full implementation plans, and requests whole-system behavior updates rather than isolated tickets.
- Why it belongs in USER.md: This affects the level of strategic detail the assistant should offer.

- Finding: The user likely benefits from the assistant inferring and carrying forward project continuity across conversations.
- Confidence: High
- Evidence: The user explicitly asked to use “existing project infomation” and asked for profile documents like SOUL.md and USER.md for an agent.
- Why it belongs in USER.md: Persistent context appears directly useful to their workflow.

---

## 4. Recurring projects and interests

- Finding: AI agent/tool-calling systems.
- Confidence: High
- Evidence: Repeated requests around “advanced AI tool calling,” analysis-to-approve flows, real tool execution, and prompt-engineering files.
- Why it belongs in USER.md: This is a recurring topic and likely a major project area.

- Finding: Chatbot and side-panel workflow UX.
- Confidence: High
- Evidence: “I want it in the chat bot in the right side now,” plus repeated design around review cards, approve/edit controls, and actionable outputs.
- Why it belongs in USER.md: This is recurring product/UI context.

- Finding: Context-aware automation tied to existing project data.
- Confidence: High
- Evidence: Explicit request for project and recipient prediction from existing project information.
- Why it belongs in USER.md: This appears to be an active requirement, not a one-off curiosity.

- Finding: Prompt engineering and orchestration logic for tool APIs.
- Confidence: High
- Evidence: “Show me an extentive toolcall api prompt engineering file code. in full.”
- Why it belongs in USER.md: This is a recurring technical interest and likely task type.

- Finding: Structured troubleshooting and implementation workflows.
- Confidence: High
- Evidence: Standing instructions require finding the problem first, evaluating alternatives, selecting the best solution, then implementing.
- Why it belongs in USER.md: This reflects a recurring way the user works with the assistant.

---

## 5. Recurring constraints

- Finding: Prefers minimal-diff changes in existing systems.
- Confidence: High
- Evidence: “only analyze and do minimum changes to fix the problem. BE SURGICAL.”
- Why it belongs in USER.md: This is a stable working constraint in code tasks.

- Finding: Existing UI, comments, styling, animations, and component connections should usually be preserved.
- Confidence: High
- Evidence: “DO NOT MAKE ANY OTHER CHANGES; removing any existing content, animations, style, front-end UI elements, comments in code or connections across components.”
- Why it belongs in USER.md: This is a practical constraint that affects implementation proposals.

- Finding: The preferred stack is constrained to ReactJS, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, Lucide React, react-icons when needed, Vercel AI SDK, and context for global state.
- Confidence: High
- Evidence: Explicit standing technology instructions.
- Why it belongs in USER.md: These are durable environment constraints.

- Finding: The user expects debugging surfaces and try/catch logging to be present.
- Confidence: High
- Evidence: “Always add debugging menus and messages through and try and catch blocks, displaying the error messages in the console.”
- Why it belongs in USER.md: This is an implementation constraint that improves future outputs.

- Finding: Shell-based file operations are preferred for codebase changes.
- Confidence: High
- Evidence: “Always use shell commands like ‘mkdir -p’ or ‘mv’ to move, copy, delete and edit files.”
- Why it belongs in USER.md: This is a stable workflow constraint for code assistance.

---

## 6. Working style and habits

- Finding: The user tends to iteratively deepen scope from concept to full execution.
- Confidence: High
- Evidence: The conversation repeatedly escalated from simple analysis, to architecture, to backend implementation, to prompt-engineering code, to context-awareness.
- Why it belongs in USER.md: This helps the assistant anticipate likely next asks.

- Finding: The user often works through layered deliverables: architecture, implementation plan, then code.
- Confidence: High
- Evidence: Explicit requests for “full documentation and action implientation plan,” “high level architecture,” then “backend impleimentattion,” then full prompt-engineering code.
- Why it belongs in USER.md: This is a repeatable collaboration pattern.

- Finding: The user prefers approval-gated execution rather than uncontrolled automation.
- Confidence: High
- Evidence: The requested workflow required analysis followed by approve/edit cards before actual toolcalls happen.
- Why it belongs in USER.md: This is a practical working pattern.

- Finding: The user is likely optimizing for speed to implementation without sacrificing correctness.
- Confidence: Medium
- Evidence: Their prompts are terse and outcome-driven, but they also insist on complete documentation, maintainability, and debugging support.
- Why it belongs in USER.md: This combination helps guide response pacing and detail.

---

## 7. Suggested USER.md fields

- Finding: Include primary work domain as software/product/AI systems.
- Confidence: High
- Evidence: Strong repeated evidence across implementation, architecture, tool-calling, and UI/backend system design.
- Why it belongs in USER.md: This is the clearest stable profile context.

- Finding: Include preferred stack and framework defaults.
- Confidence: High
- Evidence: Explicit standing stack instructions.
- Why it belongs in USER.md: Saves repeated setup and improves relevance.

- Finding: Include recurring project themes: AI tooling, chatbot UX, context-aware execution, and tool orchestration.
- Confidence: High
- Evidence: Repeated direct requests across chats.
- Why it belongs in USER.md: These are the main areas of repeat work.

- Finding: Include operational constraints: preserve existing UI, make surgical changes, maintain debug visibility.
- Confidence: High
- Evidence: Explicit standing instructions.
- Why it belongs in USER.md: These are stable environmental/workflow facts.

---

# Concise USER.md candidate

## Name
- Not explicitly stated.

## What to call them
- Not explicitly stated.

## Pronouns
- Not explicitly stated.

## Timezone
- Likely America/Los_Angeles / U.S. Pacific. Assumption based on project context; verify if needed.

## Notes
- Works primarily on software/product/AI implementation.
- Frequently builds or designs AI-assisted workflows, tool-calling systems, chatbot UX, and context-aware automation.
- Uses the assistant for end-to-end technical help: architecture, implementation planning, backend logic, UI flows, and prompt/tool orchestration.
- Values precision, completeness, maintainability, observability, and context continuity.

## Context
- Preferred stack: ReactJS, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, Lucide React, react-icons as needed, Vercel AI SDK, Context API for global state.
- Common workflow: start with architecture/problem analysis, compare options, choose a solution, then implement.
- Typical constraints: preserve existing UI and wiring, make surgical changes, include comments, add debug surfaces, wrap logic in try/catch, and favor shell-command-based file operations.
- Recurring project themes: advanced AI tool-calling, right-side chatbot workflows, approval-gated execution, project-context inference, and backend-integrated automation.
- Likely benefits from assistants that retain project continuity and infer missing operational context from available information without over-assuming.

