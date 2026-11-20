# Landing

The page at `/`, code under `src/app/(app)/`. Read [`design.md`](design.md) first for audience, voice and copy.

The landing is finished: change it only when the task names it. A change to the aplicação must leave every pixel here as it is; before/after full-page screenshots at 390px and 1440px prove it.

## Tokens

The landing wrapper carries the `.landing` class, and every landing token exists only inside it:

- Palette: `forest` (page), `ink` (darkest text), `cream` (text on forest), `lime` (main highlight and action), `sun` and `coral` (the "41 a 90" and "acima de 90" tiers).
- Semantic tokens (`background`, `primary`, …) are redefined inside `.landing` from that palette, so shadcn primitives render in landing colors there.

Outside `.landing` these classes paint nothing. That is on purpose.

## Type

- Bricolage Grotesque (`font-display`) for headlines and big numerals, Inter for body text.
- The handwriting font (`font-hand`) only on the chalkboard math and the story note.

## Freedoms

The landing may use arbitrary values, raw colors, inline styles and tilted elements; the shadcn lint rules are off under `src/app/(app)/`. Keep tilt to the story note.
