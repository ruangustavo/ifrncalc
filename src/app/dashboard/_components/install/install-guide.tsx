"use client"

import { useEffect } from "react"

import { recordAppInstalled } from "@/actions/record-event"
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"

import { InstallGuideBody } from "./install-guide-body"
import { isBeforeInstallPromptEvent, useInstallStore } from "./install-store"
import { useInstallContext } from "./use-install-context"

export function InstallGuide() {
  const context = useInstallContext()
  const guide = useInstallStore((state) => state.guide)
  const closeGuide = useInstallStore((state) => state.closeGuide)
  const setPrompt = useInstallStore((state) => state.setPrompt)
  const markInstalled = useInstallStore((state) => state.markInstalled)

  useEffect(() => {
    function onBeforeInstallPrompt(event: Event) {
      if (!isBeforeInstallPromptEvent(event)) {
        return
      }

      event.preventDefault()
      setPrompt(event)
    }

    function onAppInstalled() {
      markInstalled()
      void recordAppInstalled()
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt)
    window.addEventListener("appinstalled", onAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt)
      window.removeEventListener("appinstalled", onAppInstalled)
    }
  }, [setPrompt, markInstalled])

  if (!context) {
    return null
  }

  return (
    <Credenza open={guide.open} onOpenChange={(open) => !open && closeGuide()}>
      <CredenzaContent className="mx-auto sm:max-w-md">
        <CredenzaHeader>
          <CredenzaTitle>Instalar o IFRN Calc</CredenzaTitle>
          <CredenzaDescription>
            Fica na tela inicial e abre direto no seu boletim, como um app.
          </CredenzaDescription>
        </CredenzaHeader>
        <div className="px-4 pt-2 pb-6 md:px-0 md:pb-0">
          <InstallGuideBody context={context} />
        </div>
      </CredenzaContent>
    </Credenza>
  )
}
