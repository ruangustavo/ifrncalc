import { BrandMark } from "@/app/(app)/_components/brand-mark"

import { ArtScreen } from "./art-screen"
import { ArtTarget } from "./art-target"

export function ConfirmArt({ action }: { action: string }) {
  return (
    <ArtScreen>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Cancelar</span>
        <ArtTarget className="px-2 py-1">{action}</ArtTarget>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-card p-1.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-chrome">
          <BrandMark
            className="size-4 text-chrome-foreground"
            dotClassName="fill-grade-hard"
          />
        </span>
        <span className="font-semibold text-foreground">IFRN Calc</span>
      </div>
    </ArtScreen>
  )
}
