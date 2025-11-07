---
description: Interactive document review workflow that scans docs for inconsistencies, ambiguities, and conflicts, asks one-by-one questions with A/B/C options, and implements fixes.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

This workflow reviews one or more documents for issues and guides you through resolving them step-by-step. It:
- Detects inconsistencies, ambiguities, and conflicts within and across documents
- Identifies cross-file disagreements in terminology, requirements, and specifications
- Shows concrete evidence (citations with file:line) for all issues
- Proposes options (A/B/C/...) to resolve each issue consistently across files
- Asks you one-by-one in chat
- Summarizes changes at the end

## Usage
- Slash command: `/review <doc_or_glob> [more_docs...]`
- Examples:
  - `/review specs/prd.md` (single document review)
  - `/review specs/prd.md specs/ui.md` (cross-document consistency check)
  - `/review specs/*.md` (review all markdown files for consistency)
  - `/review specs/prd.md docs/api.md specs/ui.md` (multi-file consistency analysis)

Arguments:
- doc_or_glob: One or more file paths or globs to review for internal issues and cross-file consistency
- **Default**: If no arguments provided, reviews all files in `specs/*` directory

## High-Level Flow
1. Collect inputs and resolve file list
2. Read all target docs
3. Run comprehensive analysis and create full Issue List in specs/review/[timestamp].md
4. Present the complete issues file with template placeholders for resolutions
5. Iterate through each issue one-by-one:
   - Show issue to user and ask for resolution choice
   - Fill in resolution placeholder in the issues file
   - **IMMEDIATELY implement the fix to target document(s)**
   - Verify the fix was applied successfully
   - Show user what was changed
   - Move to next issue
6. Provide summary of all changes applied
7. Mark review file as completed:
   - Add "## COMPLETED" section at the end
   - Rename file by adding `_COMPLETED` suffix (e.g., `2025-10-08_16-54-41_COMPLETED.md`)

## Checks (Issue Detectors)
- type: ambiguity | inconsistency | conflict | missing_info | terminology | numbering | duplication | privacy | compliance | cross_file_conflict | cross_file_inconsistency
- severity: high | medium | low
- file:line citations (multiple files for cross-document issues)
- proposed options (A/B/C/Other) with consistent resolution across files

### Cross-File Issue Types:
- **cross_file_conflict**: Contradictory statements between documents
- **cross_file_inconsistency**: Different terminology or formatting for same concepts
- **missing_cross_reference**: One document references something not defined in related docs
- **outdated_reference**: Cross-document references that are no longer accurate
- **scope_overlap**: Multiple documents covering same functionality with different approaches

## Operating Constraints

