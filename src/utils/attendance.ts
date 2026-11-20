import type { BoletimSchema } from "@/lib/suap/generated/models"

export const MINIMUM_RATE = 75

export interface Attendance {
  absences: number
  rate: number
  classesHeld: number
}

type AttendanceFields = Pick<
  BoletimSchema,
  | "carga_horaria_cumprida"
  | "numero_faltas"
  | "percentual_carga_horaria_frequentada"
>

export function toAttendance(boletim: AttendanceFields): Attendance | null {
  const rate = boletim.percentual_carga_horaria_frequentada
  const classesHeld = boletim.carga_horaria_cumprida

  if (!classesHeld || rate === undefined) return null

  return {
    absences: boletim.numero_faltas ?? 0,
    rate: Math.floor(rate),
    classesHeld,
  }
}

export function describeAbsences(count: number): string {
  if (count === 0) return "nenhuma falta"

  return count === 1 ? "1 falta" : `${count} faltas`
}

export function rateFrom({
  classes,
  absences,
}: {
  classes: number
  absences: number
}): number {
  return Math.floor(((classes - absences) * 100) / classes)
}

export function absenceLimit(classes: number): number {
  return Math.floor((classes * (100 - MINIMUM_RATE)) / 100)
}
