"use client"

import { BubbleChatIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { type ComponentProps, useState } from "react"

import { Button } from "@/components/ui/button"

import { FeedbackDialog } from "./feedback-dialog"

type FeedbackUser = ComponentProps<typeof FeedbackDialog>["user"]

export function FeedbackCard({ user }: { user: FeedbackUser }) {
  const [open, setOpen] = useState(false)

  return (
    <section className="flex flex-col gap-4 rounded-3xl bg-muted p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-bold">Ideia, problema ou elogio?</h2>
        <p className="mt-1 text-sm text-pretty text-muted-foreground">
          Conta pra gente. O IFRN Calc melhora com o que a galera manda.
        </p>
      </div>
      <Button
        // oxlint-disable-next-line shadcn/no-restyle -- the label wraps under large text sizes, so the button grows with it instead of overflowing the page
        className="h-auto min-h-9 shrink-0 py-2 whitespace-normal"
        onClick={() => setOpen(true)}
      >
        <HugeiconsIcon strokeWidth={2} icon={BubbleChatIcon} />
        Falar com a gente
      </Button>
      <FeedbackDialog
        user={user}
        origin="general"
        open={open}
        onOpenChange={setOpen}
      />
    </section>
  )
}
