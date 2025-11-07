---
description: Interactive document review workflow that scans docs for inconsistencies, ambiguities, and conflicts, asks one-by-one questions with A/B/C options, confirms changes, then applies all fixes in batch.
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
- Asks you one-by-one in chat to collect all resolutions
- Builds and presents a complete change plan for confirmation
- Applies all changes in batch after your approval
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
5. **Resolution Collection Phase** - Iterate through each issue one-by-one:
   - Show issue to user and ask for resolution choice
   - Fill in resolution placeholder in the issues file
   - **DO NOT apply changes yet** - only collect decisions
   - Move to next issue
6. **Confirmation Phase** - Build and confirm change plan:
   - Detect conflicts (multiple issues affecting same lines)
   - Resolve conflicts interactively with user
   - Present complete change plan with all conflicts resolved
   - Ask for final confirmation before applying any changes
7. **Implementation Phase** - Apply all changes:
   - Apply changes in order of issue numbers
   - Follow conflict resolution guidance from Confirmation Phase
   - Verify all changes were applied successfully
   - Show final result (not intermediate progress)
8. Provide summary of all changes applied
9. Mark review file as completed:
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

**CRITICAL:** This workflow operates in four distinct phases:
1. **Analysis Phase**: Create complete issues document first
2. **Resolution Collection Phase**: Collect user decisions for all issues (DO NOT apply changes)
3. **Confirmation Phase**: Show complete change plan and get final approval
4. **Implementation Phase**: Apply all changes after confirmation (batch application)

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

### Phase 2: Resolution Collection (Do Second)
9. ✅ Show user the review file path and contents
10. ✅ Iterate through each issue (high severity first):
    - Show issue and ask for resolution
    - Fill `[RESOLUTION: ]` placeholder with user choice
    - **DO NOT apply changes yet** - only collect decisions
    - Move to next issue
11. ✅ Verify all issues have resolutions (or marked as Skip)

**⚠️ NEVER proceed to Phase 2 until Phase 1 is 100% complete**

### Phase 3: Confirmation (Do Third)
12. ✅ Analyze all collected resolutions and build change plan:
    - List all files that will be modified
    - Show exact changes for each issue in order
    - Detect conflicts (multiple issues affecting same lines)
    - For each conflict, explain the issue and ask user how to resolve it
    - Get user's conflict resolution decisions before showing final plan
13. ✅ Present complete change plan to user (with all conflicts resolved)
14. ✅ Ask for final confirmation: "Apply all changes? (Yes/No/Review)"
15. ✅ If user says "Review", allow them to modify specific resolutions and rebuild plan

**⚠️ NEVER proceed to Phase 4 until user confirms the plan**

### Phase 4: Implementation (Do Fourth)
16. ✅ Apply all changes in order of issue numbers:
    - For each resolved issue (not skipped), apply changes to target document(s)
    - For cross-file issues, ensure consistent resolution across all affected files
    - Follow conflict resolution guidance from Phase 3
    - Verify each change was applied successfully (silent verification)
17. ✅ Show final result only (no intermediate progress)
18. ✅ Provide summary of all changes applied
19. ✅ Mark review file as completed:
    - Add "## COMPLETED" section at the end of the file
    - Rename file by adding `_COMPLETED` suffix (e.g., `2025-10-08_16-54-41_COMPLETED.md`)

**⚠️ NEVER proceed to Phase 4 until Phase 3 confirmation is received**

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

### 5a) Collect Resolutions for All Issues
**VALIDATION**: Confirm review file exists and has issues before starting

**CRITICAL FLOW**: Collect ALL resolutions first, DO NOT apply changes yet

For each issue (highest severity first):
- **READ**: Extract issue from review file by Issue #N
- **SHOW**: issue type, severity, summary, evidence (file:line with excerpt)
- **PROPOSE**: A/B/C options and "D) Other (provide text)" option
- **ASK**: "Choose A/B/C/D or write your own replacement. Reply 'Skip' to ignore."
- **VALIDATE**: User input matches A|B|C|D|custom text|Skip
- **UPDATE**: Fill `[RESOLUTION: chosen_option]` in review file using Edit tool
- **STORE**: Keep resolution in memory for later implementation
- **CONTINUE**: Move to next issue WITHOUT applying changes

**⚠️ DO NOT apply any changes during this phase - only collect user decisions**

### 5b) Confirm Complete Change Plan
**VALIDATION**: All issues have resolutions filled in review file

**BUILD CHANGE PLAN**:
1. **Parse all resolutions** from the review file
2. **For each non-skipped issue**, determine exact changes to be made:
   - Which file(s) will be modified
   - What content will be replaced
   - What new content will be inserted
3. **Detect conflicts**:
   - Check if multiple issues affect the same file:line
   - Identify overlapping changes
   - For each conflict, explain the issue and get user guidance:
     ```
     ⚠️ Conflict detected:
     - Issue #3 wants to change file1.md:45 from "A" to "B"
     - Issue #5 wants to change file1.md:45 from "A" to "C"

     How to resolve:
     a) Apply Issue #3 first, then Issue #5 (result: "C")
     b) Apply Issue #5 first, then Issue #3 (result: "B")
     c) Merge both changes (provide custom text)
     d) Skip one of the issues (specify which)

     Your choice: [wait for user input]
     ```
   - Store conflict resolutions for implementation
4. **Build ordered change list** (by issue number, with conflict resolutions applied)

