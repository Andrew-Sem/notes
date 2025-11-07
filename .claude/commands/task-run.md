---
description: Execute a Task spec and deliver the implementation
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Context

- Main working unit — files `./specs/tasks/TASK-PR-XX.md`, created from `.spec-core/templates/task-template.md`
- Follow standards from `docs/code-standards.md`, `docs/checks.md`, `.spec-core/llms.md`
- Use pnpm for any package/script commands
- Update related documentation (`docs/*`) if dependencies, configs or rules change

## Task Selection

### 1. Explicit Selection

- If argument passed and matches `TASK-PR-XX` or relative path, open corresponding file
- If directory/name specified without extension, convert to `./specs/tasks/<name>.md`
- Fail with error if file doesn't exist

### 2. Auto-selection (no argument passed)

- Read list of `./specs/tasks/TASK-PR-*.md`
- Sort by PR number (00 → 99) and take **last** file where there are uncompleted checkboxes:
  - Any `- [ ]` in sections `## Steps`, `## Checklist`, `## AI Checklist`
- If all tasks completed (no open checkboxes), stop and inform user

### 3. Record Task Information

Record `TASK_ID`, `PR_ID`, `file_path` for further steps

## Preparation

1. Read target task fully
2. Synchronize with related specs:
   - `specs/plan.md`: corresponding milestone/PR
   - `specs/prd.md`, `specs/tech.md`, `specs/ui-ux.md`, `specs/testing.md`, `specs/devops.md`
3. Check `Prerequisites` section:
   - Ensure listed artifacts and dependencies are fulfilled
   - If prerequisite not met — record block `[NEED CLARIFICATION: ...]` and stop until resolved
4. Record starting state: current checkbox values, key decisions, unclosed trade-offs

## Implementation Workflow

### 1. Planning

- For each step from `## Steps` create concrete action plan
- Clarify affected modules and artifacts (see `Related modules`, `Capability`, Deliverables in plan)

### 2. Implementation

- Execute steps in order, minimal atomic changes
- Follow architectural constraints and naming conventions from docs
- Update/create code, configs, infrastructure strictly per `artifacts.out`
- When new decisions appear, record them in `## Design notes` (add new entries or status of existing ones)

### 3. Related Changes

- If dependencies/configurations change, update corresponding documents and add to Docs index
- Synchronize changes with `specs/plan.md` if Deliverables or DoD are clarified

### 4. Testing and Checks

- Run necessary checks according to `docs/checks.md` (e.g., `pnpm biome check`, `pnpm test`)
- Reflect results: successful — in checklists, failures — create `Design notes`/`Trade-offs` with fix plan

### 5. AI Checklist

- Run `/review` minimum twice as required by `.spec-core/llms.md`
- Process all marks, ensure no unclosed `[NEED CLARIFICATION]`

## Updating the Task Document

1. Update `## Steps`, `## Checklist`, `## AI Checklist` — mark completed items `[x]`
2. If some items cannot be closed, leave `[ ]` and add explanation in `Trade-offs` or `Design notes`
3. If needed add `## Notes` section at end of file with brief execution log (date, responsible, PR link)
4. Ensure `Acceptance criteria` section matches implemented behavior (add actual values if needed)
5. Record capability closure status (e.g., mark readiness in `outcomes` text)

## Completion Checks

Before completing command ensure that:

- All artifacts from `artifacts.out` created or updated, references to them present
- `Trade-offs` either closed or have clear next_steps
- All relevant checkboxes marked, test results documented
- Related documents updated and listed in `References` if new ones appeared
- Brief message about task status exists (e.g., in new `## Notes` or `Design notes` block)

## Output Requirements

- Prepare working branch/PR with implemented changes (name per command format)
- In response to user list:
  - Main changes by steps
  - Checks run and their result
  - Updated documents/files
  - Remaining risks or open questions
- If task fully completed — explicitly state this; if not — record what prevents completion

## Error Handling

- If selected task doesn't exist or already fully closed, give clear message and suggest next one
- If dependency mismatch (prerequisites) — mandatory stop process and request clarification
- On test/lint failures:
  - Report which commands were run and what output
  - Add entries to `Trade-offs` / `Design notes` with fix plan
- If during process it became clear that task requires updating other specifications, first update them (via corresponding commands), then return to task
