"use client"

import { motion } from "framer-motion"
import { Check, Loader2, MessageSquarePlus } from "lucide-react"
import { useState } from "react"
import { sendFeedback } from "@/actions/send-feedback"
import { Button } from "@/components/ui/button"
import {
  Credenza,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useGradesStore } from "@/store/grades"

interface FeedbackDialogProps {
  user: {
    name?: string | null
    email?: string | null
    id?: string | null
  }
}

export function FeedbackDialog({ user }: FeedbackDialogProps) {
  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!feedback.trim()) return

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const result = await sendFeedback(feedback, user)

      if (!result.ok) {
        throw new Error("Failed to send feedback")
      }

      setFeedback("")
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setOpen(false)
      }, 1500)
    } catch (error) {
      console.error("Error sending feedback:", error)
      alert("Erro ao enviar feedback. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const { editedGrades } = useGradesStore()
  const isEmptyGrades = Object.keys(editedGrades).length === 0

  return (
    <div className={cn(isEmptyGrades ? "fixed right-4 bottom-4" : "hidden")}>
      <Credenza open={open} onOpenChange={setOpen}>
        <CredenzaTrigger asChild>
          <Button title="Enviar feedback" className="gap-2">
            <MessageSquarePlus className="size-5" />
            Feedback
          </Button>
        </CredenzaTrigger>
        <CredenzaContent className="mx-auto sm:max-w-[425px]">
          <CredenzaHeader>
            <CredenzaTitle className="flex items-center gap-2">
              {showSuccess ? "Feedback enviado!" : "Enviar feedback"}
            </CredenzaTitle>
          </CredenzaHeader>
          {isSubmitting ? (
            <div className="flex flex-col items-center gap-4 p-8">
              <Loader2 className="size-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Enviando feedback...</p>
            </div>
          ) : showSuccess ? (
            <div className="flex flex-col items-center gap-4 p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <Check className="size-12 text-green-500" />
              </motion.div>
              <p className="text-muted-foreground">
                Obrigado pelo seu feedback!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 md:p-0">
              <div className="grid gap-4 pb-6 md:mb-2 md:py-0">
                <div className="grid gap-2">
                  <Label htmlFor="feedback">Mensagem</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Algo não funcionou como esperado? Ou tem uma ideia para melhorar?"
                    className="min-h-[120px] text-base"
                    disabled={isSubmitting || showSuccess}
                  />
                </div>
              </div>
              <CredenzaFooter className="p-0 md:p-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="text-base md:text-sm"
                  disabled={isSubmitting || showSuccess}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !feedback.trim() || showSuccess}
                  className="text-base md:text-sm"
                >
                  Enviar
                </Button>
              </CredenzaFooter>
            </form>
          )}
        </CredenzaContent>
      </Credenza>
    </div>
  )
}
