const PASSING_AVERAGE = 60
const MAX_GRADE = 100
const GRADE_DRAFT = /^\d{0,3}(?:[.,]\d?)?$/

export interface GradeInput {
  value: string
  weight: number
}

export type CalcResult =
  | { kind: "empty" }
  | { kind: "invalid" }
  | { kind: "partial"; average: number; blanks: number }
  | { kind: "needed"; needed: number; average: number; missingIndex: number }
  | { kind: "secured"; average: number; missingIndex: number }
  | {
      kind: "impossible"
      needed: number
      average: number
      missingIndex: number
    }
  | { kind: "final"; average: number; passed: boolean }

export function isGradeDraft(value: string) {
  return GRADE_DRAFT.test(value)
}

export function isGradeOutOfRange(value: string) {
  if (value.trim() === "") return false

  const parsed = Number(value.replace(",", "."))

  return Number.isNaN(parsed) || parsed < 0 || parsed > MAX_GRADE
}

export function parseGrade(value: string): number | null {
  if (value.trim() === "") return null

  return Number(value.replace(",", "."))
}

export function computeResult(active: GradeInput[]): CalcResult {
  if (active.some((grade) => isGradeOutOfRange(grade.value)))
    return { kind: "invalid" }

  const parsed = active.map((g) => ({
    value: parseGrade(g.value),
    weight: g.weight,
  }))

  const filled = parsed.filter(
    (g): g is { value: number; weight: number } => g.value !== null,
  )

  if (filled.length === 0) return { kind: "empty" }

  const filledWeightedSum = filled.reduce((s, g) => s + g.value * g.weight, 0)
  const filledWeight = filled.reduce((s, g) => s + g.weight, 0)
  const partialAverage = filledWeightedSum / filledWeight
  const blanks = parsed.length - filled.length

  if (blanks === 0) {
    return {
      kind: "final",
      average: partialAverage,
      passed: partialAverage >= PASSING_AVERAGE,
    }
  }

  if (blanks > 1) {
    return { kind: "partial", average: partialAverage, blanks }
  }

  const missingIndex = parsed.findIndex((g) => g.value === null)
  const missingWeight = parsed[missingIndex].weight
  const totalWeight = parsed.reduce((s, g) => s + g.weight, 0)

  const needed =
    (PASSING_AVERAGE * totalWeight - filledWeightedSum) / missingWeight

  if (needed <= 0)
    return { kind: "secured", average: partialAverage, missingIndex }

  if (needed > 100)
    return {
      kind: "impossible",
      needed,
      average: partialAverage,
      missingIndex,
    }

  return { kind: "needed", needed, average: partialAverage, missingIndex }
}
