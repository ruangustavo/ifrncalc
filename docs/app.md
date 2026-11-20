# Aplicação

Dashboard and calculadora. Read [`design.md`](design.md) first for audience, voice and copy.

Light theme only, palette **Folha**: cream surfaces, green text and actions. Token values live in `src/app/globals.css` (`:root`); this file says what each one means.

## Tokens

| Token | Use it for |
| --- | --- |
| `background` / `foreground` | Page surface and body text |
| `card` / `card-foreground` | Cards, inputs, anything that sits on the page |
| `popover` | Dialogs, menus, toasts |
| `primary` / `primary-foreground` | Main action, links, the active state |
| `secondary`, `muted`, `accent` | Quiet surfaces: toggles, hovers, table stripes |
| `muted-foreground` | Supporting text, labels, captions |
| `border` / `input` / `ring` | Dividers, field borders, focus ring |
| `destructive` | Errors and invalid grades |
| `chrome` / `chrome-foreground` | The green header and the SUAP call-to-action block |
| `grade-easy` | Cell or badge for a needed grade up to 40 |
| `grade-reachable` | Needed grade from 41 to 90 |
| `grade-hard` | Needed grade above 90 |

Text on any `grade-*` surface uses `text-foreground`. The tier logic lives in `src/utils/grade-tier.ts`; reach for its helpers instead of choosing a `grade-*` class by hand.

## Components

- Build from the primitives in `src/components/ui/`. On a `chrome` surface use the `chrome` (filled) and `ghost-chrome` Button variants.
- Style with semantic classes only: `bg-background`, `text-foreground`, `text-primary`, `bg-grade-reachable`.

## Type

Inter everywhere, titles and big numbers included. Weight and size carry the hierarchy: `font-bold`/`font-extrabold`, `tracking-tight`, `tabular-nums` on grades.

## Motion

Little, quick, and only where it explains a change of state.

- Curves: `ease-snap` for things entering or responding to a tap, `ease-glide` for things sliding between two positions, `ease-out` for color.
- Durations stay at 150–250ms.
- Wrap movement in `motion-safe:`; color and opacity may stay as they are under reduced motion.

## Done when

- Every class in the changed components comes from the token table above.
- The diff adds no `dark:` variant, no landing token (`forest`, `ink`, `cream`, `lime`, `sun`, `coral`) and no `font-display`.
- `bun run lint`, `bun run typecheck` and `bun run build` pass.
- Every changed text was checked against the copy rules in `design.md`.
