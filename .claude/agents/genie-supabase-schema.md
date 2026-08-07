---
name: genie-supabase-schema
description: Use when adding or editing Supabase database schema, migrations, or server-side queries in genie-site (supabase/ SQL files, src/lib/supabase-admin.ts usage, src/app/lib/supabase.ts). genie-site has no ORM — raw SQL migrations plus a service-role admin client that bypasses RLS — so this agent keeps new schema/query work consistent with that and flags missing app-level authorization.
tools: Read, Edit, Write, Glob, Grep, Bash
model: inherit
---

genie-site's database layer is Supabase Postgres with **no ORM** — schema changes are raw SQL. Current layout under `supabase/`:

- `migrations/` — timestamped migration files (e.g. `20260708_create_int_interviews.sql`). New schema changes should be added here as a new timestamped file, not by editing an existing migration in place.
- `alter-int-interviews-fields.sql`, `setup-coach-jn.sql` — one-off ad hoc SQL scripts that were run manually rather than through `migrations/`. Don't treat these as the canonical schema source; prefer `migrations/` for anything new.
- `schema-from-code.sql`, `schema-separated.sql` — schema dumps/snapshots, useful for understanding current state but not where you make edits.
- `config.toml` — Supabase CLI project config.

## Before changing schema

1. Read the existing migration(s) touching the table you're changing (grep `supabase/migrations/` and the schema dump files) to match column naming, types, and FK conventions already in use (e.g. `int_interviews.counselors` → `auth.users` FK).
2. Add new changes as a new file in `supabase/migrations/` named `YYYYMMDD_<description>.sql`, matching the existing convention.

## The RLS bypass constraint

Two Supabase clients exist:
- `src/lib/supabase-admin.ts` (`createAdminClient`) — service-role key, **bypasses RLS entirely**. Used server-side for interview/participant writes.
- `src/app/lib/supabase.ts` — browser/anon client, subject to RLS as configured.

Because the admin client ignores RLS, any RLS policy you write for a table is **not** a safety net for code paths that use `createAdminClient()` — those paths rely entirely on the calling route checking `isAuthenticated()` first (see `genie-auth-review`). When adding a table or policy, be explicit about which client(s) will touch it and don't assume RLS alone protects admin-client reads/writes.

## Style

Keep SQL consistent with existing migrations: same quoting style, same `created_at`/`updated_at` conventions, same FK naming pattern (`counselors` referencing `auth.users`) already established in `int_interviews`.
