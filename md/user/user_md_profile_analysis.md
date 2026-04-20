# Executive summary

The user appears to work primarily in architecture/design-adjacent creative and analytical workflows, with a strong recurring focus on architecture competitions, concept development, visual presentation, and agent/persona-document design. They use the assistant as a research, synthesis, formatting, critique, and document-structuring partner. Their most stable needs are not biographical but operational: they want the assistant to preserve context across long-running projects, support iterative analysis, and produce outputs that are reusable in briefs, strategy documents, diagrams, and agent configuration files.

The user's chats suggest recurring involvement with architecture competition research, presentation analysis, project framing, and design-evaluation tasks, alongside meta-work on building agent documents like SOUL.md and USER.md for OpenClaw. Their highest-value output traits seem to be precision, usefulness, structure, and decision support.

# Explicit user facts

- Finding: The user's preferred name is not explicitly stated in the available prior chats.
- Confidence: High
- Evidence: No prior chat in the available project history explicitly states the user's name or a preferred form of address.
- Why it belongs in USER.md: It should be left blank or marked unknown rather than invented.

- Finding: The user's pronouns are not explicitly stated in the available prior chats.
- Confidence: High
- Evidence: No prior chat in the available project history explicitly states pronouns.
- Why it belongs in USER.md: This should remain unspecified unless directly provided.

- Finding: The project workspace default timezone is -0700, which is the strongest available timezone signal in the visible conversation context.
- Confidence: Medium
- Evidence: The project conversation context shows “Default timezone is -0700.”
- Why it belongs in USER.md: Timezone matters for scheduling, deadlines, and competition timelines, but should be marked as likely rather than confirmed personal timezone.

- Finding: The user repeatedly works on architecture-competition-related tasks.
- Confidence: High
- Evidence: Multiple chats center on “Home of Shadows,” architecture competition briefs, winners, jury comments, and architecture competition research.
- Why it belongs in USER.md: This is stable project context that materially improves assistance.

- Finding: The user is actively building OpenClaw agent documents such as SOUL.md and USER.md.
- Confidence: High
- Evidence: Multiple chats explicitly ask for extraction relevant to “building SOUL.md for an OpenClaw agent,” and the current request asks for USER.md.
- Why it belongs in USER.md: This is a recurring meta-project and a stable context for future support.

# Stable inferred user context

- Finding: The user likely works in architecture, architectural visualization, design research, or a closely related field.
- Confidence: Medium
- Evidence: Repeated sustained conversations about architecture competitions, jury analysis, presentation boards, briefs, visual diagrams, and design strategy.
- Why it belongs in USER.md: This helps the assistant calibrate terminology, examples, and default assumptions.

- Finding: The user likely operates across both creative design work and systems/agent-design work.
- Confidence: Medium
- Evidence: The user alternates between architecture competition analysis and meta-instruction tasks for OpenClaw persona/profile docs.
- Why it belongs in USER.md: This dual-context explains why both design analysis and behavioral-document drafting are common assistance needs.

- Finding: The user likely values long-horizon project continuity over one-off casual answers.
- Confidence: Medium
- Evidence: Repeated project threads on SemiChan, architecture competitions, and repeated extraction tasks across prior chats indicate ongoing workflows rather than isolated queries.
- Why it belongs in USER.md: Helps the assistant preserve and reuse relevant context.

# Recurring projects and interests

- Finding: Home of Shadows competition research is a recurring active topic.
- Confidence: High
- Evidence: The user has asked about previous editions, winners, shortlisted projects, the competition brief, jury comments, program requirements, and rules interpretation.
- Why it belongs in USER.md: This is an active recurring project with significant context value.

- Finding: SemiChan is a recurring project family.
- Confidence: High
- Evidence: Prior chat titles include “SemiChan Dashboard HTML,” “SemiChan App Understanding,” “SemiChan Concept Quality Diagnostics,” “SemiChan Main,” and “SemiChan Ref 1 - done.”
- Why it belongs in USER.md: Repeated project naming indicates durable ongoing work.

- Finding: SOUL.md / USER.md / OpenClaw agent configuration is a recurring interest.
- Confidence: High
- Evidence: Multiple prior chats ask to infer assistant persona and now user profile for OpenClaw.
- Why it belongs in USER.md: This is clearly an enduring meta-project.

- Finding: Architecture competitions more broadly are a repeated area of interest, not just a one-off contest.
- Confidence: High
- Evidence: Prior chat titles include “Architecture Competitions 2026,” and repeated discussion of competition briefs, boards, and jury preferences.
- Why it belongs in USER.md: Indicates a broader continuing domain interest.

