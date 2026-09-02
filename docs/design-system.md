# Design System

JobFlow doesn't use a typical dark SaaS palette. It's **"Editorial Luxe /
Neo-Brutalist"**: a warm paper background, near-black ink, a single vermillion
accent, hard 1px borders, offset drop-shadows, and zero border-radius
everywhere.

## Tokens

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#F7F4ED` warm paper | Page background |
| `--background-elevated` | `#FFFFFF` white | Card surfaces |
| `--foreground` | near-black ink | Body text, borders |
| `--muted` | warm light gray | Muted fills |
| `--accent` | `#E63329` vermillion | The one accent color — CTAs, scores, highlights |
| `--border` | near-black ink | Hard editorial rules |
| `--radius` | `0rem` | Sharp corners everywhere, no rounding |

All tokens are raw HSL channels defined once on `:root` in `src/app/globals.css`
and consumed by Tailwind v4 via `@theme inline` — re-theming the entire app is a
matter of swapping variable values, not hunting through component files.

Semantic states are deliberately folded into the black/white/red palette rather
than given their own colors: positive emphasis reuses the vermillion accent,
caution uses muted gray ink, and negative/destructive reuses near-black — there
is no green, yellow, or blue anywhere in the system.

## Typography

Two-font pairing, both loaded as CSS variables in `globals.css`:

- **Geist Sans** (`--font-sans`) — body copy and UI text.
- **Fraunces** (`--font-serif`) — display headlines, the editorial serif voice
  seen in hero copy and section titles.
- **Geist Mono** (`--font-mono`) — the `.label` utility class: uppercase,
  `0.18em` tracked-out eyebrow labels (e.g. "AI-POWERED JOB SEARCH", "TOP MATCH").

## Component conventions

Components are built with `class-variance-authority` (CVA) so variants are
type-safe and extend native HTML attributes rather than inventing a new prop
API. `src/shared/ui/button.tsx` is the reference implementation:

- Every interactive surface gets a hard `border-2 border-foreground` and an
  offset drop-shadow (`shadow-[4px_4px_0_0_hsl(var(--foreground))]`) instead of
  a blur — the signature neo-brutalist "sticker" look.
- Hover/active states **move the element**, not just recolor it: `hover:translate-x-[2px]
  hover:translate-y-[2px]` shrinks the shadow as if the block were pressed
  toward the page, `active:` pushes it further and drops the shadow entirely.
- `variant="accent"` (vermillion fill) is reserved for the one primary action
  per screen — it is a "rare red pop," not a default.
- `.shadow-brutal` (`5px 5px 0 0 hsl(var(--foreground))`) is the shared utility
  class for non-button surfaces (cards, panels) that need the same offset-shadow
  treatment.

New components should follow this pattern: CVA variants, hard borders, offset
shadows instead of blur, and `--radius: 0` — never introduce rounded corners or
soft box-shadows, they break the aesthetic immediately.
