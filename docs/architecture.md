# Architecture

JobFlow AI is a fully client-rendered, statically-typed frontend with **no
external backend**. Every route ultimately reads from one in-memory mock data
layer, structured to swap for a real API in a single file.

## Data flow

```mermaid
flowchart TD
    subgraph ROUTES["app/ — Next.js Routes (App Router)"]
        direction LR
        R_HOME["/"]
        R_JOBS["/jobs"]
        R_JOB["/jobs/[id]"]
        R_DASH["/dashboard"]
        R_ANALYTICS["/dashboard/analytics"]
        R_AI["/ai-tools"]
    end

    subgraph FEATURES["features/ — Business Domains"]
        direction LR
        F_MARKETING["marketing"]
        F_JOBS["jobs"]
        F_APPS["applications"]
        F_ANALYTICS["analytics"]
        F_AI["ai-tools"]
    end

    subgraph SHARED["shared/"]
        direction LR
        UI["ui/<br/>CVA primitives<br/>Button · Card · Badge · Select"]
        API["lib/api-client.ts<br/>typed ApiResponse, simulated latency"]
        DB[("lib/mock-db.ts<br/>seed jobs, applications, user")]
    end

    R_HOME --> F_MARKETING
    R_JOBS --> F_JOBS
    R_JOB --> F_JOBS
    R_DASH --> F_APPS
    R_ANALYTICS --> F_ANALYTICS
    R_AI --> F_AI

    F_MARKETING -.->|uses| UI
    F_JOBS -.->|uses| UI
    F_APPS -.->|uses| UI
    F_ANALYTICS -.->|uses| UI
    F_AI -.->|uses| UI

    F_JOBS -->|api.jobs.*| API
    F_APPS -->|api.applications.*| API
    F_ANALYTICS -->|api.analytics.*| API
    F_AI -->|api.user.*| API

    API -->|reads seed data| DB

    classDef route fill:#111111,stroke:#111111,color:#ffffff
    classDef feature fill:#E63329,stroke:#111111,color:#ffffff
    classDef shared fill:#F7F4ED,stroke:#111111,color:#111111

    class R_HOME,R_JOBS,R_JOB,R_DASH,R_ANALYTICS,R_AI route
    class F_MARKETING,F_JOBS,F_APPS,F_ANALYTICS,F_AI feature
    class UI,API,DB shared
```

**Reading the diagram:** solid arrows are runtime data calls (a feature's hook
calling into the API client, the API client reading the mock DB); dotted
arrows are compile-time UI composition (a feature rendering shared
primitives). Nothing ever calls "up" or sideways across features — data and
UI both flow one direction, top to bottom.

## Layers

1. **Routes** (`app/`) are thin — they compose feature components and own
   Next.js concerns only: `generateStaticParams`, `generateMetadata`, async
   `params`, loading/error boundaries.
2. **Features** (`features/*`) own a business domain end to end: components,
   hooks, and (for `ai-tools`) a simulation lib. Each exposes a single public
   `index.ts` barrel; features never import from another feature.
3. **The API client** (`shared/lib/api-client.ts`) is the only thing any hook
   talks to. It filters/sorts/paginates the mock DB, wraps results in a typed
   `ApiResponse<T>` envelope, and adds artificial latency so loading skeletons
   are exercised — the same shape a real REST/GraphQL client would return.
4. **Shared UI** (`shared/ui/*`) is a small set of `class-variance-authority`–
   driven primitives that every feature composes, keeping the neo-brutalist
   look (sharp corners, hard borders, offset shadows) consistent everywhere.

See [`folder-structure.md`](./folder-structure.md) for the full directory
layout and [`design-system.md`](./design-system.md) for the visual language
these layers render with.