# Recurring constraints

- Finding: The user often works from incomplete or externally constrained source material and wants maximal extraction from what is available.
- Confidence: Medium
- Evidence: Repeated requests to analyze prior chats, uploaded PDFs, jury compilations, briefs, and website archives.
- Why it belongs in USER.md: Helps the assistant prioritize best-effort grounded extraction over perfect completeness.

- Finding: The user cares about exact scope control and dislikes off-target expansion.
- Confidence: High
- Evidence: Repeated constraints such as “extract only information relevant,” “do not invent,” “focus on,” “do not turn it into a dossier,” and earlier constraints against summarizing when reformatting.
- Why it belongs in USER.md: This is a stable collaboration constraint.

- Finding: The user may have practical limitations around access to competition archives, websites, and downloadable assets.
- Confidence: Medium
- Evidence: Multiple chats involved retrieving competition boards, press kits, and archived content from external sites.
- Why it belongs in USER.md: The assistant should expect asset-gathering and research support to be useful.

# Working style and habits

- Finding: The user tends to provide detailed task specs and expects the assistant to follow them closely.
- Confidence: High
- Evidence: Many prompts specify goal, extraction targets, method, output format, schema, and constraints.
- Why it belongs in USER.md: This is a durable collaboration pattern.

- Finding: The user frequently uses the assistant for research synthesis, structured extraction, reformatting, and decision-support analysis.
- Confidence: High
- Evidence: Prior chats repeatedly ask for brief analysis, jury-comment analysis, program extraction, persona extraction, and exact reformatting.
- Why it belongs in USER.md: This is one of the clearest stable usage patterns.

- Finding: The user prefers outputs that can be directly reused in other systems or documents.
- Confidence: High
- Evidence: Repeated requests for SOUL.md, USER.md, diagrams, structured docs, concise candidate drafts, and reusable bullets.
- Why it belongs in USER.md: This materially affects how outputs should be packaged.

- Finding: The user often returns to the same topic and progressively deepens it rather than asking one broad question once.
- Confidence: High
- Evidence: The Home of Shadows thread moves from winners to editions to brief analysis to jury comments to rules interpretation; OpenClaw threads revisit persona extraction repeatedly.
- Why it belongs in USER.md: Signals that continuity and incremental refinement are useful default behaviors.

# Suggested USER.md fields

- Finding: Name should remain unknown unless explicitly provided.
- Confidence: High
- Evidence: No explicit name in available chats.
- Why it belongs in USER.md: Avoids fabrication.

- Finding: What to call them should remain unspecified or neutral unless they provide a preference.
- Confidence: High
- Evidence: No explicit preferred form of address in available chats.
- Why it belongs in USER.md: Keeps profile accurate and minimal.

- Finding: Timezone should be marked as likely -0700 from workspace context, not confirmed personal fact.
- Confidence: Medium
- Evidence: Project context default timezone is -0700.
- Why it belongs in USER.md: Useful for scheduling and deadlines.

- Finding: Notes should emphasize architecture competitions, iterative design analysis, and OpenClaw persona/profile document building.
- Confidence: High
- Evidence: Repeated presence across prior chats.
- Why it belongs in USER.md: These are the most assistance-relevant stable contexts.

- Finding: Context should note frequent use of the assistant for extracting structured insights from prior chats, PDFs, and external competition materials.
- Confidence: High
- Evidence: Multiple conversations are exactly this pattern.
- Why it belongs in USER.md: Helps future assistance start from the right assumptions.

# USER.md candidate

## Name
- Unknown / not explicitly stated.

## What to call them
- Not explicitly stated; use neutral direct address.

## Pronouns
- Not explicitly stated.

## Timezone
- Likely -0700 from project workspace context; treat as unconfirmed personal timezone.

## Notes
- Works repeatedly on architecture competition research and analysis, especially Home of Shadows.
- Has recurring OpenClaw meta-work: SOUL.md and USER.md style agent documents.
- Likely operates in an architecture/design-related domain or adjacent visual/creative strategy work.
- Frequently uses the assistant for structured extraction, analysis, reformatting, and reusable document drafting.

## Context
- Prefers help that preserves continuity across ongoing projects.
- Common tasks: analyzing briefs, extracting requirements, synthesizing jury comments, organizing prior-chat evidence, and drafting structured docs.
- Likely returns to topics iteratively, refining them over multiple chats.
- Most useful outputs are concise, structured, reusable, and grounded in available evidence.

