# Command Definitions

**Single Source of Truth for AI Agent Commands**

This directory contains the canonical definitions for all AI agent slash commands used in the project. All platform-specific command files (`.claude/commands/`, `.qwen/commands/`, etc.) are generated from these source files.

## Structure

```
.spec-core/commands/
├── README.md           # This file
├── plan.md            # Generate implementation plan
├── task.md            # Create task specifications
├── task-run.md        # Execute task implementation
│
└── [TODO: Migrate from .qwen/commands/]
    ├── prd.toml       # Product requirements definition
    ├── review.toml    # Code review command
    ├── tech.toml      # Technical specification
    └── ui.toml        # UI/UX specification
```

## Usage

### Editing Commands

**⚠️ Important**: When you need to modify a command:

1. **ONLY edit files in `.spec-core/commands/`** — this is the source of truth
2. Run generation script (TBD) to update platform-specific versions
3. Never edit `.claude/commands/` or `.qwen/commands/` directly

### Adding New Commands

1. Create new `.md` file in `.spec-core/commands/`
2. Follow the standard format (see existing commands as examples)
3. Run generation script to deploy to all platforms

## Command Format

All commands follow this Markdown structure:

```markdown
---
description: Brief description of what the command does
---

## User Input

\`\`\`text
$ARGUMENTS
\`\`\`

You **MUST** consider the user input before proceeding (if not empty).

## Context

[Context and prerequisites]

## Your Tasks

[Step-by-step instructions for the AI agent]

## Output Requirements

[Expected deliverables and format]

## Important Notes

[Additional guidelines and constraints]
```

## Available Commands

### `/plan`
**File**: `plan.md`
**Purpose**: Creates a detailed implementation plan (`./specs/plan.md`) based on project specifications (prd.md, tech.md, etc.)

**Key Features**:
- Breaks work into 5-12 milestone PRs
- Defines concrete deliverables and DoD for each PR
- Establishes dependency order

### `/task`
**File**: `task.md`
**Purpose**: Generates task specification documents for each PR milestone defined in the plan

**Key Features**:
- Creates `./specs/tasks/TASK-PR-XX.md` files
- Fills detailed task templates with capabilities, prerequisites, acceptance criteria
- Maintains referential integrity across specs

### `/task-run`
**File**: `task-run.md`
**Purpose**: Executes a specific task specification and delivers the implementation

**Key Features**:
- Auto-selects next incomplete task or accepts explicit task ID
- Follows implementation workflow with checks and validations
- Updates task document with progress and results

---

## Migration Status

### ✅ Migrated Commands (in `.spec-core/commands/`)
- `/plan` — Generate implementation plan
- `/task` — Create task specifications
- `/task-run` — Execute task implementation

### ⏳ Pending Migration (currently in `.qwen/commands/`)
These commands need to be migrated to `.spec-core/commands/` to become the single source of truth:

- `prd.toml` — Product requirements document generation
- `review.toml` — Code review and quality checks
- `tech.toml` — Technical specification generation
- `ui.toml` — UI/UX specification generation

### 📋 Platform-Specific Workflows
Some platforms use workflows instead of commands:
- `.windsurf/workflows/` — Windsurf-specific workflow definitions (if applicable)

## Platform Deployment

### Current Platforms

- **Claude Code** (`.claude/commands/*.md`) — Native Markdown format
- **Qwen** (`.qwen/commands/*.toml`) — TOML-wrapped Markdown
- **Windsurf** (`.windsurf/workflows/*`) — Workflow definitions (separate format)

### Generation (Planned)

```bash
# Generate all platform-specific commands from source
pnpm gen:commands

# Or manually
node .spec-core/scripts/generate-commands.js
```

## Principles

1. **Single Source of Truth**: `.spec-core/commands/` is the only place to edit command logic
2. **Platform Agnostic**: Core command logic is platform-independent
3. **Generated Artifacts**: Platform-specific files are build artifacts (can be gitignored or committed)
4. **Consistency**: All platforms receive identical command logic
5. **Maintainability**: Update once, deploy everywhere

## Migration Checklist

### Phase 1: Core Commands ✅
- [x] Migrate `/plan` to `.spec-core/commands/`
- [x] Migrate `/task` to `.spec-core/commands/`
- [x] Migrate `/task-run` to `.spec-core/commands/`
- [x] Create README documentation

### Phase 2: Remaining Commands (TODO)
- [ ] Migrate `prd.toml` → `prd.md`
- [ ] Migrate `review.toml` → `review.md`
- [ ] Migrate `tech.toml` → `tech.md`
- [ ] Migrate `ui.toml` → `ui.md`
