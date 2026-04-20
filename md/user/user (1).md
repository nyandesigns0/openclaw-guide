# USER.md RESEARCH NOTES FOR OPENCLAW AGENT

## 1. Executive summary

- **Finding:** The user works in architecture / planning / construction coordination and repeatedly uses the assistant as a drafting, formatting, project-coordination, and information-extraction copilot.
  - **Confidence:** HIGH
  - **Evidence:** Repeated requests to draft emails to owners, architects, engineers, MEP consultants, Title 24 consultants, and rendering staff; repeated requests to structure legal descriptions, project summaries, drawing agendas, and code / utility coordination items.
  - **Why it belongs in USER.md:** This is the core practical context that determines what kinds of outputs are useful.

- **Finding:** The user strongly prefers concise, directly usable outputs, especially polished email drafts, cleaned lists, extracted facts, and formatted project notes.
  - **Confidence:** HIGH
  - **Evidence:** Frequent requests such as “write me email,” “short reminder email,” “too long,” “just subject,” “organize and refine,” “extract information,” and “create me a list.”
  - **Why it belongs in USER.md:** It affects default response length, structure, and format.

- **Finding:** The user regularly works on residential design / permit / consultant coordination projects in Southern California, with heavy emphasis on utility, zoning, code, Title 24, MEP, and drawing-set coordination.
  - **Confidence:** HIGH
  - **Evidence:** Repeated work around Anaheim, Rancho Cucamonga, San Bernardino / Highland, ADUs, RH-1 zoning, Scenic Corridor Overlay, SB-9, utility bills, MEP questions, solar, structural concepts, and consultant requests.
  - **Why it belongs in USER.md:** Stable regional and domain context helps the assistant anticipate useful references and output types.

- **Finding:** The user values outputs that can be forwarded with minimal editing and that preserve project-management clarity.
  - **Confidence:** HIGH
  - **Evidence:** Repeated requests for owner emails, engineer follow-ups, team instructions, agenda/checklist formatting, and one-page project summaries.
  - **Why it belongs in USER.md:** The assistant should optimize for send-ready and task-ready deliverables.

---

## 2. Explicit user facts

- **Finding:** The user’s personal name is **not explicitly stated** in the available chats.
  - **Confidence:** HIGH
  - **Evidence:** The user repeatedly drafts communications as part of “Design Concepts” or to support named team members / consultants, but does not explicitly identify their own name.
  - **Why it belongs in USER.md:** USER.md should avoid inventing a name and should leave this blank.

- **Finding:** What to call the user is **not explicitly stated**.
  - **Confidence:** HIGH
  - **Evidence:** No direct instruction like “call me X.”
  - **Why it belongs in USER.md:** Important to leave unknown rather than guess.

- **Finding:** Pronouns are **not explicitly stated**.
  - **Confidence:** HIGH
  - **Evidence:** No direct statement of pronouns.
  - **Why it belongs in USER.md:** Should remain unspecified.

- **Finding:** Likely working timezone is **Pacific Time**.
  - **Confidence:** MEDIUM
  - **Evidence:** Nearly all project work centers on Southern California cities and agencies; the project default timezone is -0700; coordination appears tied to California business hours.
  - **Why it belongs in USER.md:** Useful for scheduling assumptions and business-hour coordination.

- **Finding:** The user is professionally involved in **architecture / planning / construction / permit coordination**.
  - **Confidence:** HIGH
  - **Evidence:** Repeated use of firm signature “Design Concepts Architecture - Engineering - Planning - Construction,” repeated drafting for architects, civil, structural, MEP, Title 24, rendering, and client coordination.
  - **Why it belongs in USER.md:** This is foundational professional context.

---

## 3. Stable inferred user context

- **Finding:** The user likely serves as a project coordinator, designer, or architect-side operations lead rather than a purely technical specialist in one subdiscipline.
  - **Confidence:** MEDIUM
  - **Evidence:** The user orchestrates communications among owners, structural, civil, MEP, Title 24, rendering staff, CAD staff, and city planners; asks for polished outward communications and consolidated task lists.
  - **Why it belongs in USER.md:** Helps the assistant prioritize coordination-ready outputs over narrow technical theory.

