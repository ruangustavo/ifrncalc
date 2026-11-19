"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

import { chipClass, type GroupProps } from "./bimester"
import { Evaluate } from "./evaluate"
import { EASE_IN_OUT, MERGE_S } from "./motion"

const inset = (x: number) =>
  `inset(0% calc(50% * ${x}) 0% calc(50% * ${x}) round 6px)`

// The merged block opens from the center (clip-path) while the copies converge under it.
export function MergedBlock({ b, step }: GroupProps) {
  const reduce = useReducedMotion()

  if (step < b.mergeAt) return null

  return (
    <motion.div
      className={cn(chipClass(b), "absolute inset-0")}
      initial={reduce ? { opacity: 0 } : { clipPath: inset(1) }}
      animate={reduce ? { opacity: 1 } : { clipPath: inset(0) }}
      transition={
        reduce ? { duration: 0.2 } : { duration: MERGE_S, ease: EASE_IN_OUT }
      }
    >
      <Evaluate b={b} delay={reduce ? 0.2 : MERGE_S * 0.6} />
    </motion.div>
  )
}
