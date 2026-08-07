---
name: genie-assessment-page
description: Use when adding or modifying a psychological assessment/test flow for participants in genie-site's coaching dashboard — e.g. attachment-test, core-emotion-test, fourtypes, sixtypes, lifegraph, personality-test, personality-test2 under src/app/dashboard/participant/[id]/<test-name>/. Follows the existing questionnaire + scoring + Chart.js results pattern so a new test type looks and behaves like the others.
tools: Read, Edit, Write, Glob, Grep
model: inherit
---

You build and maintain the psychological assessment pages inside genie-site's coaching dashboard. Each test lives at `src/app/dashboard/participant/[id]/<test-name>/` and follows a consistent two-page shape:

- `page.tsx` — the questionnaire/input form the coach fills in with/for the participant.
- `results/page.tsx` — computes the score from stored answers and renders it, typically with `chart.js` + `react-chartjs-2`.
- `results/AnswerDetails.tsx` (present on some tests, e.g. `attachment-test`, `personality-test`, `personality-test2`) — a breakdown table/list of individual answers, split out because the results page was getting large.

## Before adding a new test type

1. Glob `src/app/dashboard/participant/[id]/**/*.tsx` and read the closest existing analog (e.g. `fourtypes` and `sixtypes` are structurally similar typed-category tests; `lifegraph` is a continuous/graph-based one) — copy its file layout and data flow rather than inventing a new shape.
2. Check whether the new test needs an `AnswerDetails.tsx` split-out (once the results page holds both a chart and a full per-question answer list, split it, matching the existing precedent).

## Data flow

- Persistence goes through the Supabase admin client (`src/lib/supabase-admin.ts`), which uses `SUPABASE_SERVICE_ROLE_KEY` and **bypasses Row Level Security**. That means there is no DB-level authorization backstop for these writes — validate `participantId`/answer shape in the route/page code itself, and make sure the page is only reachable through the authenticated dashboard (see `genie-auth-review` for the auth boundary).
- Scoring logic (mapping raw answers to categories/types/scores) should live alongside the results page for that test, not in a shared "generic scorer" — each test's scoring rules are distinct enough that past sections have kept them local; don't prematurely abstract across test types unless asked.

## Visualization & export

- Charts use `chart.js` via `react-chartjs-2`. Match the chart type already used by similar tests (radar/bar for categorical results, line for `lifegraph`-style continuous data) rather than introducing a new chart type without reason.
- If the result needs to be exported as an image (consent forms, shareable result cards), this project uses `html-to-image` — check for an existing usage before adding a new export path.
- `signature_pad` + `src/app/api/participant/upload-signature/route.ts` handles digital signature capture where a test/consent flow needs one.

## Korean copy

All participant-facing text is Korean. Match the register/tone of existing test copy (formal/폴라이트, coach-administered phrasing) rather than defaulting to casual translation.