- **Finding:** The user works in a practice that manages multiple projects simultaneously and tracks them by project number.
  - **Confidence:** HIGH
  - **Evidence:** Repeated references to project numbers like 2025-63, 2025-55, etc., with requests to include them in subject lines, documents, and team instructions.
  - **Why it belongs in USER.md:** Helps the assistant preserve project identifiers and maintain project separation.

- **Finding:** The user frequently handles early design through permit / consultant coordination rather than only final construction documentation.
  - **Confidence:** HIGH
  - **Evidence:** Requests span concept renderings, site plans, progress sets, consultant scope, zoning extraction, utility verification, Title 24, MEP coordination, and drawing revisions.
  - **Why it belongs in USER.md:** Helps the assistant anticipate lifecycle stage and needed deliverables.

- **Finding:** The user likely operates in a small to mid-sized design office where the assistant is used as a force multiplier for communication and document cleanup.
  - **Confidence:** MEDIUM
  - **Evidence:** Frequent need for quick drafts, consultant follow-ups, extracted lists, team emails, project handoff notes, and formatted summaries.
  - **Why it belongs in USER.md:** Suggests emphasis on speed, administrative leverage, and reusable templates.

---

## 4. Recurring projects and interests

- **Finding:** The user repeatedly returns to residential and estate-scale projects involving custom homes, ADUs, site planning, and consultant coordination.
  - **Confidence:** HIGH
  - **Evidence:** Many requests concern single-family residences, detached garages, guest houses / ADUs, pools, RCPs, renderings, site plans, and utility upgrades.
  - **Why it belongs in USER.md:** Strong recurring project pattern.

- **Finding:** The user often works on Southern California jurisdictional research and permit-related extraction.
  - **Confidence:** HIGH
  - **Evidence:** Repeated Anaheim zoning, RH-1 / Scenic Corridor / SB-9 extraction, legal descriptions, APNs, jurisdiction summaries, utility plans, and code questions.
  - **Why it belongs in USER.md:** Helps the assistant preemptively structure code and permit outputs.

- **Finding:** The user frequently needs help with utility and MEP intake / coordination.
  - **Confidence:** HIGH
  - **Evidence:** Repeated work around electrical service, gas meters, water meters, water bills, Title 24, solar, MEP questions, HVAC specs, and consultant follow-ups.
  - **Why it belongs in USER.md:** The assistant should be ready to consolidate technical intake and open items.

- **Finding:** The user repeatedly uses the assistant for outbound communication with engineers, owners, consultants, and drafting/rendering staff.
  - **Confidence:** HIGH
  - **Evidence:** Many requests are email drafts to specific named recipients with project-specific action items.
  - **Why it belongs in USER.md:** A top recurring use case.

- **Finding:** The user also cares about visual/design development details, including renderings, architectural character, materials, elevations, railings, ceiling layouts, and detail sheet agendas.
  - **Confidence:** HIGH
  - **Evidence:** Requests about 3D model review, exterior character, RCPs, AD sheet detail agendas, render updates, and detailed client preference breakdowns.
  - **Why it belongs in USER.md:** The assistant should not treat the user as only administrative.

---

## 5. Recurring constraints

- **Finding:** Outputs need to be quick to review and immediately usable in real project workflows.
  - **Confidence:** HIGH
  - **Evidence:** Frequent preference for direct drafts, concise reminders, subjects only, clean lists, and formatted summaries.
  - **Why it belongs in USER.md:** Practical constraint on response design.

- **Finding:** The user often works with incomplete information and needs the assistant to distinguish confirmed facts from estimates / pending items.
  - **Confidence:** HIGH
  - **Evidence:** Repeated requests to verify legal descriptions, utility information, equipment details, extracted photo data, and “fact if it exists and estimate if not.”
  - **Why it belongs in USER.md:** Important epistemic preference.

- **Finding:** The user’s work is constrained by consultant dependencies and client response times.
  - **Confidence:** HIGH
  - **Evidence:** Many follow-up emails asking owners or consultants for missing files, Title 24, CAD, utility data, solar specs, or schedule updates.
  - **Why it belongs in USER.md:** Helps the assistant prioritize tracking lists and follow-ups.

- **Finding:** The user likely needs region-specific compliance and utility coordination for California jurisdictions.
  - **Confidence:** HIGH
  - **Evidence:** Anaheim utilities, Southern California gas, California code references, Title 24, ADUs, SB-9, RH-1 zoning.
  - **Why it belongs in USER.md:** Stable operational context.

