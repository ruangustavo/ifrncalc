import { PlusSignSquareIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ArtScreen } from "./art-screen"
import { ArtTarget } from "./art-target"

export function MenuArt({
  above,
  target,
  below,
}: {
  above: string
  target: string
  below: string
}) {
  return (
    <ArtScreen>
      <span className="px-2 text-muted-foreground">{above}</span>
      <ArtTarget className="justify-between px-2 py-1.5">
        {target}
        <HugeiconsIcon
          icon={PlusSignSquareIcon}
          strokeWidth={2}
          className="size-3.5"
        />
      </ArtTarget>
      <span className="px-2 text-muted-foreground">{below}</span>
    </ArtScreen>
  )
}
