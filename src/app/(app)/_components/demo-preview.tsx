"use client"

import { motion } from "framer-motion"
import screenshotImage from "@/images/screenshot.png"
import { PhoneFrame } from "./phone-frame"

export function DemoPreview() {
  const _getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-green-700 bg-green-50 border-green-200"
      case "warning":
        return "text-amber-700 bg-amber-50 border-amber-200"
      case "pending":
        return "text-blue-700 bg-blue-50 border-blue-200"
      default:
        return ""
    }
  }

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="w-full max-w-2xl"
    >
      <h2 className="mb-8 text-center font-semibold text-2xl text-foreground">
        Exemplo
      </h2>

      <div className="flex items-center justify-center">
        <PhoneFrame src={screenshotImage.src} />
      </div>
    </motion.div>
  )
}
