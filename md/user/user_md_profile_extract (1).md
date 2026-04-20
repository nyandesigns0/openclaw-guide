# USER.md Profile Extract

## 1. Executive summary
The user appears to work in residential design/construction coordination, with repeated focus on architecture, MEP, civil coordination, permitting, plan check responses, and consultant communication. They use the assistant primarily as a project accelerator: extracting facts from drawings and reports, checking consistency across documents, building schedules, drafting emails, and producing structured technical/admin deliverables. The profile evidence is strongest around work context and collaboration patterns, and weaker around personal identity details.

## 2. Explicit user facts

- Finding: The user likely goes by **Shiv** in at least some project communications.
- Confidence: Medium
- Evidence: In prior project email context, inbound message says, "Hi shiv sir," and an outbound draft was signed "Best regards, Shiv."
- Why it belongs in USER.md: A likely name or working name can help with drafting and addressing, but confidence is not fully certain.

- Finding: The user works in a professional setting tied to **Design Concepts**.
- Confidence: High
- Evidence: Prior email chains repeatedly use the Design Concepts signature block: "Design Concepts – Architecture – Engineering – Planning – Construction," with the team email architects@designconceptsarchitects.com.
- Why it belongs in USER.md: This is durable organizational context that shapes output style and work needs.

- Finding: The user’s working timezone is likely **Pacific Time**.
- Confidence: High
- Evidence: Project conversation metadata indicates default timezone **-0700**; project locations and office references are in California (Corona, Irvine, Chino, Yorba Linda, Eastvale).
- Why it belongs in USER.md: Timezone helps scheduling, phrasing, and assumptions about business hours.

- Finding: The user is based in or works primarily in **Southern California / California local-jurisdiction context**.
- Confidence: High
- Evidence: Repeated projects reference Corona, Irvine, Chino, Yorba Linda, Eastvale, California agencies, California code, Title 24, CALGreen, and local city comments.
- Why it belongs in USER.md: Regional context strongly affects code references, permitting assumptions, and terminology.

- Finding: No explicit pronouns were provided.
- Confidence: High
- Evidence: No direct pronoun statement appears in prior chats.
- Why it belongs in USER.md: Important to record as unknown rather than assume.

## 3. Stable inferred user context

- Finding: The user works in **architecture / residential project coordination** with frequent overlap into **MEP, civil, permitting, and consultant coordination**.
- Confidence: High
- Evidence: Repeated tasks involve plan review comments, Title 24, plumbing schedules, utility coordination, legal descriptions, civil/MEP emails, and consultant responses.
- Why it belongs in USER.md: This is the clearest durable work-context signal.

- Finding: The user likely manages or coordinates projects across design disciplines rather than working only in one silo.
- Confidence: High
- Evidence: They request help on architectural sheets, plumbing fixture schedules, MEP questions, civil utility verification, consultant emails, and city comment response strategy.
- Why it belongs in USER.md: This helps the assistant anticipate cross-discipline support needs.

- Finding: The user frequently works from uploaded plans, reports, screenshots, permit comments, and consultant correspondence.
- Confidence: High
- Evidence: Many tasks rely on PDFs, images, plan sheets, spec sheets, OCR docs, Title 24 reports, and email threads.
- Why it belongs in USER.md: The assistant should expect file-centric workflows.

- Finding: The user often needs help transforming technical source material into operational deliverables.
- Confidence: High
- Evidence: Repeated asks for action plans, schedules, email drafts, direct answers to RFIs, and extracted project data.
- Why it belongs in USER.md: This defines how the assistant is most useful.

## 4. Recurring projects and interests

- Finding: Recurring project types include **single-family residential**, **SB9 lot splits**, and **permit / plan-check / city review workflows**.
- Confidence: High
- Evidence: 203 Violet project is an SB9 lot split with four units over two parcels; other chats include city comments, shear wall fixes, and project follow-up emails.
- Why it belongs in USER.md: These are recurring project domains, not one-off curiosities.

- Finding: Recurring technical topics include **MEP coordination**, **Title 24 compliance**, **plumbing fixture/water heater selection**, **civil utility coordination**, and **legal description extraction**.
- Confidence: High
- Evidence: Multiple messages directly cover all of these topics.
- Why it belongs in USER.md: These are common assistance areas to anticipate.

- Finding: The user returns often to **document consistency checking**.
- Confidence: High
- Evidence: Examples include checking HPWH vs Navien against Title 24, matching comments to sheets, recalling P0.1, and validating equipment/spec requirements.
- Why it belongs in USER.md: This is a repeated high-value use case.

## 5. Recurring constraints

- Finding: The user operates within **jurisdictional and code constraints**, especially California/local code compliance.
- Confidence: High
- Evidence: Title 24, CALGreen, city comments, planning requirements, water pressure/PRV, and permit-driven questions appear repeatedly.
- Why it belongs in USER.md: Outputs should be compliance-aware by default.

