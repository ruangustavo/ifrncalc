"use client"

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import { toast } from "sonner"

import { sendFeedback } from "@/actions/send-feedback"
import { Button } from "@/components/ui/button"
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"
import { Textarea } from "@/components/ui/textarea"

import { FeedbackStep } from "./feedback-step"

export type FeedbackOrigin = "redesign" | "general"

const TOPICS = [
  {
    key: "praise",
    emoji: "💚",
    label: "Elogio",
    hint: "Algo que você curtiu",
    title: "Que bom! O que você curtiu?",
    placeholder: "Ex.: ver quanto falta em cada matéria me salvou",
  },
  {
    key: "idea",
    emoji: "💡",
    label: "Ideia",
    hint: "Algo que você queria ver",
    title: "Qual é a ideia?",
    placeholder: "Ex.: mostrar minhas faltas também",
  },
  {
    key: "problem",
    emoji: "🐞",
    label: "Problema",
    hint: "Algo deu errado",
    title: "O que aconteceu?",
    placeholder: "Ex.: a nota do 3º bimestre não apareceu",
  },
] as const

type Topic = (typeof TOPICS)[number]

type Stage =
  | { kind: "pick" }
  | { kind: "write"; topic: Topic }
  | { kind: "sending"; topic: Topic }
  | { kind: "sent" }

const PICK_TITLE: Record<FeedbackOrigin, string> = {
  redesign: "O que achou do novo visual?",
  general: "Sobre o que você quer falar?",
}

interface FeedbackDialogProps {
  user: {
    name?: string | null
    email?: string | null
    id?: string | null
  }
  origin: FeedbackOrigin
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedbackDialog({
  user,
  origin,
  open,
  onOpenChange,
}: FeedbackDialogProps) {
  const reduce = useReducedMotion()
  const [stage, setStage] = useState<Stage>({ kind: "pick" })
  const [message, setMessage] = useState("")

  const [wasOpen, setWasOpen] = useState(open)

  if (open !== wasOpen) {
    setWasOpen(open)

    if (open) {
      setStage({ kind: "pick" })
      setMessage("")
    }
  }

  function close() {
    onOpenChange(false)
  }

  async function submit(topic: Topic) {
    setStage({ kind: "sending", topic })

    const tag =
      origin === "redesign"
        ? `[${topic.label} · novo visual]`
        : `[${topic.label}]`

    const result = await sendFeedback(`${tag} ${message.trim()}`, user)

    if (result.ok) {
      setStage({ kind: "sent" })

      return
    }

    setStage({ kind: "write", topic })
    toast.error("Não deu pra enviar agora. Tenta de novo em instantes.")
  }

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="mx-auto sm:max-w-md">
        <AnimatePresence mode="wait" initial={false}>
          {stage.kind === "pick" && (
            <FeedbackStep key="pick">
              <CredenzaHeader>
                <CredenzaTitle>{PICK_TITLE[origin]}</CredenzaTitle>
                <CredenzaDescription>
                  Escolhe um e escreve rapidinho.
                </CredenzaDescription>
              </CredenzaHeader>
              <div className="grid gap-2 px-4 pt-2 pb-6 md:px-0 md:pb-0">
                {TOPICS.map((topic) => (
                  <button
                    key={topic.key}
                    type="button"
                    onClick={() => setStage({ kind: "write", topic })}
                    className="flex items-center gap-3 rounded-2xl bg-muted p-3 text-left transition-transform duration-150 ease-snap outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]"
                  >
                    <span aria-hidden className="text-2xl">
                      {topic.emoji}
                    </span>
                    <span>
                      <span className="block font-semibold">{topic.label}</span>
                      <span className="block text-sm text-muted-foreground">
                        {topic.hint}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </FeedbackStep>
          )}
          {(stage.kind === "write" || stage.kind === "sending") && (
            <FeedbackStep key="write">
              <CredenzaHeader>
                <CredenzaTitle>
                  <span aria-hidden className="mr-1.5">
                    {stage.topic.emoji}
                  </span>
                  {stage.topic.title}
                </CredenzaTitle>
                <CredenzaDescription>
                  A gente lê tudo que chega.
                </CredenzaDescription>
              </CredenzaHeader>
              <form
                className="space-y-4 px-4 pt-2 pb-6 md:px-0 md:pb-0"
                onSubmit={(event) => {
                  event.preventDefault()

                  if (message.trim()) void submit(stage.topic)
                }}
              >
                <Textarea
                  aria-label={stage.topic.title}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={stage.topic.placeholder}
                  disabled={stage.kind === "sending"}
                />
                <div className="flex items-center justify-between gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={stage.kind === "sending"}
                    onClick={() => setStage({ kind: "pick" })}
                  >
                    <HugeiconsIcon strokeWidth={2} icon={ArrowLeft01Icon} />
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    disabled={!message.trim() || stage.kind === "sending"}
                  >
                    {stage.kind === "sending" ? "Enviando…" : "Enviar"}
                  </Button>
                </div>
              </form>
            </FeedbackStep>
          )}
          {stage.kind === "sent" && (
            <FeedbackStep key="sent">
              <CredenzaHeader className="sr-only">
                <CredenzaTitle>Enviado</CredenzaTitle>
                <CredenzaDescription>
                  Sua mensagem foi enviada.
                </CredenzaDescription>
              </CredenzaHeader>
              <div className="flex flex-col items-center gap-2 px-4 pt-2 pb-6 text-center md:px-0 md:pb-0">
                <motion.span
                  aria-hidden
                  className="text-5xl"
                  initial={{
                    opacity: 0,
                    transform: reduce ? "none" : "scale(0.9)",
                  }}
                  animate={{ opacity: 1, transform: "scale(1)" }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                >
                  💚
                </motion.span>
                <p className="text-lg font-bold">Valeu demais!</p>
                <p className="max-w-xs text-sm text-pretty text-muted-foreground">
                  Cada mensagem vai direto pra quem faz o IFRN Calc.
                </p>
                <Button variant="outline" className="mt-3" onClick={close}>
                  Fechar
                </Button>
              </div>
            </FeedbackStep>
          )}
        </AnimatePresence>
      </CredenzaContent>
    </Credenza>
  )
}