**PRESENT FINAL PLAN TO USER** (after all conflicts resolved):
```
📋 Change Plan Summary

Files to be modified: [count] files
- file1.md: [count] changes (Issues #1, #3, #5)
- file2.md: [count] changes (Issues #2, #4)

⚠️ Conflicts resolved: [count]
- Issue #3 and #5 conflict → resolved as: [user's choice]

Detailed changes (in order of application):

Issue #1: [type][severity] Summary
  File: specs/prd.md:45
  Change: Replace "old text" with "new text"

Issue #2: [type][severity] Summary
  File: specs/api.md:12
  Change: Replace "old text" with "new text"

[... continue for all issues ...]
```

**ASK FOR CONFIRMATION**:
"Apply all [count] changes as shown above?
- Yes: Apply all changes
- No: Cancel and keep current state
- Review: Modify specific resolutions and rebuild plan"

**HANDLE USER RESPONSE**:
- If "Yes": Proceed to Phase 5c
- If "No": Exit workflow without applying changes
- If "Review": Allow user to specify which issues to re-resolve, then restart from 5a for those issues

**⚠️ DO NOT proceed to implementation until user confirms with "Yes"**

### 5c) Apply All Changes
**VALIDATION**: User has confirmed the change plan

**IMPLEMENTATION FLOW**:
For each issue (in order of issue numbers):
1. **Skip** if resolution is "Skip"
2. **Parse resolution** to understand what changes to make
3. **Apply changes** to target document(s):
   - For cross-file issues, apply changes consistently across all affected files
   - Use Edit tool for each change with proper context
   - For conflicts, follow the resolution guidance obtained during Phase 5b
4. **Verify** each change was applied successfully (silent verification - no output to user)
5. **Continue** to next issue

**SHOW FINAL RESULT ONLY** (not intermediate progress):
```
✅ Applied all changes successfully

Modified files:
- specs/prd.md: 3 changes
- specs/api.md: 2 changes
- specs/ui.md: 1 change

Issues resolved: [count]
Issues skipped: [count]
```

**⚠️ Only show final summary - do not show progress for each individual change**

### 6) Final Summary and Completion
**PROVIDE SUMMARY**:
- Present a compact change log:
  - Files changed and number of issues resolved per file
  - Total issues processed vs skipped
  - Brief description of major changes made
  - Any conflicts that were resolved during confirmation phase

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

### Issue Discussion Format (Phase 2: Collection):
- Title: [type][severity] Short summary
- Evidence: file:line — excerpt
- Options: A/B/C/D as listed in issues file
- Question: "Choose A/B/C/D or write your own replacement. Reply 'Skip' to ignore."

### Conflict Resolution Format (Phase 3: During Plan Building):
```
⚠️ Conflict detected:
- Issue #3 wants to change file1.md:45 from "A" to "B"
- Issue #5 wants to change file1.md:45 from "A" to "C"

How to resolve:
a) Apply Issue #3 first, then Issue #5 (result: "C")
b) Apply Issue #5 first, then Issue #3 (result: "B")
c) Merge both changes (provide custom text)
d) Skip one of the issues (specify which)

Your choice: [wait for user input]
```

### Change Plan Format (Phase 3: Final Confirmation):
```
📋 Change Plan Summary

Files to be modified: [count] files
- file1.md: [count] changes (Issues #1, #3, #5)
- file2.md: [count] changes (Issues #2, #4)

⚠️ Conflicts resolved: [count]
- Issue #3 and #5 conflict → resolved as: [user's choice]

Detailed changes (in order of application):
[List each change with file:line and exact text replacements]

Apply all [count] changes? (Yes/No/Review)
```

### Progress Updates:
**Phase 2 (Collection)**:
- "Issue #X resolved as: [chosen option]. Moving to next issue..."
- "Collected resolutions for [count] issues. Building change plan..."

**Phase 3 (Confirmation)**:
- "Analyzing collected resolutions..."
- "Conflict detected between Issue #X and Issue #Y. Resolving..."
- "All conflicts resolved. Building final change plan..."
- "Change plan ready. Awaiting your confirmation..."

**Phase 4 (Implementation)**:
- No intermediate progress shown
- Only final summary: "✅ Applied all changes successfully. [summary]"

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
   - **Resolutions are collected first, then all changes are applied in batch after confirmation**

3. **Change Plan Building:**
   - After all resolutions collected, parse the review file
   - Build a structured plan showing all changes to be made
   - Detect conflicts by checking if multiple issues modify same file:line
   - Present plan to user for confirmation before applying anything

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
- **Detection Phase**: During change plan building (Phase 3), detect if multiple issues affect same file:line
- **Reporting**: List all conflicts in the change plan with clear explanations:
  - Which issues are in conflict
  - What each issue wants to change
  - Why they conflict
- **Resolution**: Ask user for guidance on how to handle each conflict:
  - Apply changes in order (first issue wins)
  - Apply changes in reverse order (last issue wins)
  - Merge both changes manually (user provides combined text)
  - Skip one of the conflicting issues
- **Implementation**: Follow user's guidance during Phase 4 implementation

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
- [ ] All resolutions collected before building change plan
- [ ] Change plan built and conflicts detected
- [ ] User confirmed change plan before implementation
- [ ] All changes applied in batch after confirmation

After successful completion:
- [ ] All changes applied successfully
- [ ] Final summary shown (not intermediate progress)
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