"use client"

import { ArrowRight } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

import { EASE_OUT } from "./motion"
import { Verdict } from "./verdict"

function captionFor(step: number): ReactNode {
  switch (step) {
    case 1:
      return (
        <>
          <b>Peso</b> é quantas vezes a nota conta.
        </>
      )
    case 2:
      return "1º Bim tem peso 2: o 70 entra 2 vezes…"
    case 3:
      return (
        <>
          …então vale <span className="tabular-nums">70 × 2 = 140</span> pontos.
        </>
      )
    case 4:
      return "O 80 do 2º Bim também entra 2 vezes…"
    case 5:
      return (
        <>
          …e vale <span className="tabular-nums">80 × 2 = 160</span> pontos.
        </>
      )
    case 6:
      return "3º e 4º Bim têm peso 3: entram 3 vezes cada."
    case 7:
      return (
        <>
          Média 60 em 10 vagas <ArrowRight className="inline size-4" /> precisa
          de <b>600</b> pontos. Já tem{" "}
          <span className="tabular-nums">140 + 160 = 300</span>.
        </>
      )
    case 8:
      return (
        <>
          Faltam 300 em 6 vagas:{" "}
          <span className="text-primary tabular-nums">300 ÷ 6 = 50 cada</span>
        </>
      )
    case 9:
      return (
        <>
          <span className="tabular-nums">50 × 3 = 150</span> pontos em cada.
        </>
      )
    case 10:
    case 11:
      return <Verdict />
    default:
      return null
  }
}

export function Caption({ step }: { step: number }) {
  const reduce = useReducedMotion()

  return (
    <div className="mt-4 grid min-h-10 place-items-center text-center text-sm">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={Math.min(step, 10)}
          initial={{
            opacity: 0,
            transform: reduce ? "translateY(0px)" : "translateY(6px)",
          }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{
            opacity: 0,
            transform: reduce ? "translateY(0px)" : "translateY(-6px)",
          }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          {captionFor(step)}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
