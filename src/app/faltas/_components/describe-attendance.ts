import { absenceLimit, MINIMUM_RATE, rateFrom } from "@/utils/attendance"

const NEUTRAL = "bg-muted text-foreground"
const BELOW = "bg-grade-hard text-foreground"

export type AttendanceView =
  | { kind: "message"; surface: string; title: string; detail: string }
  | {
      kind: "result"
      surface: string
      rate: number
      title: string
      detail: string
    }

function parseCount(value: string): number | null {
  const trimmed = value.trim()

  if (!/^\d+$/.test(trimmed)) return null

  return Number(trimmed)
}

export function describeAttendance(
  classesInput: string,
  absencesInput: string,
): AttendanceView {
  const classes = parseCount(classesInput)
  const absences = parseCount(absencesInput)

  if (classes === null || absences === null || classes === 0)
    return {
      kind: "message",
      surface: NEUTRAL,
      title: "Preencha as aulas e as faltas",
      detail:
        "Use o total do período, somando todas as disciplinas. Os dois números estão no SUAP.",
    }

  if (absences > classes)
    return {
      kind: "message",
      surface: NEUTRAL,
      title: "Tem mais falta do que aula",
      detail: "As faltas não podem passar do total de aulas do período.",
    }

  const rate = rateFrom({ classes, absences })
  const limit = absenceLimit(classes)

  return {
    kind: "result",
    surface: rate < MINIMUM_RATE ? BELOW : NEUTRAL,
    rate,
    title:
      rate < MINIMUM_RATE
        ? `Abaixo do mínimo de ${MINIMUM_RATE}%`
        : `Acima do mínimo de ${MINIMUM_RATE}%`,
    detail: `Em ${classes} aulas, o limite é de ${limit} faltas.`,
  }
}
