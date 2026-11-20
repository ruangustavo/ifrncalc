"use client"

import { type ComponentProps, useState } from "react"

import { Button } from "@/components/ui/button"

import { FeedbackDialog } from "./feedback-dialog"

type FeedbackUser = ComponentProps<typeof FeedbackDialog>["user"]

export function FeedbackLink({ user }: { user: FeedbackUser }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="link" size="xs" onClick={() => setOpen(true)}>
        Falar com a gente
      </Button>
      <FeedbackDialog
        user={user}
        origin="general"
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}
