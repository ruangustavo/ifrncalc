import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Book02Icon,
  Layers01Icon,
  SquareArrowUp02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ArtScreen } from "./art-screen"
import { ArtTarget } from "./art-target"

export function IosToolbarArt() {
  return (
    <ArtScreen>
      <div className="flex items-center justify-around rounded-full bg-card px-2 py-1 text-muted-foreground">
        <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
        <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        <ArtTarget className="size-8 justify-center rounded-full">
          <HugeiconsIcon icon={SquareArrowUp02Icon} strokeWidth={2} />
        </ArtTarget>
        <HugeiconsIcon icon={Book02Icon} strokeWidth={2} />
        <HugeiconsIcon icon={Layers01Icon} strokeWidth={2} />
      </div>
      <span className="text-center text-muted-foreground">
        ou dentro do ⋯, ao lado do endereço
      </span>
    </ArtScreen>
  )
}
