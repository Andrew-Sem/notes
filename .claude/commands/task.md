---
description: Create a Task specification document
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Context

- Always reference `.spec-core/how-to-use-specs.md` and `.spec-core/llms.md` for general rules
- Use structure from `.spec-core/templates/structs/task.md` and template `.spec-core/templates/task-template.md`
- Base on actual documents in `./specs/` (prd, tech, plan, ui-ux, testing, devops). If document missing — record assumptions

## Your Tasks

### 1. Read Specifications

- `./specs/prd.md` — product context, goals, roles, key features
- `./specs/plan.md` — planned PRs and work sequence
- `./specs/tech.md` — architecture, modules, integrations, constraints
- `./specs/ui-ux.md` — user scenarios, mockups
- `./specs/testing.md` — quality and verification requirements
- `./specs/devops.md` — environments, CI/CD, infrastructure constraints

### 2. Prepare Task Directory

- Ensure `./specs/tasks/` folder exists; create if necessary
- From plan collect all milestones in format `PR-XX: ...`
- For each PR save:
  - `pr_id` (e.g., `PR-02`)
  - `category` and `title` from PR header
  - `purpose`, `deliverables`, `DoD`, `dependencies`

### 3. Generate Task Documents for Each PR

- For each `pr_id` create/update file `./specs/tasks/TASK-<pr_id>.md`
  - Example: `PR-00` → `./specs/tasks/TASK-PR-00.md`
- Copy into file contents of `.spec-core/templates/task-template.md`
- Use only ASCII characters in file names and identifiers

### 4. Fill Task Template for Each PR

#### References

- List only actually used documents, features, contracts, schemas, and links
- Synchronize list with artifacts from other specs (plan, tech, prd, ui-ux, testing, devops)

#### Header

- `id`: use format `TASK-PR-XX`
- `name`: brief name (≤ 60 chars), reflecting category and PR deliverable
- `description`: 1–2 sentences of context and main result
- `type`: one of (`spike`, `scaffold`, `feature`, `integration`, `hardening`, `qa`, `docs`, `ops`) — match with PR category
- `goal`: measurable target state, derived from Purpose and Deliverables
- `artifacts.in`: input dependencies (DoD from previous PRs, configs, migrations, features)
- `artifacts.out`: final artifacts (Deliverables from plan + additions from other specs)

#### Capability

- Create separate block for each new product capability or fix of existing one
- Fill `scope`, `actors`, `triggers`, `outcomes`, based on PRD, plan and tech doc
- Use identifier format `CAP-PR-XX-YY` to maintain connection with plan

#### Prerequisites

- List all external and internal dependencies without which task cannot start
- `internal` = `true` if prerequisite is team's responsibility; otherwise `false`
- Explain why prerequisite is needed and what happens without it

#### Trade-offs

- Record accepted compromises, especially if they affect SLA, security or DX
- For each `next_steps` describe how to remove compromise and expected result
- If no trade-offs, explicitly state this (`No trade-offs`)

#### Related modules

- Use list of modules and services from `tech.md` and `plan.md`
- For each module specify which schemas, APIs, events, configs are consumed
- If new module appears — describe its role and link with implementation plan

#### Design notes

- Document decisions, invariants, critical algorithms, alternatives
- Add links to discussions, PRs, diagrams
- Fill `status` (draft/approved/deprecated) and record impact on metrics

#### Acceptance criteria

- `functional`: key happy-path scenarios
- `non_functional`: requirements for performance, stability, security, UX
- `scenarios`: format in Given/When/Then style
- `negative`: describe errors, edge cases and expected system reaction
- `out_of_scope`: explicitly list what is out of task scope

#### Steps

- Break work into checklist of actions (steps + substeps), synchronize with Deliverables and DoD
- Each step should be verifiable and lead to concrete artifact

#### Checklist

- Consolidate measurable checks covering Acceptance criteria and critical risks
- Avoid duplication with Steps; these are final validations before task closure

#### AI Checklist

- Base on `.spec-core/llms.md`, adapt items for task
- Mandatory confirm execution of `/review` (two runs) and processing of marks

## Output Requirements

- For each PR from `specs/plan.md` must be created/updated file `./specs/tasks/TASK-PR-XX.md`
- Each Task document filled per structure `.spec-core/templates/task-template.md` without placeholders like `[fill me]`
- All checkboxes/lists format in Markdown, suitable for reading and diff
- Ensure identifiers (capabilities, prerequisites, checks) are unique and consistent with other documents

## Important Notes

- If data insufficient, mark block `TODO` or ask user question, but don't leave section empty
- Record assumptions and risks directly in document
- Check referential integrity: all links and identifiers must exist or be justified
