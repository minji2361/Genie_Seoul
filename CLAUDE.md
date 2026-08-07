# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

GENIE — a youth community platform for Jungnang-gu, Seoul (genie-land.com). The app is two things bolted together in one Next.js project:

1. A **public marketing site** (Korean copy): home, `/program` listing + `/program/[id]` detail.
2. A **private coaching dashboard** (`/dashboard`, `/interview`, `/admin`) for staff to manage participants ("코칭 대상자"), run structured interviews, and administer psychological assessments (attachment style, core emotion, four/six-types, lifegraph, personality tests).

## Stack

- Next.js **14.2.5** (App Router), React **18**, TypeScript **5**, Tailwind **3.4.1**
- Supabase (Postgres) — no ORM, raw SQL migrations
- Deployed on Vercel

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm start        # run production build
npm run lint     # next lint
```

There is no test suite configured in this repo.

## Environment

Copy `.env.example` to `.env.local` and fill in values; on Vercel the same keys must be set in Project → Settings → Environment Variables and the app redeployed. Key variables:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase project API.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, bypasses RLS; used for interview/participant writes via `src/lib/supabase-admin.ts`.
- `ADMIN_ID`, `ADMIN_PASSWORD`, `SESSION_SECRET` — coach/admin login (see Auth below). `.env.example` currently has real-looking (non-placeholder) values checked into git — treat as compromised and rotate before relying on them.

## Architecture

### Two independent auth systems — don't conflate them

1. **Custom admin session** (`src/lib/auth.ts` + `middleware.ts`): an HMAC-SHA256 signed cookie (`genie_admin_session`, 12h expiry) validated with `timingSafeEqual`. Single shared admin identity from `ADMIN_ID`/`ADMIN_PASSWORD` env vars, not per-user accounts.
2. **Supabase Auth**: used only so `int_interviews` rows can carry a `counselors` FK to `auth.users`. It does not gate route access.

`middleware.ts`'s matcher only covers `/dashboard/:path*`, `/interview/:path*`, `/login` — **it does not cover `/api/**`**. Every API route handler under `src/app/api/` must call `isAuthenticated()` itself if it should require login; check for that when adding a new route rather than assuming middleware protects it.

### Data layer: no ORM, and the admin client bypasses RLS

`supabase/` holds raw SQL: `migrations/` (timestamped, canonical), plus older ad hoc scripts (`alter-int-interviews-fields.sql`, `setup-coach-jn.sql`) and schema dumps (`schema-from-code.sql`, `schema-separated.sql`) that are references, not editable sources.

Two Supabase clients exist and are not interchangeable:
- `src/lib/supabase-admin.ts` (`createAdminClient`) — service-role key, **bypasses RLS entirely**. Any table/query it touches has no DB-level authorization; the calling route must enforce `isAuthenticated()` itself.
- `src/app/lib/supabase.ts` — browser/anon client, subject to RLS.

### Assessment pages follow one repeated shape

Each test lives under `src/app/dashboard/participant/[id]/<test-name>/` (`attachment-test`, `core-emotion-test`, `fourtypes`, `sixtypes`, `lifegraph`, `personality-test`, `personality-test2`):

- `page.tsx` — questionnaire the coach fills in.
- `results/page.tsx` — scores the stored answers and renders them, usually with `chart.js` / `react-chartjs-2`.
- `results/AnswerDetails.tsx` — present once a results page also needs a full per-question breakdown (split out on some tests, e.g. `attachment-test`, `personality-test`, `personality-test2`).

Scoring logic is kept local to each test's results page rather than shared across tests — the rules differ enough per test that past additions haven't abstracted this. When adding a new test type, copy the structure of the closest existing one rather than inventing a new shape.

Other assessment-flow pieces: `signature_pad` for consent capture (`src/app/api/participant/upload-signature/route.ts`), `html-to-image` for exporting result cards as images.

### Public-site typography and responsive rules are convention-driven

`.cursor/rules/apple-sd-gothic-neo-fonts.mdc` and `.cursor/rules/intro-photo-responsive.mdc` define the actual design system for `src/components/*Section.tsx`:

- Only ever apply **one** `font-apple*` utility (Thin/Medium/SemiBold/ExtraBold/HB) per element — never combine with Tailwind's own `font-bold`/`font-medium`, which causes synthetic bold. `font-appleHB` (weight 900) uses `AppleSDGothicNeoH.ttf` — there is no separate HB file.
- Custom breakpoints (`tailwind.config.ts`): `tablet: 768px`, `desktop: 1440px`, plus ad hoc `max-[390px]:` for small-mobile overrides. Reuse the lettered sizing tiers in the `.mdc` file for a given role (banner title, section heading, label, body copy) rather than deriving new sizes.
- Mobile-only composited PNGs (design baked into one image, no separate tablet/desktop asset) use a fixed-aspect-ratio box: 100% width on mobile, capped at half the image's native width on tablet/desktop (never `w-1/2`, which grows unbounded on large screens).
- Brand colors/screens live in `tailwind.config.ts` under `theme.extend` (`genie.purple`, `genie.yellow`, `genie.lavender`).

## Git

Never run `git commit` or `git push` automatically — both require explicit user confirmation each time, even after prior approval in the same session. This repo deploys straight to Vercel on push, so an unwanted commit that later gets pushed can ship directly to production.

## Custom subagents

`.claude/agents/` has four project-specific subagents — prefer delegating to these over general-purpose editing when the task matches:

- **genie-marketing-section** — public-site section components; enforces the font-tier/breakpoint/image rules above.
- **genie-assessment-page** — dashboard assessment pages; enforces the questionnaire/results/scoring pattern above.
- **genie-auth-review** — read-only review of anything touching auth/sessions/API routes; checks the middleware-matcher and RLS-bypass gaps above.
- **genie-supabase-schema** — schema/migration changes; keeps new SQL consistent with `supabase/migrations/` and flags RLS-bypass implications.

-