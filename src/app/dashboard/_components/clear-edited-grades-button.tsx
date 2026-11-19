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
    toast.success("As notas editadas foram limpas com sucesso!")
  }

  return (
    <>
      <ClearButton
        onClick={handleClearEditedGrades}
        disabled={isEmptyGrades}
        className="ml-auto hidden md:flex"
      />

      <AnimatePresence>
        {!isEmptyGrades && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed right-0 bottom-4 left-0 z-10 mx-auto w-full max-w-[calc(100%-2rem)] px-4 md:hidden"
          >
            <ClearButton
              onClick={handleClearEditedGrades}
              className="w-full justify-center"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
