"use client"

import { motion, useReducedMotion } from "motion/react"

const EASE_SNAP = [0.23, 1, 0.32, 1] as const

export function FeedbackStep({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, transform: reduce ? "none" : "translateY(8px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE_SNAP }}
    >
      {children}
    </motion.div>
  )
}
