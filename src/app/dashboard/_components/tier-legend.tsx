import { cn } from "@/lib/utils"
import { type GradeTier, TIER_SURFACE } from "@/utils/grade-tier"

const TIERS: { tier: GradeTier; label: string }[] = [
  { tier: "easy", label: "até 40" },
  { tier: "reachable", label: "41 a 90" },
  { tier: "hard", label: "acima de 90" },
]

export function TierLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-1 text-xs text-muted-foreground">
      <span>Cor da nota que falta:</span>
      <ul
        aria-label="Cores da nota que falta"
        className="flex flex-wrap items-center gap-x-2.5 gap-y-1"
      >
        {TIERS.map(({ tier, label }) => (
          <li key={tier} className="flex items-center gap-1">
            <span className={cn("size-2 rounded-full", TIER_SURFACE[tier])} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
