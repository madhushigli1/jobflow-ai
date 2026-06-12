# JobFlow AI

> The intelligent job platform — find AI-matched roles, track every application on a drag-and-drop board, and generate tailored cover letters. A polished, end-to-end frontend showcase.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, in a modern dark SaaS aesthetic (gradients, glassmorphism, motion).

---

## ✨ What's inside

| Route | Description |
| --- | --- |
| `/` | Marketing landing — animated hero with product preview, feature grid, animated stat counters, how-it-works, testimonials, CTA |
| `/jobs` | Job board — live debounced search, multi-facet filters, sort, animated grid, AI match scores, loading skeletons & empty state |
| `/jobs/[id]` | Job detail — full role breakdown, "why you match" AI panel, one-click apply (optimistic), similar roles. Statically prerendered via `generateStaticParams` |
| `/dashboard` | Application tracker — **drag-and-drop Kanban** across 5 stages with live stat cards |
| `/dashboard/analytics` | Analytics — **custom dependency-free SVG charts** (animated area, donut, funnel) with hover readouts |
| `/ai-tools` | AI workspace — resume analyzer (scored), cover-letter generator (typewriter), and match scorer |

## 🏗️ Architecture

Feature-based structure with strict boundaries (`features/` → `shared/`, never feature → feature):

```
src/
├── app/                  # Routes only (App Router)
│   ├── jobs/[id]/        # async params, generateMetadata, generateStaticParams
│   ├── dashboard/        # nested layout + analytics segment
│   └── ai-tools/
├── features/             # Business domains, each with a public index.ts barrel
│   ├── marketing/        # landing-page sections
│   ├── jobs/             # board, card, filters, detail, useJobs hook
│   ├── applications/     # Kanban tracker, useApplications hook
│   ├── analytics/        # SVG chart primitives + view
│   └── ai-tools/         # resume / cover-letter / match tools + simulate lib
├── shared/
│   ├── ui/               # CVA-based primitives (Button, Badge, Card, ScoreRing…)
│   ├── layout/           # Navbar, Footer, BackgroundFX, SubNav
│   ├── lib/              # api-client (mock) + mock-db
│   ├── hooks/            # useDebouncedValue
│   ├── types/            # cross-cutting domain entities
│   └── utils/            # cn(), formatters
└── config/               # site + navigation config
```

**Key decisions**
- **Centralized data layer** — components never fetch directly. Feature hooks call a single mock `api` client (`shared/lib/api-client.ts`) with simulated latency, typed responses, and an `ApiResponse<T>` envelope. Swapping in a real backend is a one-file change.
- **Design tokens as CSS variables** — semantic colors (each paired with a `-foreground`) defined as HSL channels on `:root`, consumed by Tailwind v4 via `@theme inline`. Re-theming = swapping variable values.
- **CVA variants** for type-safe component APIs that extend native HTML attributes.
- **Custom SVG charts** — no charting dependency; full control over the dark aesthetic and animations.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## 🧰 Tech stack

- Next.js 16 · React 19 · TypeScript 5
- Tailwind CSS v4 (`@theme inline` tokens, zero config file)
- `motion` (Framer Motion) for animation
- `class-variance-authority` + `tailwind-merge` for the component system
- `lucide-react` icons

> Data is mocked for demo purposes — see `src/shared/lib/mock-db.ts`.
