"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"

interface WarningDialogProps {
  title: string
  message: string
}

const STORAGE_KEY = "ifrncalc:warning-dialog-closed"

export function WarningDialog({ title, message }: WarningDialogProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const isClosed = localStorage.getItem(STORAGE_KEY) === "true"
    setOpen(!isClosed)
  }, [])

  useEffect(() => {
    if (!open) {
      localStorage.setItem(STORAGE_KEY, "true")
    }
  }, [open])

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent className="mx-auto sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>{title}</CredenzaTitle>
        </CredenzaHeader>
        <div className="px-4 md:px-0">
          <p>{message}</p>
        </div>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button>Entendi</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
