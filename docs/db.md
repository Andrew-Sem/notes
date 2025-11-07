# Database Best Practices

## DB interaction

* Prefer an ORM that gives **end-to-end type safety**.
* **Always use migrations** to change schema; keep them in the repo and reviewed.

## Modeling & relations

* **IDs**: use surrogate keys (**UUID v7** or `bigserial`); also enforce natural unique keys where needed (e.g., `email`, `external_id`).
* **Normalize first, denormalize later**: aim for 3NF; denormalize selectively for reads.
* **Favor 1\:N over raw M\:N**. If M\:N is needed, use an **explicit join table** with its own PK, FKs, indexes, and domain fields (role, status, valid\_from/to). Avoid hiding M\:N in arrays/JSON.
* **Polymorphic relations**: prefer a **type-specific join table** or a **shared supertable** with FK rather than `target_type + target_id`.
* **EAV is an anti-pattern**. If flexibility is required, use bounded `JSONB` fields plus `CHECK`/validation.
* **ENUM vs lookup**: for frequently changing sets use a **lookup table**; for stable sets you may use **ENUM**, mindful of migrations.

## Schema & constraints

* `NOT NULL` by default; use meaningful defaults.
* Define FKs with explicit **`ON DELETE/UPDATE` policy** (RESTRICT / SET NULL / CASCADE).
* Use **UNIQUE** (incl. **partial unique**) indexes to encode business invariants (e.g., “one active per user”).
* Add **CHECK** constraints for domain rules (ranges, formats).
* Naming: `snake_case`; singular table names; FK columns as `table_id`; consistent index names.

## Indexing & performance

* Index common **filters/joins** (BTREE on FKs, status, created\_at).
* Design **composite indexes** in selectivity order; avoid redundant duplicates.
* Prefer **keyset/seek pagination** over `OFFSET` for large datasets.

## Transactions & concurrency

* Use explicit **transactions** for multi-step operations; typical isolation: Read Committed / Repeatable Read.
* **Optimistic locking** via `version` / `updated_at`.
* **Pessimistic** patterns like `FOR UPDATE SKIP LOCKED` for workers/queues.
* **Idempotency keys** for retried/external requests.

## Migrations & evolution

* **Timestamped migrations**; code and schema changes are versioned together.
* **Zero-downtime flow**: add → backfill → switch reads/writes → remove old; separate backward-compatible changes from removals.
* Backfills in **batches** with throttling; create large indexes **concurrently**.

## Data lifecycle

* **Soft delete** with `deleted_at` + partial unique indexes (`WHERE deleted_at IS NULL`) when history matters; otherwise hard delete + archive.
* **Audit** in a separate table (who/when/what); log payload/diff for critical paths.
* Define **retention** and automate cleanups.

## Denormalization & cache

* **Materialized views** (consider `CONCURRENTLY`) for heavy aggregates.
* **Redis cache**: TTL + event-based invalidation; never make cache the source of truth.

## Practical patterns instead of “anti-M\:N”

* **Associative entity** when the relation has attributes (role/labels/order/intervals).
* **Ownership + history**: current FK in the main table, past relations in a history table.
* **Ordered lists**: join table + `position` with partial unique `(list_id, position)`.
* **Tags**: `items`, `tags`, and `item_tags(item_id, tag_id)` with a UNIQUE on `(item_id, tag_id)` and indexes on both FKs.

## Anti-patterns (avoid)

* Catch-all EAV; single “mega-table”.
* Unconstrained polymorphic FKs (`type/id`) with no referential safety.
* Arrays/JSON of FKs instead of proper relations.
* Overusing `TEXT` instead of domain types/lengths.
* Enforcing integrity **only** in application code (no FK/CHECK).
* Premature sharding/partitioning “just in case”.
* Missing FK indexes.

## Types & IDs

* Prefer **UUID v7** (monotonic, index-friendly) or `bigserial` (optionally with shard prefix).
* Status fields: `status TEXT` + `CHECK` or lookup table (more flexible than ENUM).
* Use `timestamptz` everywhere; don’t store local time.