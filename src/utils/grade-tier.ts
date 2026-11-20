export type GradeTier = "easy" | "reachable" | "hard"

export function gradeTier(needed: number): GradeTier {
  if (needed <= 40) return "easy"

  if (needed <= 90) return "reachable"

  return "hard"
}

export const TIER_SURFACE: Record<GradeTier, string> = {
  easy: "bg-grade-easy text-foreground",
  reachable: "bg-grade-reachable text-foreground",
  hard: "bg-grade-hard text-foreground",
}

export const TIER_BORDER: Record<GradeTier, string> = {
  easy: "ring-grade-easy-border",
  reachable: "ring-grade-reachable-border",
  hard: "ring-grade-hard-border",
}