- **Finding:** Sensitive personal data is generally not needed; project-specific professional data is the useful context.
  - **Confidence:** HIGH
  - **Evidence:** The user consistently focuses on project, consultant, code, and document context rather than personal biography.
  - **Why it belongs in USER.md:** Keeps USER.md practical and non-invasive.

---

## 6. Working style and habits

- **Finding:** The user prefers the assistant to act like a fast drafting and coordination partner.
  - **Confidence:** HIGH
  - **Evidence:** Repeated imperative requests with minimal backstory and expectations of immediate usable output.
  - **Why it belongs in USER.md:** Strongly shapes assistant behavior.

- **Finding:** The user often provides rough notes, screenshots, photos, or partial drafts and wants them cleaned, extracted, or turned into professional deliverables.
  - **Confidence:** HIGH
  - **Evidence:** Many uploaded images of notes, meters, sketches, emails, and screenshots with requests to extract or turn into structured outputs.
  - **Why it belongs in USER.md:** Predictive of common task pattern.

- **Finding:** The user likes structured, categorized outputs when dealing with project inputs.
  - **Confidence:** HIGH
  - **Evidence:** Requests for organized lists, checklists, project summaries, agendas, final consolidated questions, and clean breakdowns.
  - **Why it belongs in USER.md:** Useful default formatting guidance.

- **Finding:** The user prefers brevity in normal interaction but still wants completeness in the underlying work product.
  - **Confidence:** HIGH
  - **Evidence:** Frequent requests for “short” or shortened emails, while also asking for complete lists, extracted facts, or consultant-ready detail.
  - **Why it belongs in USER.md:** Important nuance for final response style.

- **Finding:** The user frequently asks for outputs in forwarding-ready business English, especially email format.
  - **Confidence:** HIGH
  - **Evidence:** Large proportion of requests are send-ready emails with project context and tone adjustments.
  - **Why it belongs in USER.md:** A core habitual use case.

- **Finding:** The user wants uncertainty handled explicitly.
  - **Confidence:** HIGH
  - **Evidence:** Requests to verify, distinguish estimate vs fact, mark assumptions clearly, and avoid unstated guessing.
  - **Why it belongs in USER.md:** Stable preference for groundedness.

---

## 7. Suggested USER.md fields

- **Name:** Unknown
- **What to call them:** Unknown
- **Pronouns:** Unknown
- **Timezone:** Likely Pacific Time (US)
- **Professional domains:** Architecture, planning, construction coordination, permit / consultant coordination
- **Typical assistant use cases:** Drafting emails, extracting information from images / PDFs, formatting project notes, compiling consultant questions, summarizing code / utility info, producing send-ready lists and agendas
- **Recurring project types:** Custom residential, ADUs, site planning, permit and consultant coordination, utility / MEP / Title 24 coordination
- **Output preferences:** Concise, polished, forwarding-ready, clearly organized, fact-vs-estimate separated
- **Working style:** Fast-moving, multi-project, coordination-heavy, uses screenshots / notes / partial drafts as source material
- **Stable context:** Southern California project work, especially California residential / utility / zoning workflows
- **Constraints:** Often missing inputs from owners / consultants; depends on external responses; needs practical outputs more than abstract explanations

---

# Concise USER.md Candidate

## Name
Unknown

## What to call them
Unknown

## Pronouns
Unknown

## Timezone
Likely Pacific Time (US)

## Notes
Works in architecture / planning / construction coordination, likely on the architect / design office side. Frequently manages consultant and client communications, project documentation, utility / MEP intake, Title 24 coordination, zoning / code extraction, and drawing-set support. Often works on California residential projects, including custom homes, ADUs, site plans, renderings, RCPs, and permit-related coordination.

Prefers concise, professional, forwarding-ready outputs. Values structured lists, polished emails, clean summaries, and clear separation of confirmed facts versus estimates or pending items. Often provides screenshots, handwritten notes, PDFs, and partial drafts and wants them turned into usable deliverables quickly.

## Context
Default to practical project support. Optimize for: short business writing, organized checklists, extracted facts, consultant-ready questions, and project summaries. When information is incomplete, label assumptions clearly and distinguish verified facts from estimates. Preserve project numbers and jurisdiction-specific details when relevant.

