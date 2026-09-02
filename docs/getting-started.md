# Getting Started

## Prerequisites

- Node.js 20+
- npm

## Install

```bash
npm install
```

## Run

```bash
npm run dev      # http://localhost:3000, Turbopack
```

No environment variables and no backend are required. All data is served from an
in-memory mock API (`src/shared/lib/mock-db.ts`) with simulated network latency,
so loading states — skeletons, disabled buttons, optimistic UI — are real and
visible during local development.

## Other scripts

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint      # eslint
```

## Adding a new feature

The codebase enforces one rule strictly: `features/*` never import from another
feature. Everything a feature needs from outside its own folder comes from
`shared/`.

1. Create `src/features/<name>/` with `components/`, and `hooks/` or `lib/` as needed.
2. If the feature needs data, add methods to `src/shared/lib/api-client.ts` and,
   if it needs seed data, to `src/shared/lib/mock-db.ts` — components should never
   read from the mock DB directly.
3. Export the feature's public surface from a single `src/features/<name>/index.ts`
   barrel. Nothing outside the feature should import a path deeper than that barrel.
4. Wire it up from `src/app/<route>/page.tsx` — routes stay thin and only compose
   feature components plus Next.js-specific concerns (metadata, params, loading/error
   boundaries).
5. Reuse `shared/ui/*` primitives for anything visual instead of writing new base
   components, to keep the neo-brutalist look consistent.

## Adding a new route

Routes live under `src/app/` and map 1:1 to URL paths via the App Router's
file-based routing. A route file should stay a thin composition layer — business
logic and markup belong in the feature it renders, not in `page.tsx` itself.

