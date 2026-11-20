"use client"

import { BubbleChatIcon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRouter } from "next/navigation"
import { type ComponentProps, useState } from "react"

import { Button } from "@/components/ui/button"

import { dismissFeedbackBanner } from "./feedback-cookie"
import { FeedbackDialog } from "./feedback-dialog"

type FeedbackUser = ComponentProps<typeof FeedbackDialog>["user"]

export function FeedbackBanner({ user }: { user: FeedbackUser }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <section className="flex items-center gap-3 rounded-2xl bg-chrome p-3 pl-4 text-chrome-foreground">
      <p className="min-w-0 flex-1 text-sm text-pretty">
        <span className="font-semibold">Novo visual!</span> Conta pra gente o
        que achou.
      </p>
      <Button
        variant="chrome"
        size="sm"
        className="shrink-0"
        onClick={() => setOpen(true)}
      >
        <HugeiconsIcon strokeWidth={2} icon={BubbleChatIcon} />
        Opinar
      </Button>
      <Button
        variant="ghost-chrome"
        size="icon-sm"
        aria-label="Fechar aviso"
        onClick={() => {
          dismissFeedbackBanner()
          router.refresh()
        }}
      >
        <HugeiconsIcon strokeWidth={2} icon={Cancel01Icon} />
      </Button>
      <FeedbackDialog
        user={user}
        origin="redesign"
        open={open}
        onOpenChange={setOpen}
      />
    </section>
  )
}
