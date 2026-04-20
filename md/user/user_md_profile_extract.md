# Executive summary

Based on the prior chats available in this project context, the user appears to work primarily in residential architecture / permit-planning / project-document coordination. They repeatedly use the assistant for extracting permit-relevant property data, drafting planning-facing scope language, preparing owner/contact blocks, and writing concise project correspondence.

The user consistently cares about outputs that are practical, concise, formatting-faithful, and usable in real project submittals or communications. The available evidence does **not** explicitly state the user's name, preferred form of address, or pronouns. The project context indicates a default timezone of **-0700**, which is useful as a working assumption but should be treated as provisional unless confirmed.

This USER.md should stay narrow: it should describe the user as someone working in project/permit documentation with recurring needs around legal descriptions, scope-of-work summaries, owner/contact formatting, and concise business writing.

# Explicit user facts

- Finding: The user works on project documentation involving residential properties and permitting/planning language.
- Confidence: High
- Evidence: Repeated requests in prior chats for legal description fields, zoning, occupancy classification, construction type, owner information, project title, and planning-department-ready scope-of-work language.
- Why it belongs in USER.md: This is core work context that helps the assistant anticipate task framing and terminology.

- Finding: The user needs planning-department-relevant wording rather than full procedural detail.
- Confidence: High
- Evidence: The user explicitly corrected a scope summary to say it should be "relevant for the planning department" and should stay overall/high-level.
- Why it belongs in USER.md: This reflects the user’s operating context and deliverable audience.

- Finding: The user uses the assistant for drafting business emails and project communication.
- Confidence: High
- Evidence: The user asked for an email to Rana instructing drawing revisions and coordination with Nandini.
- Why it belongs in USER.md: This is a recurring task class relevant to assistance.

- Finding: The user relies on prescribed formatting for owner/contact information.
- Confidence: High
- Evidence: Project instruction set explicitly defines a contact format block, and the user requested owner information in that format.
- Why it belongs in USER.md: This is a durable workflow requirement, not just style guidance.

- Finding: The available project context timezone is -0700.
- Confidence: Medium
- Evidence: Project conversation metadata states: "Default timezone is -0700."
- Why it belongs in USER.md: Timezone can help with scheduling assumptions, though it is not explicitly user-confirmed.

- Finding: The user’s name is not explicitly stated in the available prior chats.
- Confidence: High
- Evidence: No explicit self-identification is present in the available history.
- Why it belongs in USER.md: Avoids inventing identity facts.

- Finding: Preferred name / what to call the user is not explicitly stated in the available prior chats.
- Confidence: High
- Evidence: No direct instruction about form of address appears in the available history.
- Why it belongs in USER.md: Prevents unsupported personalization.

- Finding: Pronouns are not explicitly stated in the available prior chats.
- Confidence: High
- Evidence: No pronoun preference appears in the available history.
- Why it belongs in USER.md: Avoids inventing personal details.

# Stable inferred user context

- Finding: Professional domain is likely residential architecture, permit expediting, design documentation, or closely related project coordination.
- Confidence: High
- Evidence: Repeated work on scopes of work, legal description fields, zoning, occupancy, construction type, planning department framing, and drawing revision coordination.
- Why it belongs in USER.md: This is enduring context that helps the assistant choose terminology and output style.

- Finding: The user supports residential remodel / legalization / ADU-related projects.
- Confidence: High
- Evidence: Repeated references to legalizing unpermitted construction, remodeling a main house and guest house, and converting garage second floor to ADU.
- Why it belongs in USER.md: These are recurring project types, not one-off topics.

- Finding: The user likely works with property/project packets, scanned markups, contracts, and permit-adjacent source documents.
- Confidence: High
- Evidence: The user uploads contract PDFs and scanned markups, and asks for extraction/reframing from them.
- Why it belongs in USER.md: This informs expected task inputs and document workflows.

- Finding: The user values outputs that can be copied directly into forms, submittals, or emails.
- Confidence: High
- Evidence: Many requests ask for field-by-field extraction, exact headings, title phrasing, and concise ready-to-use wording.
- Why it belongs in USER.md: This is practical collaboration context.

# Recurring projects and interests

- Finding: Residential remodel and legalization projects.
- Confidence: High
- Evidence: Requests around "LEGALIZE EXISTING CONDITIONS," remodel scope descriptions, and permit-oriented project titles.
- Why it belongs in USER.md: Helps the assistant anticipate the domain and language.

