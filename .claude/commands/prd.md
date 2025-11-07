---
description: Create PRD based on request
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Context

- The text the user typed after `/prd` in the triggering message **is** the feature description
- Assume you always have it available in this conversation even if `$ARGUMENTS` appears literally
- Do not ask the user to repeat it unless they provided an empty command
- `$ARGUMENTS` can be files that contain description of the product

## Your Tasks

### 1. Copy Template

Copy `.spec-core/templates/prd-template.md` to `./specs/prd.md`

### 2. Fill PRD Template

Fill the template with the given product description, ensuring all sections are completed:

- **Project Overview**: What the product does and why it exists
- **Goals & Success Metrics**: Measurable objectives and KPIs
- **User Stories**: Who will use it and what they need to accomplish
- **Functional Requirements**: What the system must do
- **Non-Functional Requirements**: Performance, security, accessibility requirements
- **Out of Scope**: What explicitly won't be included in this version

## Operating Constraints

**Important considerations for meditation apps:**

- Include sound notifications for session start and end (gentle chimes, bells, or nature sounds)
- Specify audio feedback requirements for meditation guidance and transitions
- Consider user preferences for notification sounds and volume control
- Include accessibility requirements for hearing-impaired users (visual alternatives to audio cues)

## Output Requirements

- Fill `./specs/prd.md` completely
- Do NOT leave placeholder text like "[fill this]" or "TODO"
- Be specific and concrete in all requirements
- Include measurable success criteria
- Clearly define what's in scope and out of scope
- Use the product description from `$ARGUMENTS` as the foundation

## Important Notes

- If the user provides a file path in `$ARGUMENTS`, read that file first to get the product description
- Focus on WHAT needs to be built, not HOW to build it (that's for tech spec)
- Write from the user/business perspective, not technical implementation
- Ensure requirements are testable and verifiable
