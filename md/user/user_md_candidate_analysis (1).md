# Executive summary

The user appears to work in an architecture / engineering / planning / construction context, with recurring focus on permit coordination, plan-check responses, health department corrections, utility coordination, and project communication. The user frequently uses the assistant as a drafting, coordination, and document-translation tool: turning agency comments, schedules, screenshots, and plan notes into actionable revisions, email drafts, response letters, equipment schedules, and compliance summaries.

The strongest stable context is professional rather than personal. The user is likely part of or closely tied to Design Concepts, works on commercial and hospitality-related permit packages, and repeatedly handles projects involving city departments, county health plan check, and consultant coordination. The most useful USER.md value is giving an assistant enough context to support this project-management and technical-document workflow efficiently.

# Explicit user facts

- Finding: The user works in a professional context strongly associated with Design Concepts.
- Confidence: High
- Evidence: Repeated emails, letters, and signatures use “Design Concepts,” “Architecture - Engineering - Planning - Construction,” and the office address and phone number. The user repeatedly asks for drafts on behalf of this organization.
- Why it belongs in USER.md: This is stable working context that affects how the assistant should support drafting and coordination tasks.

- Finding: The user regularly works on the CandleWood Suites project at 1818 E Holt Blvd, Ontario, CA.
- Confidence: High
- Evidence: Many requests revolve around this project, including health comments, utility waiver coordination, equipment schedules, water heater revisions, and owner updates.
- Why it belongs in USER.md: This is a recurring project that provides important continuity context.

- Finding: The user operates in a Southern California permitting environment.
- Confidence: High
- Evidence: Repeated references to Ontario, Chino, Riverside County, San Bernardino County, Rancho Cucamonga, Eastvale, Irvine, and California agencies.
- Why it belongs in USER.md: Local jurisdictional context is highly relevant for recurring assistance.

- Finding: The user uses project identifiers such as APN, SR number, plan check number, permit number, and sheet numbers regularly.
- Confidence: High
- Evidence: Repeated requests to include APN, SR, plan check, building permit, and sheet references in emails and summaries.
- Why it belongs in USER.md: The assistant should preserve these identifiers and treat them as important context.

- Finding: The user explicitly wants contacts formatted in a specific way.
- Confidence: High
- Evidence: “FOR CONTACTS, all contexts must formatted as follows: Full Name / Title / Department/ Company / phone / email.”
- Why it belongs in USER.md: This is stable workflow context about how the user stores and uses contact information.

# Stable inferred user context

- Finding: The user likely performs project coordination, permit expediting, and plan-check response work rather than purely design-only work.
- Confidence: High
- Evidence: Repeated tasks include responding to health comments, utility waivers, owner updates, permit-status emails, contact extraction, and sheet-by-sheet correction plans.
- Why it belongs in USER.md: This describes the kind of help that is consistently useful.

- Finding: The user likely works with or around architecture and MEP drawings, consultant packages, and jurisdictional reviews.
- Confidence: High
- Evidence: Frequent references to sheets A-2.1, P0.1, P2.1, P2.2, equipment schedules, plumbing equipment schedules, response letters, and review comments from Health and City.
- Why it belongs in USER.md: It informs the assistant that technical sheet coordination is a normal task domain.

- Finding: The user likely works in Pacific Time.
- Confidence: Medium
- Evidence: The project and office geography are consistently in California; the project conversation timezone is -0700.
- Why it belongs in USER.md: Timezone matters for drafting timely follow-ups and interpreting deadlines.

- Finding: The user likely collaborates with owners, consultants, city reviewers, health reviewers, utility staff, and internal accounts/architects teams.
- Confidence: High
- Evidence: Repeated named contacts include Christine Schindehette/Miller, Jonathan Chang, Carmen Lane, Raúl Robles, accounts staff, owner representatives, and consultants.
- Why it belongs in USER.md: The assistant should expect multi-party coordination work.

# Recurring projects and interests

- Finding: CandleWood Suites / limited food facility TI / breakfast area remodel is a major recurring project.
- Confidence: High
- Evidence: Many threads concern health department comments, water heater sizing, grease interceptor waiver, OMUC coordination, resubmittals, and owner updates for this project.
- Why it belongs in USER.md: Strong continuity value.

- Finding: The user also handles legal description and jurisdictional info requests for California properties.
- Confidence: High
- Evidence: Requests for LEGAL DESCRIPTION templates, APN, tract, lot, zoning, occupancy group, construction type, and jurisdiction confirmation.
- Why it belongs in USER.md: This is a recurring support need.

