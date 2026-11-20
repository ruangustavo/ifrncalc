import { RoughCircle } from "./rough-circle"

const STEPS = [
  { note: "o que eu já tenho", line: "72 × 2 + 65 × 2 = 274" },
  { note: "o que falta pra 600", line: "600 − 274 = 326" },
  { note: "3º e 4º pesam 6", line: "326 ÷ 6 = 54,3" },
] as const

export function ChalkBoard() {
  return (
    <figure className="font-hand">
      <p className="text-2xl leading-none text-cream/45">
        Matemática: 72 e 65. Quanto falta?
      </p>
      <ol className="mt-4 space-y-2">
        {STEPS.map((step) => (
          <li key={step.line} className="flex items-baseline gap-5">
            <span className="text-3xl leading-none text-cream/55">
              {step.line}
            </span>
            <span className="text-lg leading-none text-cream/35 max-sm:hidden">
              {step.note}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-7 flex items-center gap-8 text-3xl leading-none text-cream/70">
        preciso de
        <span className="text-6xl font-bold">
          <RoughCircle>54</RoughCircle>
        </span>
      </p>
      <figcaption className="mt-8 max-w-sm font-sans text-sm text-pretty text-cream/70">
        Essa é a conta de uma disciplina. O IFRN Calc faz em todas, toda vez que
        sai nota.
      </figcaption>
    </figure>
  )
}
