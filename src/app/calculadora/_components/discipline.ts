import type { GradeInput } from "./calc-result"

export type DisciplineType = "annual" | "semester"

export const MIN_WEIGHT = 1
export const MAX_WEIGHT = 4

export const DISCIPLINE_TYPES: { value: DisciplineType; label: string }[] = [
  { value: "annual", label: "Anual" },
  { value: "semester", label: "Semestral" },
]

export const DEFAULT_GRADES: Record<DisciplineType, GradeInput[]> = {
  annual: [
    { value: "", weight: 2 },
    { value: "", weight: 2 },
    { value: "", weight: 3 },
    { value: "", weight: 3 },
  ],
  semester: [
    { value: "", weight: 2 },
    { value: "", weight: 3 },
  ],
}