- Finding: The user often depends on **incomplete consultant inputs** and needs to move work forward with partial information.
- Confidence: Medium
- Evidence: Repeated need to ask consultants for CADs, verify utility locations from civil, answer open engineer questions, and work from draft sheets.
- Why it belongs in USER.md: The assistant should help bridge missing information pragmatically.

- Finding: The user’s environment likely includes **multi-file, multi-consultant project packages** rather than single-document tasks.
- Confidence: High
- Evidence: Projects include architectural CAD/PDF, civil CAD, electrical/mechanical/plumbing drafts, Title 24, OCR records, and email threads.
- Why it belongs in USER.md: Useful for anticipating coordination needs.

## 6. Working style and habits

- Finding: The user typically uses the assistant for **drafting, extracting, checking, formatting, and recommending**.
- Confidence: High
- Evidence: Repeated asks to write emails, extract project information, build schedules, answer consultant questions, and recommend equipment models.
- Why it belongs in USER.md: This describes the core assistance pattern.

- Finding: The user tends to work in a **fast, iterative, project-support loop**.
- Confidence: Medium
- Evidence: Many quick follow-up questions refine a deliverable step by step: check utility plan, assess water heater, count fixtures, recommend model, answer engineer questions, finish email.
- Why it belongs in USER.md: The assistant should support rapid iteration without re-explaining basics.

- Finding: The user values outputs that are immediately usable in **emails, schedules, notes, and consultant coordination**.
- Confidence: High
- Evidence: Most requests end in a deliverable ready to send or paste into project documents.
- Why it belongs in USER.md: Helps prioritize deliverable-ready formatting.

- Finding: The user likely works with **CAD, PDFs, Title 24 reports, and plan sheets** regularly.
- Confidence: High
- Evidence: These recur across tasks and file uploads.
- Why it belongs in USER.md: It is stable tool-context, even if exact software names are not always explicit.

## 7. Suggested USER.md fields

- Finding: Name field should be tentative rather than absolute.
- Confidence: Medium
- Evidence: "Shiv" appears in project communications, but not formally introduced by the user.
- Why it belongs in USER.md: Record carefully as likely/working name.

- Finding: Context should emphasize residential design/construction coordination in California.
- Confidence: High
- Evidence: Strong repeated project evidence.
- Why it belongs in USER.md: Most useful profile anchor.

- Finding: Notes should include heavy use of assistant for file-grounded project support.
- Confidence: High
- Evidence: Strong repeated pattern.
- Why it belongs in USER.md: Helps assistant load the right mode quickly.

## Concise USER.md candidate

### Name
- LIKELY "SHIV" IN PROJECT COMMUNICATIONS (NOT FULLY CONFIRMED)

### What to call them
- USE "SHIV" WHEN DRAFTING INTERNAL/PROJECT COMMUNICATIONS IF CONTEXT SUPPORTS IT
- OTHERWISE STAY NEUTRAL UNLESS THE USER CONFIRMS A PREFERRED NAME

### Pronouns
- NOT EXPLICITLY STATED

### Timezone
- LIKELY PACIFIC TIME (CALIFORNIA, UTC-7 / UTC-8 SEASONALLY)

### Notes
- WORKS IN OR CLOSELY WITH DESIGN CONCEPTS
- SUPPORT CONTEXT IS MAINLY RESIDENTIAL DESIGN / CONSTRUCTION COORDINATION
- FREQUENTLY HANDLES ARCHITECTURAL, MEP, CIVIL, PERMITTING, AND CONSULTANT COMMUNICATION TASKS
- OFTEN WORKS FROM FILES: CAD-RELATED PACKAGES, PDF PLAN SETS, TITLE 24 REPORTS, CITY COMMENTS, SCREENSHOTS, AND EMAIL THREADS

### Context
- BASED IN A CALIFORNIA PROJECT ENVIRONMENT WITH TITLE 24, CALGREEN, AND LOCAL JURISDICTION REQUIREMENTS
- RECURRING PROJECT TYPES INCLUDE SINGLE-FAMILY RESIDENTIAL, SB9 LOT SPLITS, PLAN CHECK RESPONSES, AND MULTI-CONSULTANT COORDINATION
- TYPICAL USES OF THE ASSISTANT: EXTRACT PROJECT DATA, CHECK DOCUMENT CONSISTENCY, DRAFT EMAILS, BUILD SCHEDULES, ANSWER TECHNICAL RFIS, AND TURN SOURCE MATERIAL INTO ACTIONABLE DELIVERABLES
- DECISIONS OFTEN DEPEND ON CODE COMPLIANCE, PLAN CONSISTENCY, CONSTRUCTABILITY, AND CONSULTANT COORDINATION
- ASSUME THE USER IS OFTEN WORKING QUICKLY WITH PARTIAL INFORMATION AND NEEDS PRACTICAL SUPPORT RATHER THAN GENERAL THEORY

