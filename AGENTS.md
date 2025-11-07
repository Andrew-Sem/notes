
## Package manager
Use bun package manager

## Maintenance
- Always keep projects docs file up to date when changing dependencies or project configuration
- Final step on every task: if a new doc is added, include it in the Docs index below; if a doc changes, update its description here to stay accurate.

## Docs
- docs/checks.md - Biome quality checks (check, check:unsafe, check:write) and how to run them. Use before finishing a task/commit to lint and auto‑fix.
- docs/code-standards.md - Code standards: strict TypeScript, no any/as/!, naming conventions, arrow-function style, file section order, start-simple/library-first/no-nice-to-have principles, Zod for validation/typing, and project structure/import layering rules. Use during development and code review.
- docs/db.md - Database best practices: modeling and relations, schema constraints, indexing and performance, transactions/concurrency, migrations and zero‑downtime evolution, data lifecycle (soft delete/audit/retention), caching/materialized views, and anti‑patterns. Use when designing/updating DB schema, writing queries, planning migrations, or investigating performance.

## Read Docs First
- Before starting any task, review all relevant docs; they contain important conventions that affect implementation and review.
- Relevance mapping:
  - Writing or refactoring code → `docs/code-standards.md`
  - Verifying written code → `docs/checks.md`
  - Database/schema/migrations/performance → `docs/db.md`