- Finding: The user often works on agency-facing communication around plan review and permit progress.
- Confidence: High
- Evidence: Multiple short email drafts to health, utilities, owners, consultants, and engineers.
- Why it belongs in USER.md: This is a durable work pattern.

# Recurring constraints

- Finding: The user works under agency deadlines, hold dates, and resubmittal cycles.
- Confidence: High
- Evidence: Repeated references to holds until specific dates, resubmittal numbers, 1–3 week review times, and requests to expedite.
- Why it belongs in USER.md: Time sensitivity shapes support priorities.

- Finding: The user often must comply with rigid formatting and administrative requirements from agencies.
- Confidence: High
- Evidence: Need to include permit numbers, SR numbers, APNs, exact sheet references, exact note text, and approved certifications/listings.
- Why it belongs in USER.md: The assistant should preserve compliance-critical detail.

- Finding: The user likely works within consultant and jurisdiction constraints rather than having unilateral control.
- Confidence: High
- Evidence: Repeated dependence on city/health comments, wastewater authority determinations, MEP revisions by outside consultants, and owner follow-up.
- Why it belongs in USER.md: This affects how recommendations should be framed.

- Finding: Budget sensitivity is not clearly stated.
- Confidence: Low
- Evidence: There are some discussions about easiest approval path, but no durable budget rule is explicitly stated.
- Why it belongs in USER.md: It should not be overstated; only note as uncertain if included at all.

# Working style and habits

- Finding: The user frequently provides screenshots, pasted email chains, schedule tables, and redlines, then wants them converted into working outputs.
- Confidence: High
- Evidence: Many requests use image uploads and pasted correspondence followed by “help me resolve,” “update letter,” “write me,” or “analyze the comments.”
- Why it belongs in USER.md: This is a stable interaction pattern.

- Finding: The user often wants outputs that can be sent immediately with little or no editing.
- Confidence: High
- Evidence: Repeated requests for direct-copy note text, response letters, short emails, exact contact formatting, and plan-note wording.
- Why it belongs in USER.md: It helps the assistant optimize usefulness.

- Finding: The user commonly asks for sheet-by-sheet or item-by-item action plans.
- Confidence: High
- Evidence: Requests for categorized action plans, comment-by-comment fixes, equipment schedule corrections, and exact response updates.
- Why it belongs in USER.md: The assistant should package tasks into execution-ready structure.

- Finding: The user tends to work iteratively, refining wording and format over several turns.
- Confidence: High
- Evidence: Many sequences involve draft → shorten → reformat → make more direct → align with sheet / comment.
- Why it belongs in USER.md: The assistant should expect quick iterative revision cycles.

# Suggested USER.md fields

- Finding: Name is not explicitly confirmed in the available evidence.
- Confidence: Low
- Evidence: The conversation includes names of collaborators, but no clear user self-identification.
- Why it belongs in USER.md: This should remain blank or explicitly unknown.

- Finding: What to call them is not explicitly stated.
- Confidence: Low
- Evidence: No direct preference is given for form of address.
- Why it belongs in USER.md: Do not invent it.

- Finding: Pronouns are not explicitly stated.
- Confidence: Low
- Evidence: None.
- Why it belongs in USER.md: Leave unspecified.

# USER.md candidate

## Name
- Not explicitly stated.

## What to call them
- Not explicitly stated.

## Pronouns
- Not explicitly stated.

## Timezone
- Likely Pacific Time (California-based work context). [Assumption]

## Notes
- Works in or closely with Design Concepts.
- Frequently handles permit coordination, plan-check responses, agency communication, and consultant/owner follow-up.
- Often needs exact project identifiers preserved: APN, SR number, permit number, plan check number, and sheet references.
- Uses the assistant heavily for drafting emails, correction letters, plan notes, action plans, and schedule revisions.
- Often provides screenshots, PDFs, and pasted email chains as source material.

## Context
- Professional domain: architecture / engineering / planning / construction coordination.
- Strong recurring project context: CandleWood Suites, 1818 E Holt Blvd, Ontario, CA, including health, utility, and plumbing coordination for a limited food facility / breakfast area remodel.
- Recurring tasks: legal descriptions, jurisdiction confirmation, permit-status updates, owner notices, response letters, equipment schedule edits, plan-check action plans, and agency-facing emails.
- Recurring collaborators/agencies: city staff, county health plan check, utility/pretreatment staff, owner representatives, consultants, and internal project team members.
- Stable working pattern: wants concise, execution-ready outputs tied closely to supplied project documents.

