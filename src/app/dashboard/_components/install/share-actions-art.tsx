import {
  ArrowDown01Icon,
  Bookmark02Icon,
  Copy01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ArtScreen } from "./art-screen"
import { ArtTarget } from "./art-target"

const ACTIONS = [
  { icon: Copy01Icon, label: "Copiar" },
  { icon: Bookmark02Icon, label: "Favoritos" },
]

export function ShareActionsArt() {
  return (
    <ArtScreen>
      <div className="flex items-start justify-around">
        {ACTIONS.map((action) => (
          <span
            key={action.label}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-card">
              <HugeiconsIcon icon={action.icon} strokeWidth={2} />
            </span>
            {action.label}
          </span>
        ))}
        <span className="flex flex-col items-center gap-1 font-semibold text-primary">
          <ArtTarget className="size-10 justify-center rounded-full">
            <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
          </ArtTarget>
          Ver mais
        </span>
      </div>
    </ArtScreen>
  )
}
