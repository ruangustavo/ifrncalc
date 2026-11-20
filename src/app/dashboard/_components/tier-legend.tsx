import { cn } from "@/lib/utils"
import { type GradeTier, TIER_RANGE, TIER_SURFACE } from "@/utils/grade-tier"

const TIERS: GradeTier[] = ["easy", "reachable", "hard"]

export function TierLegend() {
  return (
    <ul
      aria-label="Cores da nota que falta"
      className="flex flex-wrap items-center gap-1.5 text-xs font-semibold"
    >
      {TIERS.map((tier) => (
        <li
          key={tier}
          className={cn("rounded-full px-2.5 py-1", TIER_SURFACE[tier])}
        >
          {TIER_RANGE[tier]}
        </li>
      ))}
    </ul>
  )
}
