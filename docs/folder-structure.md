# Folder Structure

```
jobflow-ai/
├── src/
│   ├── app/                       # Routes only (App Router)
│   │   ├── page.tsx                 # / — marketing landing
│   │   ├── jobs/
│   │   │   ├── page.tsx              # /jobs — board
│   │   │   └── [id]/
│   │   │       ├── page.tsx           # /jobs/[id] — detail, generateStaticParams
│   │   │       └── loading.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx            # shared tracker/analytics sub-nav
│   │   │   ├── page.tsx              # /dashboard — Kanban tracker
│   │   │   └── analytics/page.tsx    # /dashboard/analytics
│   │   └── ai-tools/page.tsx        # /ai-tools — AI workspace
│   │
│   ├── features/                  # Business domains, each with a public index.ts
│   │   ├── marketing/                # hero, features, stats, testimonials, CTA
│   │   ├── jobs/                     # board, card, filters, detail, useJobs
│   │   ├── applications/             # Kanban board, stat cards, useApplications
│   │   ├── analytics/                # SVG chart primitives + analytics view
│   │   └── ai-tools/                 # resume / cover-letter / match tools + simulate lib
│   │
│   ├── shared/
│   │   ├── ui/                       # CVA-based primitives (Button, Badge, Card, Select…)
│   │   ├── layout/                   # Navbar, Footer, BackgroundFX, SubNav
│   │   ├── lib/                      # api-client (mock) + mock-db
│   │   ├── hooks/                    # useDebouncedValue
│   │   ├── types/                    # cross-cutting domain entities
│   │   └── utils/                    # cn(), formatters
│   │
│   └── config/                    # site + navigation config
│
├── public/                        # static assets
└── docs/                          # this documentation + README screenshots
```

## Why it's shaped this way

**`app/` stays thin.** Route files own only what Next.js requires of them —
`generateStaticParams`, `generateMetadata`, async `params`, loading/error
boundaries — and otherwise just render a feature component. This keeps routing
concerns and business logic from tangling together, and means a feature can be
tested or reused without spinning up the router.

**`features/` is isolated per domain.** Each folder under `features/` owns one
business domain end to end — its components, hooks, and (for `ai-tools`) a
simulation lib — and exposes a single public `index.ts` barrel. The rule that
makes this pay off: **features never import from another feature.** Anything
shared crosses through `shared/` instead, so a feature can be deleted or
rewritten without hunting for cross-feature imports.

**`shared/` is the only place that fans out.** `shared/ui` (visual primitives),
`shared/lib` (the API client and mock DB), `shared/hooks`, `shared/types`, and
`shared/utils` are the sole dependencies every feature is allowed to reach for
outside itself. See [`architecture.md`](./architecture.md) for how data flows
through this layer.
