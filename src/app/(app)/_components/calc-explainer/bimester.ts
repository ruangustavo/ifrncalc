import { cn } from "@/lib/utils"

export const SOLVED_AT = 8

export const BIMESTERS = [
  { label: "1º Bim", weight: 2, grade: 70, known: true, at: 2, mergeAt: 3 },
  { label: "2º Bim", weight: 2, grade: 80, known: true, at: 4, mergeAt: 5 },
  { label: "3º Bim", weight: 3, grade: 50, known: false, at: 6, mergeAt: 9 },
  { label: "4º Bim", weight: 3, grade: 50, known: false, at: 6, mergeAt: 9 },
] as const

export type Bimester = (typeof BIMESTERS)[number]

export type GroupProps = { b: Bimester; step: number }

// Opaque tints, so the merged block sliding over a copy doesn't stack two translucent layers.
export function chipClass(b: Bimester) {
  return cn(
    "grid place-items-center rounded-md border-2 text-xs font-medium tabular-nums",
    b.known
      ? "border-[color-mix(in_oklab,var(--color-primary)_30%,var(--color-background))] bg-[color-mix(in_oklab,var(--color-primary)_25%,var(--color-background))] text-foreground"
      : "border-primary bg-primary text-primary-foreground",
  )
}
