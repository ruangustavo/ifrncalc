"use client"

import { SmartPhone01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { useInstallStore } from "./install-store"
import { canInstall, useInstallContext } from "./use-install-context"

export function InstallMenuItem() {
  const context = useInstallContext()
  const openGuide = useInstallStore((state) => state.openGuide)

  if (!canInstall(context)) {
    return null
  }

  return (
    <DropdownMenuItem onSelect={() => setTimeout(() => openGuide("menu"))}>
      <HugeiconsIcon strokeWidth={2} icon={SmartPhone01Icon} />
      Instalar app
    </DropdownMenuItem>
  )
}
