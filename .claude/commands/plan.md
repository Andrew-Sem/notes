---
description: Create implementation plan based on project specs
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Context

- User may provide additional context or specific requirements in `$ARGUMENTS`
- Always reference `.spec-core/llms.md` to understand how to work with spec files
- Read all available spec files in `./specs/` directory (prd.md, tech.md, ui-ux.md, testing.md, devops.md)

## Your Tasks

### 1. Read Specifications

- Start with `./specs/prd.md` — extract high-level requirements, project init steps, main modules to create
- Read `./specs/tech.md` (if exists) — extract architecture, data models, APIs, integrations, dependencies
- Read `./specs/ui-ux.md` (if exists) — extract UI components, user flows
- Read `./specs/testing.md` (if exists) — extract testing requirements for DoD
- Read `./specs/devops.md` (if exists) — extract deployment requirements

### 2. Copy Template

Copy `.spec-core/templates/plan-template.md` to `./specs/plan.md`

### 3. Fill Plan Template

#### Milestones Section (CRITICAL)

Break work into 5-12 PRs following these principles:

**Ordering (dependency-based)**:

1. Bootstrap/Setup (PR-00) — project init, tooling, CI basics
2. Foundation — data models, schemas, core infrastructure
3. Authentication/Security — if needed
4. Core Features — business logic, main functionality
5. Integrations — external services, APIs
6. UI/Frontend — if applicable
7. Admin/Monitoring — admin tools, logging
8. Testing/QA — comprehensive tests
9. Deployment — CI/CD, production setup

**For Each Milestone (PR-XX)**:

- **Purpose**: One sentence explaining WHY this work matters or what it unblocks
  Example: "Establishes data foundation needed by all features"

- **Deliverables**: Concrete artifacts that will exist in codebase
  Examples:
  * Backend: "Table `users` with fields X, Y, Z", "Function `auth.login()` in `auth.ts`", "Endpoint `POST /api/alerts`"
  * Frontend: "Component `<AlertCard />` in `components/`", "Page `/dashboard` with routing"
  * Infra: "File `.env.example` with keys A, B, C", "Migration `001_init.sql`"
  * Config: "CI pipeline in `.github/workflows/test.yml`"

  DELIVERABLES = FILES/CODE/COMPONENTS THAT WILL BE CREATED

- **DoD** (Definition of Done): Specific actions that verify deliverables work
  Examples:
  * "Can run `npm start` and app loads without errors"
  * "Can POST to `/api/alerts` and receive 201 with alert ID"
  * "Function `auth.login(secret)` returns valid JWT"
  * "Component `<AlertCard />` renders with mock data in Storybook"
  * "Migration applies successfully, table `users` exists in DB"

  DoD = ACTIONS YOU CAN PERFORM TO VERIFY IT WORKS

- **Dependencies**: List PR numbers this depends on (if any)
  Example: "Depends on PR-01 (needs database schema)"

**Granularity Rules**:

- Each PR = 1-3 days of work
- Each PR should be independently testable
- Each PR should be deployable (or at least runnable in isolation)
- If a milestone is too large (>3 days), split it into multiple PRs

**Milestone Naming**:

Use pattern: `PR-XX: [Layer/Category] - [Brief description]`

Examples:
- `PR-00: Bootstrap - Project initialization`
- `PR-01: Data Layer - Core schemas`
- `PR-02: Auth - JWT authentication`
- `PR-03: API - Detection ingestion`
- `PR-04: Integration - Push notifications`

#### References Section

List all relevant spec files that exist (don't list missing ones)

## Output Requirements

- Fill `./specs/plan.md` completely
- Do NOT leave placeholder text like "[fill this]"
- Each milestone must have:
  * Clear Purpose (one sentence)
  * 2-5 concrete Deliverables (specific files/components/functions)
  * Clear DoD (2-4 verifiable actions)
- Milestones must follow dependency order
- Total 5-12 milestones (adjust based on project complexity)
- Be specific: use actual file names, function names, table names from specs

## Important Notes

- If a spec file is missing, make reasonable assumptions
- Focus on CONCRETE deliverables, not vague tasks
- DoD should be TESTABLE actions, not "code is written"
- Order milestones by dependencies: foundation before features
- Each milestone should deliver value or unblock next work