- Finding: ADU-related work.
- Confidence: High
- Evidence: User asked for project title phrased like "LEGALIZE UNPERMITTED CONSTRUCTION AND PROPOSE ADU" and scope language for converting garage second floor to ADU.
- Why it belongs in USER.md: Appears as a repeated project theme.

- Finding: Property research and permit metadata gathering.
- Confidence: High
- Evidence: Requests for APN, tract, lot, zoning, occupancy classification, construction type, sprinklered status, and owner information.
- Why it belongs in USER.md: This is a recurring assistant use case.

- Finding: Drawing revision coordination.
- Confidence: Medium
- Evidence: Email request directing Rana to continue drawing revisions with Nandini if available, based on scanned markups.
- Why it belongs in USER.md: Relevant recurring workflow, though less repeatedly evidenced than permit/document tasks.

# Recurring constraints

- Finding: Must avoid unsupported assumptions in permit/property data.
- Confidence: High
- Evidence: The user distinguishes between extracting what is in the contract versus doing separate research to find missing property data.
- Why it belongs in USER.md: Accuracy and source-grounding are operational constraints for this user.

- Finding: Outputs should be useful for formal agencies or external collaborators.
- Confidence: High
- Evidence: User explicitly references planning department relevance and asks for formal email drafting to consultants/team members.
- Why it belongs in USER.md: Audience and compliance context shape assistance.

- Finding: The user may work from incomplete source documents and expects best-effort extraction/research.
- Confidence: High
- Evidence: The contract lacked several requested fields, after which the user asked to research the missing items.
- Why it belongs in USER.md: Helps the assistant understand the typical incompleteness of inputs.

# Working style and habits

- Finding: The user often works by giving a template first, then refining output by correction.
- Confidence: High
- Evidence: The user provides explicit field lists, example phrasing, and corrections like "It should say..." and "Keep it overall..."
- Why it belongs in USER.md: This is a stable collaboration pattern.

- Finding: The user uses the assistant for fast document production rather than brainstorming.
- Confidence: High
- Evidence: Most prompts are extraction, rewriting, title-generation, email drafting, or structured research tasks.
- Why it belongs in USER.md: Helps the assistant default to execution rather than ideation.

- Finding: The user prefers category-based organization by building, field, or role.
- Confidence: High
- Evidence: Requests to structure scope by MAIN HOUSE / GUEST HOUSE / GARAGE STRUCTURE and contact info in fixed blocks.
- Why it belongs in USER.md: This is a recurring information-organization preference.

- Finding: The user likely operates in a team setting with named collaborators/consultants.
- Confidence: Medium
- Evidence: References to Royal, Rana, and Nandini in revision workflow.
- Why it belongs in USER.md: Useful teamwork context, though not deeply evidenced.

# Suggested USER.md fields

- Name: Unknown from available evidence.
- What to call them: Not explicitly stated.
- Pronouns: Not explicitly stated.
- Timezone: Likely -0700 (project context default; confirm if needed).
- Professional domain: Residential architecture / permitting / design-document coordination.
- Typical tasks: Legal description extraction, permit/property research, scope-of-work drafting, owner/contact formatting, drawing-revision emails.
- Recurring project types: Remodels, legalization of unpermitted work, guest house work, garage conversions, ADUs.
- Output priorities: Practical, concise, copy-ready, agency-appropriate, accurately sourced.
- Common input materials: Contracts, PDFs, scanned markups, permit-related project documents.
- Collaboration pattern: Gives templates, expects exact formatting, refines by direct correction.

# USER.md candidate

## Name
Unknown.

## What to call them
Not explicitly stated in available history.

## Pronouns
Not explicitly stated in available history.

## Timezone
Likely -0700 based on project context metadata. Treat as provisional until confirmed.

## Notes
- Works in residential project / permit / planning documentation.
- Frequently needs concise, copy-ready language for scopes, titles, owner/contact blocks, and business emails.
- Often handles legalization/remodel/ADU-related residential projects.
- Regularly needs property and code-adjacent fields gathered or reformatted.
- Uses uploaded contracts, scanned markups, and related project documents as source material.

## Context
- Typical assistant tasks include: extracting legal/property info, drafting planning-facing scope language, researching missing permit/property fields, formatting owner/contact information, and writing revision/coordination emails.
- Outputs are most useful when they are structured for real-world use in submittals, agency review, or project coordination.
- When source docs are incomplete, best-effort research is useful, but unsupported assumptions should be avoided.
- The user often works by supplying a format/example first, then tightening the wording through direct revision.

