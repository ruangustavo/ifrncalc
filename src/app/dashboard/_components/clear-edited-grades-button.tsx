"use client"

import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"

import { useGradesStore } from "@/store/grades"

import { ClearButton } from "./clear-button"

export function ClearEditedGradesButton() {
  const { clearEditedGrades, editedGrades } = useGradesStore()
  const isEmptyGrades = Object.keys(editedGrades).length === 0

  const handleClearEditedGrades = () => {
    clearEditedGrades()
    toast.success("As notas simuladas foram limpas.")
  }

  return (
    <>
      {!isEmptyGrades && (
        <ClearButton
          onClick={handleClearEditedGrades}
          className="ml-auto hidden md:flex"
        />
      )}

      <AnimatePresence>
        {!isEmptyGrades && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed inset-x-4 bottom-20 z-10 md:hidden"
          >
            <ClearButton
              size="xl"
              variant="default"
              onClick={handleClearEditedGrades}
              className="w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
