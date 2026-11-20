import {
  MoreHorizontalIcon,
  MoreVerticalIcon,
  SquareArrowUp02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { siteConfig } from "@/config/site"

import { ArtScreen } from "./art-screen"
import { ArtTarget } from "./art-target"

const HOST = new URL(siteConfig.url).host

export function BrowserBarArt({ os }: { os: "ios" | "android" }) {
  return (
    <ArtScreen>
      <div className="flex items-center gap-2">
        <span className="flex h-8 flex-1 items-center justify-center rounded-full bg-card text-muted-foreground">
          {HOST}
        </span>
        <ArtTarget className="size-8 justify-center rounded-full">
          <HugeiconsIcon
            icon={os === "ios" ? MoreHorizontalIcon : MoreVerticalIcon}
            strokeWidth={2}
          />
        </ArtTarget>
      </div>
      {os === "ios" && (
        <span className="text-center text-muted-foreground">
          ou{" "}
          <HugeiconsIcon
            icon={SquareArrowUp02Icon}
            strokeWidth={2}
            className="inline size-3.5 align-[-2px]"
          />{" "}
          na barra de baixo
        </span>
      )}
    </ArtScreen>
  )
}
