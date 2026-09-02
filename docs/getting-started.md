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
