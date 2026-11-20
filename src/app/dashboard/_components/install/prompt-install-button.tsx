"use client"

import { Download04Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"

import { type BeforeInstallPromptEvent, useInstallStore } from "./install-store"

export function PromptInstallButton({
  prompt,
}: {
  prompt: BeforeInstallPromptEvent
}) {
  const setPrompt = useInstallStore((state) => state.setPrompt)

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={async () => {
        await prompt.prompt()
        await prompt.userChoice
        setPrompt(null)
      }}
    >
      <HugeiconsIcon
        data-icon="inline-start"
        strokeWidth={2}
        icon={Download04Icon}
      />
      Instalar o IFRN Calc
    </Button>
  )
}
