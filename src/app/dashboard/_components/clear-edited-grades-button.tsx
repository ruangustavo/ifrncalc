'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useGradesStore } from '@/store/grades'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, Trash2 } from 'lucide-react'

function ClearButton(props: ButtonProps) {
  return (
    <Button size="xs" variant="outline" className={props.className} {...props}>
      <span className="flex items-center gap-1.5">
        <Trash2 className="size-4" />
        Limpar notas editadas
      </span>
    </Button>
  )
}

export function ClearEditedGradesButton() {
  const { clearEditedGrades, editedGrades } = useGradesStore()
  const isEmptyGrades = Object.keys(editedGrades).length === 0
  const { toast } = useToast()

  const handleClearEditedGrades = () => {
    clearEditedGrades()
    toast({
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="size-4 text-green-500" />
          <span className="font-medium">
            As notas editadas foram limpas com sucesso!
          </span>
        </div>
      ),
    })
  }

  return (
    <>
      <ClearButton
        onClick={handleClearEditedGrades}
        disabled={isEmptyGrades}
        className="hidden md:flex ml-auto"
      />

      <AnimatePresence>
        {!isEmptyGrades && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="md:hidden fixed left-0 right-0 bottom-4 mx-auto px-4 z-10 w-full max-w-[calc(100%-2rem)]"
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
