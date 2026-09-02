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
