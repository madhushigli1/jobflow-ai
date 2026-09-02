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
