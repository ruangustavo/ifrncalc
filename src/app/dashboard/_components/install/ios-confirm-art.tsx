import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ArtScreen } from "./art-screen"
import { ArtTarget } from "./art-target"

export function IosConfirmArt() {
  return (
    <ArtScreen>
      <div className="flex items-center justify-between">
        <span className="flex size-6 items-center justify-center rounded-full bg-card text-muted-foreground">
          <HugeiconsIcon
            icon={Cancel01Icon}
            strokeWidth={2}
            className="size-3.5"
          />
        </span>
        <span className="font-semibold text-foreground">
          Adicionar à Tela de Início
        </span>
        <ArtTarget className="px-2 py-1">Adicionar</ArtTarget>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-card px-2 py-1.5">
        <span className="font-semibold text-foreground">
          Abrir como App Web
        </span>
        <span className="flex h-4 w-7 items-center justify-end rounded-full bg-primary p-0.5">
          <span className="size-3 rounded-full bg-card" />
        </span>
      </div>
    </ArtScreen>
  )
}
