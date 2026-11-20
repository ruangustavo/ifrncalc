"use client"

import { Cancel01Icon, SmartPhone01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { dismissInstallBanner } from "./install-cookie"
import { useInstallStore } from "./install-store"
import { canInstall, useInstallContext } from "./use-install-context"

export function InstallBanner() {
  const router = useRouter()
  const context = useInstallContext()
  const openGuide = useInstallStore((state) => state.openGuide)

  if (!canInstall(context)) {
    return null
  }

  return (
    <section className="flex flex-wrap items-center gap-3 rounded-2xl bg-chrome p-3 pl-4 text-chrome-foreground">
      <p className="min-w-0 flex-1 basis-28 text-sm text-pretty">
        <span className="font-semibold">Novo!</span> Instale o IFRN Calc e abra
        direto da tela inicial.
      </p>
      <Button
        variant="chrome"
        size="sm"
        className="shrink-0"
        onClick={() => openGuide("banner")}
      >
        <HugeiconsIcon
          data-icon="inline-start"
          strokeWidth={2}
          icon={SmartPhone01Icon}
        />
        Ver como
      </Button>
      <Button
        variant="ghost-chrome"
        size="icon-sm"
        aria-label="Fechar aviso"
        onClick={() => {
          dismissInstallBanner()
          router.refresh()
        }}
      >
        <HugeiconsIcon strokeWidth={2} icon={Cancel01Icon} />
      </Button>
    </section>
  )
}
