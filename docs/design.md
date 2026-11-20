# Design

The IFRN Calc has two surfaces with separate design systems:

- **Aplicação**: `/dashboard` and `/calculadora`. Read [`app.md`](app.md) before changing it.
- **Landing**: `/`, the code under `src/app/(app)/`. Read [`landing.md`](landing.md) before changing it.

## Who uses it

A student at IFRN (integrado, subsequente or superior), on a phone in 84% of visits. They open the IFRN Calc right after a grade comes out or after taking a test, sometimes anxious, to find out how much they still need.

## Voice

Direct, calm and informal without forcing it ("pra" is fine). Write the way a classmate who already did the math would explain it. Use the words a student uses: nota, bimestre, média, prova, SUAP.

## Copy

The *nota que falta* is the subject of every screen; color only backs it up.

- Show how much is missing and where: "Precisa de 54 no 3º e no 4º bimestre".
- Describe the situation calmly: "Dá pra passar, mas depende das próximas provas".
- Compare with the *conta na mão*, which is what the student does today.
- Talk about SUAP and the password in student terms: "Você entra pela página oficial do SUAP".
- For grades that haven't shown up yet, say it "pode levar um tempinho".

## Boundary

The aplicação paints with the tokens in `:root`; the landing paints with the tokens scoped to `.landing`. Each surface uses only its own tokens, so a change in one never reaches the other. The `design-system/no-landing-tokens` lint rule enforces this outside `src/app/(app)/`.
