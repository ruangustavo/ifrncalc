import {
  type GradeInput,
  isGradeOutOfRange,
  parseGrade,
} from "@/app/calculadora/_components/calc-result"
import { formatAverage } from "@/app/calculadora/_components/describe-result"
import { finalExamOutlook, type Stage } from "@/utils/final-exam"
import { gradeTier, TIER_SURFACE } from "@/utils/grade-tier"

const NEUTRAL = "bg-muted text-foreground"
const FLOAT_NOISE = 1e-9

function toStages(grades: GradeInput[]): Stage[] | null {
  const stages: Stage[] = []

  for (const input of grades) {
    const grade = parseGrade(input.value)

    if (grade === null) return null

    stages.push({ grade, weight: input.weight })
  }

  return stages
}

export function describeOutlook(grades: GradeInput[]) {
  if (grades.some((grade) => isGradeOutOfRange(grade.value)))
    return {
      surface: NEUTRAL,
      label: null,
      number: null,
      title: "As notas vão de 0 a 100",
      detail: "Corrija a nota em vermelho.",
    }

  const stages = toStages(grades)

  if (stages === null) {
    const blanks = grades.filter((grade) => grade.value.trim() === "").length

    if (blanks === grades.length)
      return {
        surface: NEUTRAL,
        label: null,
        number: null,
        title: "Quanto falta na prova final?",
        detail: `Digite as ${grades.length} notas dos bimestres, como estão no SUAP.`,
      }

    return {
      surface: NEUTRAL,
      label: null,
      number: null,
      title: blanks === 1 ? "Falta 1 nota" : `Faltam ${blanks} notas`,
      detail:
        "A conta aparece quando todos os bimestres estiverem preenchidos.",
    }
  }

  const outlook = finalExamOutlook(stages)
  const average = formatAverage(outlook.average)

  if (outlook.kind === "approved")
    return {
      surface: TIER_SURFACE.easy,
      label: "Média",
      number: average,
      title: "Você já passou",
      detail: "Com 60 ou mais não tem prova final.",
    }

  if (outlook.kind === "failed")
    return {
      surface: TIER_SURFACE.hard,
      label: "Média",
      number: average,
      title: "Sem prova final",
      detail: "Com média abaixo de 20 não dá pra fazer a prova final.",
    }

  const needed = Math.ceil(outlook.needed - FLOAT_NOISE)

  return {
    surface: TIER_SURFACE[gradeTier(needed)],
    label: "Precisa de",
    number: String(needed),
    title: "na prova final",
    detail:
      outlook.replaces === null
        ? `Vale a média entre a sua média (${average}) e a prova.`
        : `A prova entra no lugar do ${outlook.replaces + 1}º bimestre · média ${average}`,
  }
}
