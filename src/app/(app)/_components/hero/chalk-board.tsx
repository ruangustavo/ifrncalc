"use client"

import { useRef } from "react"

import { ChalkPencil } from "./chalk-pencil"
import { useChalkWriter } from "./use-chalk-writer"

const STEPS = [
  { note: "o que eu já tenho", line: "72 × 2 + 65 × 2 = 274" },
  { note: "o que falta pra 600", line: "600 − 274 = 326" },
  { note: "3º e 4º pesam 6", line: "326 ÷ 6 = 54,3" },
] as const

export function ChalkBoard() {
  const board = useRef<HTMLElement>(null)
  const pencil = useRef<HTMLDivElement>(null)

  useChalkWriter(board, pencil)

  return (
    <figure ref={board} className="chalk-board relative font-hand">
      <p className="text-2xl leading-none text-cream/45">
        <span data-write className="inline-block">
          Matemática: 72 e 65. Quanto falta?
        </span>
      </p>
      <ol className="mt-4 space-y-2">
        {STEPS.map((step) => (
          <li key={step.line} className="flex items-baseline gap-5">
            <span data-write className="text-3xl leading-none text-cream/55">
              {step.line}
            </span>
            <span
              data-write
              className="text-lg leading-none text-cream/35 max-sm:hidden"
            >
              {step.note}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-7 flex items-center gap-8 text-3xl leading-none text-cream/70">
        <span data-write>preciso de</span>
        <span className="text-6xl font-bold">
          <span data-write="circle" className="inline-block px-2 text-lime">
            54
          </span>
        </span>
      </p>
      <figcaption
        data-reveal
        className="mt-8 max-w-sm font-sans text-sm text-pretty text-cream/70"
      >
        Essa é a conta de uma disciplina. O IFRN Calc faz em todas, toda vez que
        sai nota.
      </figcaption>
      <div ref={pencil} aria-hidden className="chalk-pencil">
        <ChalkPencil />
      </div>
    </figure>
  )
}
