import type { Discipline } from "@/actions/get-grades"
import type {
  BoletimSchema,
  NotaBoletimSchema,
} from "@/lib/suap/generated/models"

import { type Attendance, toAttendance } from "../../utils/attendance.ts"

const BIMESTER_WEIGHTS = [2, 2, 3, 3]

type StageGrade = Discipline["E1"]

interface Grade {
  nota: number | null
  faltas: number
}

interface NormalizedDiscipline {
  codigo_diario?: string
  disciplina: string
  nota_etapa_1: Grade
  nota_etapa_2: Grade
  nota_etapa_3: Grade
  nota_etapa_4: Grade
  quantidade_avaliacoes: number
  first_bimester: 1 | 3
  carga_horaria: number
  media_disciplina: number | null
  nota_avaliacao_final: number | null
  attendance: Attendance | null
}

function resolveGrade(nota: NotaBoletimSchema | undefined): Grade {
  return { nota: nota?.nota ?? null, faltas: nota?.faltas ?? 0 }
}

function normalizeDiscipline(
  boletim: BoletimSchema,
): NormalizedDiscipline | null {
  if (!boletim.disciplina) return null

  return {
    codigo_diario: boletim.codigo_diario,
    disciplina: boletim.disciplina,
    nota_etapa_1: resolveGrade(boletim.nota_etapa_1),
    nota_etapa_2: resolveGrade(boletim.nota_etapa_2),
    nota_etapa_3: resolveGrade(boletim.nota_etapa_3),
    nota_etapa_4: resolveGrade(boletim.nota_etapa_4),
    quantidade_avaliacoes: boletim.quantidade_avaliacoes ?? 0,
    first_bimester:
      boletim.segundo_semestre === true && boletim.quantidade_avaliacoes === 2
        ? 3
        : 1,
    carga_horaria: boletim.carga_horaria ?? 0,
    media_disciplina: boletim.media_disciplina ?? null,
    nota_avaliacao_final: boletim.nota_avaliacao_final?.nota ?? null,
    attendance: toAttendance(boletim),
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

const CODE_SEPARATOR = " - "

function parseDisciplineName(discipline: string): string {
  const codeEnd = discipline.indexOf(CODE_SEPARATOR)

  const withoutCode =
    codeEnd === -1
      ? discipline
      : discipline.slice(codeEnd + CODE_SEPARATOR.length)

  return withoutCode.replace(/\(\d{4}\.\d\)$/, "").trim()
}

export function toDisciplines(results: BoletimSchema[]): Discipline[] {
  return results
    .flatMap((boletim) => normalizeDiscipline(boletim) ?? [])
    .map((discipline, position) => {
      const suapStages = [
        discipline.nota_etapa_1,
        discipline.nota_etapa_2,
        discipline.nota_etapa_3,
        discipline.nota_etapa_4,
      ]

      const isAssessed = (bimester: number) =>
        bimester >= discipline.first_bimester &&
        bimester < discipline.first_bimester + discipline.quantidade_avaliacoes

      const gradeToPass = calculatePassingGrade(
        suapStages,
        discipline.quantidade_avaliacoes,
      )

      const createStageGrade = (bimester: number): StageGrade => {
        const suapIndex = bimester - discipline.first_bimester

        const grade = suapIndex >= 0 ? suapStages[suapIndex].nota : null

        const isAvailable = grade == null && isAssessed(bimester)

        return {
          grade,
          isAvailable,
          passingGrade: isAvailable
            ? gradeToPass
            : isAssessed(bimester)
              ? 0
              : -1,
        }
      }

      return {
        id: discipline.codigo_diario ?? `${position}:${discipline.disciplina}`,
        name: parseDisciplineName(discipline.disciplina),
        hours: discipline.carga_horaria,
        partialAverage: discipline.media_disciplina,
        finalExamGrade: discipline.nota_avaliacao_final,
        attendance: discipline.attendance,
        E1: createStageGrade(1),
        E2: createStageGrade(2),
        E3: createStageGrade(3),
        E4: createStageGrade(4),
      }
    })
}
