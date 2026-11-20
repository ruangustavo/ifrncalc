import Link from "next/link"

import { cn } from "@/lib/utils"
import type { FinalExamOutlook } from "@/utils/final-exam"
import { gradeTier, TIER_BORDER, TIER_SURFACE } from "@/utils/grade-tier"

const FLOAT_NOISE = 1e-9

export function FinalExamBand({ outlook }: { outlook: FinalExamOutlook }) {
  if (outlook.kind === "approved") return null

  if (outlook.kind === "failed")
    return (
      <p className="mt-2 flex h-14 items-center justify-between gap-3 rounded-2xl bg-muted px-4 text-sm font-semibold">
        Prova final
        <span className="text-right text-muted-foreground">
          sem direito, média abaixo de 20
        </span>
      </p>
    )

  const needed = Math.ceil(outlook.needed - FLOAT_NOISE)
  const tier = gradeTier(needed)

  return (
    <Link
      href="/prova-final"
      className={cn(
        "mt-2 flex h-14 items-center justify-between gap-3 rounded-2xl px-4 ring-1 transition-transform duration-150 ease-snap outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-safe:active:scale-[0.98]",
        TIER_SURFACE[tier],
        TIER_BORDER[tier],
      )}
    >
      <span className="flex flex-col text-left">
        <span className="text-sm leading-none font-semibold">Prova final</span>
        <span className="mt-1 text-xs leading-none opacity-70">
          {outlook.replaces === null
            ? "pela média simples"
            : `no lugar do ${outlook.replaces + 1}º bimestre`}
        </span>
      </span>
      <span className="text-2xl leading-none font-extrabold tabular-nums">
        {needed}
      </span>
    </Link>
  )
}
