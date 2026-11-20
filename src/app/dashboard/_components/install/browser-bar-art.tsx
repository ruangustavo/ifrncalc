import { MoreVerticalIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { siteConfig } from "@/config/site"

import { ArtScreen } from "./art-screen"
import { ArtTarget } from "./art-target"

const HOST = new URL(siteConfig.url).host

export function BrowserBarArt() {
  return (
    <ArtScreen>
      <div className="flex items-center gap-2">
        <span className="flex h-8 flex-1 items-center justify-center rounded-full bg-card text-muted-foreground">
          {HOST}
        </span>
        <ArtTarget className="size-8 justify-center rounded-full">
          <HugeiconsIcon icon={MoreVerticalIcon} strokeWidth={2} />
        </ArtTarget>
      </div>
    </ArtScreen>
  )
}
