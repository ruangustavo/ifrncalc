import type { Discipline } from "@/actions/get-grades"
import type {
  BoletimSchema,
  NotaBoletimSchema,
} from "@/lib/suap/generated/models"

const BIMESTER_WEIGHTS = [2, 2, 3, 3]

type StageGrade = Discipline["E1"]

interface Grade {
  nota: number | null
  faltas: number
}

interface NormalizedDiscipline {
  disciplina: string
  nota_etapa_1: Grade
  nota_etapa_2: Grade
  nota_etapa_3: Grade
  nota_etapa_4: Grade
  quantidade_avaliacoes: number
  carga_horaria: number
  media_disciplina: number | null
}

function resolveGrade(nota: NotaBoletimSchema | undefined): Grade {
  return { nota: nota?.nota ?? null, faltas: nota?.faltas ?? 0 }
}

function normalizeDiscipline(
  boletim: BoletimSchema,
): NormalizedDiscipline | null {
  if (!boletim.disciplina) return null

  return {
    disciplina: boletim.disciplina,
    nota_etapa_1: resolveGrade(boletim.nota_etapa_1),
    nota_etapa_2: resolveGrade(boletim.nota_etapa_2),
    nota_etapa_3: resolveGrade(boletim.nota_etapa_3),
    nota_etapa_4: resolveGrade(boletim.nota_etapa_4),
    quantidade_avaliacoes: boletim.quantidade_avaliacoes ?? 0,
    carga_horaria: boletim.carga_horaria ?? 0,
    media_disciplina: boletim.media_disciplina ?? null,
  }
}

const getWeight = (
  currentIndex: number,
  numberOfAssessments: number,
): number => {
  const isSemester = numberOfAssessments === 2

  return isSemester
    ? currentIndex === 0
      ? 2
      : 3
    : BIMESTER_WEIGHTS[currentIndex]
}

function calculatePassingGrade(
  grades: Grade[],
  numberOfAssessments: number,
): number {
  let totalWeightNull = 0
  let sumOfGradesNotNull = 0

  for (let i = 0; i < grades.length && i < numberOfAssessments; i++) {
    const currentStageGrade = grades[i]
    const weight = getWeight(i, numberOfAssessments)

    if (currentStageGrade.nota === null) {
      totalWeightNull += weight
    } else {
      sumOfGradesNotNull += currentStageGrade.nota * weight
    }
  }

  const weightAccordingToNumberOfAssessments = Array.from(
    { length: numberOfAssessments },
    (_, i) => getWeight(i, numberOfAssessments) || 0,
  ).reduce((sum, weight) => sum + weight, 0)

  const gradeNeededToPass =
    (60 * weightAccordingToNumberOfAssessments - sumOfGradesNotNull) /
    totalWeightNull

  return gradeNeededToPass < 0 ? 0 : Math.round(gradeNeededToPass)
}

function parseDisciplineName(discipline: string): string {
  return discipline.substring(11).replace(/\(.*\)/, "")
}

export function toDisciplines(results: BoletimSchema[]): Discipline[] {
  return results
    .flatMap((boletim) => normalizeDiscipline(boletim) ?? [])
    .map((discipline) => {
      const gradeToPass = calculatePassingGrade(
        [
          discipline.nota_etapa_1,
          discipline.nota_etapa_2,
          discipline.nota_etapa_3,
          discipline.nota_etapa_4,
        ],
        discipline.quantidade_avaliacoes,
      )

      const isAvailable = (grade: number | null, index: number) =>
        grade == null && index <= discipline.quantidade_avaliacoes

      const createStageGrade = (grade: Grade, index: number): StageGrade => ({
        grade: grade.nota,
        isAvailable: isAvailable(grade.nota, index),
        passingGrade: isAvailable(grade.nota, index)
          ? gradeToPass
          : discipline.quantidade_avaliacoes >= index
            ? 0
            : -1,
      })

      return {
        name: parseDisciplineName(discipline.disciplina),
        hours: discipline.carga_horaria,
        partialAverage: discipline.media_disciplina,
        E1: createStageGrade(discipline.nota_etapa_1, 1),
        E2: createStageGrade(discipline.nota_etapa_2, 2),
        E3: createStageGrade(discipline.nota_etapa_3, 3),
        E4: createStageGrade(discipline.nota_etapa_4, 4),
      }
    })
}
