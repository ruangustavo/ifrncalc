"use client"

import NumberFlow from "@number-flow/react"
import { motion } from "motion/react"

import type { Bimester } from "./bimester"
import { EASE_OUT } from "./motion"

// "70 × 2" shows, then blurs into the product.
export function Evaluate({ b, delay }: { b: Bimester; delay: number }) {
  return (
    <span className="grid place-items-center">
      <motion.span
        className="[grid-area:1/1]"
        initial={{ opacity: 0, filter: "blur(0px)" }}
        animate={{
          opacity: [0, 1, 1, 0],
          filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(4px)"],
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.15, 0.8, 1],
          ease: "linear",
          delay,
        }}
      >
        {b.grade} × {b.weight}
      </motion.span>
      <motion.span
        className="font-semibold [grid-area:1/1]"
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: EASE_OUT, delay: delay + 1.0 }}
      >
        <NumberFlow value={b.grade * b.weight} />
      </motion.span>
    </span>
  )
}