**CRITICAL:** This workflow operates in two distinct phases:
1. **Analysis Phase**: Create complete issues document first
2. **Resolution Phase**: For each issue, get user decision and implement fix immediately (don't batch)

## Quick Execution Checklist

### Phase 1: Analysis (Do First)
1. ✅ Validate all target files exist and are readable
2. ✅ Create specs/review/ directory if needed
3. ✅ Read all target documents completely
4. ✅ Generate timestamp: `YYYY-MM-DD_HH-MM-SS`
5. ✅ Analyze documents for internal issues and cross-file consistency
6. ✅ Cross-reference terminology, requirements, and specifications between files
7. ✅ Write complete specs/review/[timestamp].md with ALL issues (single-file and cross-file)
8. ✅ Verify file was created and contains all placeholders

### Phase 2: Resolution (Do Second)
9. ✅ Show user the review file path and contents
10. ✅ Iterate through each issue (high severity first):
    - Show issue and ask for resolution
    - Fill `[RESOLUTION: ]` placeholder with user choice
    - **IMMEDIATELY apply the fix to target document(s)** (don't wait for all issues)
    - For cross-file issues, ensure consistent resolution across all affected files
    - Verify change was applied successfully
    - Show user what was changed
    - Move to next issue (don't ask multiple questions before implementing)
11. ✅ Provide summary of all changes applied
12. ✅ Mark review file as completed:
    - Add "## COMPLETED" section at the end of the file
    - Rename file by adding `_COMPLETED` suffix (e.g., `2025-10-08_16-54-41_COMPLETED.md`)

**⚠️ NEVER proceed to Phase 2 until Phase 1 is 100% complete**

### 1) Resolve files
- **Default behavior**: If no arguments provided, use `specs/*` (all files in specs directory)
- Expand globs to concrete files
- Filter to supported text formats (md, txt, rst, mdx, yaml)
- For multiple files, prioritize cross-document consistency checking

### 2) Read docs
- Use the file read tool to load full files (not partial ranges) for accurate context

### 3) Analyze and Create Complete Issues File
**MANDATORY FIRST STEP**: Before any user interaction, create the full review document:

#### Single-File Analysis (for each document):
- Identify missing information that needs clarification
- Scan for ambiguity of logic
- Cross-check for contradictions within sections

#### Cross-File Analysis (when multiple documents):
- **Terminology Consistency**: Check for same concepts using different terms
- **Requirements Alignment**: Verify specifications don't contradict between files
- **Cross-References Validation**: Ensure referenced items exist in related documents
- **Scope Boundaries**: Identify overlapping or conflicting functionality definitions
- **Version Synchronization**: Check for outdated references between documents

#### File Creation:
- **IMMEDIATELY CREATE THE FILE**: Use Write tool to create specs/review/[timestamp].md
- Generate timestamp: `date +"%Y-%m-%d_%H-%M-%S"`
- Ensure specs/review/ directory exists (create with mkdir -p if needed)
- Write complete issues file using the template format with all issues found
- Each issue includes: type, severity, evidence (with file:line for all affected files), proposed options A/B/C, and resolution placeholder
- **DO NOT** start asking user questions until this file is complete and saved

### 4) Present Complete Issues File
- **VERIFY FILE EXISTS**: Use Read tool to confirm specs/review/[timestamp].md was created
- Show the user the created file path and its contents
- Explain that we'll go through each issue to get their resolution choice
- Confirm the file contains all issues found before proceeding
- Each issue has a `[RESOLUTION: ]` placeholder to be filled

**Example workflow execution:**
```bash
# 1. Create directory
mkdir -p specs/review

# 2. Generate timestamp and create file
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")
# Use Write tool to create specs/review/$timestamp.md with full content

# 3. Show user the file was created
echo "Created review file: specs/review/$timestamp.md"
# Use Read tool to display file contents to user
```

### 5) Iterate Through Issues One-by-One with Immediate Implementation
**VALIDATION**: Confirm review file exists and has issues before starting

**CRITICAL FLOW**: For each issue, IMPLEMENT immediately after getting user choice:

For each issue (highest severity first):
- **READ**: Extract issue from review file by Issue #N
- **SHOW**: issue type, severity, summary, evidence (file:line with excerpt)
- **PROPOSE**: A/B/C options and "D) Other (provide text)" option
- **ASK**: "Choose A/B/C/D or write your own replacement. Reply 'Skip' to ignore."
- **VALIDATE**: User input matches A|B|C|D|custom text|Skip
- **UPDATE**: Fill `[RESOLUTION: chosen_option]` in review file using Edit tool
- **🔥 IMPLEMENT NOW**: Apply the fix to target document(s) IMMEDIATELY
  - Parse the resolution to understand what changes to make
  - For cross-file issues, apply changes consistently across all affected files
  - Use Edit tool for each change with proper context
  - **VERIFY**: Read back each modified section to confirm success
  - **SHOW USER**: Display what was changed (file:line and the edit made)
- **CONTINUE**: Move to next issue

**⚠️ DO NOT collect all resolutions first - implement each one immediately after user confirms**

### 6) Final Summary and Completion
**PROVIDE SUMMARY**:
- Present a compact change log:
  - Files changed and number of issues resolved per file
  - Total issues processed vs skipped
  - Brief description of major changes made

**MARK AS COMPLETED**:
- Add "## COMPLETED" section at the end of the review file
- Include completion timestamp
- Rename the review file by adding `_COMPLETED` suffix before `.md` extension
  - Example: `specs/review/2025-10-08_16-54-41.md` → `specs/review/2025-10-08_16-54-41_COMPLETED.md`
- **DO NOT delete the review file** - it serves as a permanent record

## Interaction Templates

### Issues File Template (specs/review/[timestamp].md)
```markdown
# Review Issues - [timestamp]

**Target Documents:** [list of analyzed files]
**Total Issues Found:** [count] (High: [count], Medium: [count], Low: [count])
**Cross-File Issues:** [count] 

---

## Issue #1: [inconsistency][medium] User authentication terminology differs between files
**Files:** specs/prd.md:45, specs/api.md:12, specs/ui.md:67
**Evidence:**
```
specs/prd.md:45: "Users must sign in with their credentials"
specs/api.md:12: "Authentication requires user login via POST /auth"  
specs/ui.md:67: "Login form for user authentication"
```

**Options:**
- A) Standardize on "sign in" terminology across all files
- B) Standardize on "login" terminology across all files
- C) Standardize on "authentication" terminology across all files
- D) Other (custom resolution)

**Resolution:** [RESOLUTION: ]

---

## Issue #2: [cross_file_conflict][high] Contradictory user permission requirements
**Files:** specs/prd.md:78, specs/api.md:156
**Evidence:**
```
specs/prd.md:78: "Admin users can delete any project"
specs/api.md:156: "DELETE /projects/{id} requires project owner or super-admin role"
```

**Options:**
- A) Allow admins to delete any project (update API spec)
- B) Restrict to project owners and super-admins only (update PRD)
- C) Create new "project-admin" role with delete permissions
- D) Other (custom resolution)

**Resolution:** [RESOLUTION: ]

---

## Issue #3: [missing_cross_reference][medium] UI references undefined API endpoint
**Files:** specs/ui.md:34, specs/api.md (missing)
**Evidence:**
```
specs/ui.md:34: "Export button calls GET /api/export/projects endpoint"
specs/api.md: No definition found for /api/export/projects endpoint
```

**Options:**
- A) Add missing endpoint definition to API spec
- B) Remove export functionality from UI spec
- C) Change to existing endpoint (specify which one)
- D) Other (custom resolution)

**Resolution:** [RESOLUTION: ]

---

[Repeat for each issue...]

---

## COMPLETED

**Completed at:** [timestamp]
**Total Issues:** [count]
**Issues Resolved:** [count]
**Issues Skipped:** [count]
**Files Modified:** [list of files]
```

### Issue Discussion Format:
- Title: [type][severity] Short summary
- Evidence: file:line — excerpt
- Options: A/B/C/D as listed in issues file
- Question: "Choose A/B/C/D or write your own replacement. Reply 'Skip' to ignore."

### Progress Updates:
- "Issue #X resolved as: [chosen option]. Applying fix..."
- "Applied changes to [file:line]. Moving to issue #Y..."
- "All issues processed. Review complete."

## Implementation Details

### Issues File Processing
1. **Creation Phase:**
   - Use timestamp format: YYYY-MM-DD_HH-MM-SS
   - Ensure specs/review/ directory exists (create if needed)
   - Write complete issues file with all placeholders before starting user interaction

2. **Resolution Tracking:**
   - Each issue gets unique ID: Issue #1, Issue #2, etc.
   - Resolution placeholder format: `**Resolution:** [RESOLUTION: ]`
   - Valid resolution states: A, B, C, D, custom text, SKIP
   - **Changes are applied immediately after each resolution** (not batched at the end)

### File Change Management
- Always include 3+ lines of stable pre/post context for patches
- Never import code in the middle of files
- Prefer minimal edits; do not reflow unrelated content
- Keep terminology consistent throughout the doc set
- If a term is renamed, search-and-replace safely with review
- Verify each change by re-reading the modified section

### Error Handling
- If issues file creation fails, abort workflow
- If user provides invalid resolution, re-ask with valid options
- If implementation of a specific fix fails, report the failure and continue to next issue
- Always preserve the issues file as a record of the review session

## Edge Cases and Validation

### No Issues Found
- Still create the review file with "No issues detected" message
- Include analysis summary of what was checked
- Ask user if they want to proceed with manual review

### Large Number of Issues (>20)
- Group similar issues together in the review file
- Ask user if they want to process by severity level first
- Offer option to focus on high-severity issues only

### File Access Issues
- If target document is read-only, notify user before starting
- If specs/review/ cannot be created, suggest alternative location
- If timestamp conflicts occur, append random suffix

### Invalid User Input During Resolution
- Accept only: A, B, C, D, custom text, or "Skip"
- Re-prompt with valid options if input doesn't match
- Provide examples of valid custom text format

### Conflicting Changes
- If multiple issues affect same line, group them in review file
- Present combined resolution options when possible
- Warn user about potential conflicts before implementation

### Partial Implementation Failures
- If a fix fails to apply, log the error in the review file
- Mark the issue as failed but continue with remaining issues
- Provide rollback instructions for successfully applied changes if needed
- **DO NOT mark as COMPLETED** if any implementation fails - preserve review file for debugging and retry

### Empty or Malformed Target Documents
- Skip files that cannot be parsed
- Report skipped files in review document
- Continue with remaining valid files

## Pre-Flight Validation Checklist

Before starting analysis:
- [ ] All target files exist and are readable
- [ ] specs/review/ directory can be created/written to
- [ ] Target files are supported formats (md, txt, rst, mdx, yaml)
- [ ] No files are currently being edited by other processes

During execution:
- [ ] Review file created successfully
- [ ] All issues have unique IDs
- [ ] All placeholders properly formatted
- [ ] User understands the process before starting resolutions
- [ ] Each fix is applied immediately after user confirms resolution

After successful completion:
- [ ] All changes applied successfully
- [ ] "## COMPLETED" section added to review file
- [ ] Review file renamed with `_COMPLETED` suffix
- [ ] Summary provided to user

## Prioritization
- High: contradictions, legal/privacy gaps, payout/finance conflicts
- Medium: ambiguous requirements, missing defaults/owners, undefined thresholds
- Low: numbering/typos, style inconsistencies

## Notes
- The workflow is content-agnostic and works for specs, RFCs, and policies
- It can span multiple files and reconcile cross-document conflicts
- All configurable values should be referenced as "defined in configuration" unless explicitly fixed by business decision
- **Review Record**: Review files in specs/review/ are kept as permanent records and marked COMPLETED when done
- **Failure Handling**: Review files are preserved if implementation fails for debugging purposes