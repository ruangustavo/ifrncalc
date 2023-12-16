import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { LRUCache } from 'lru-cache'
import { Discipline } from '@/app/dashboard/_components/columns'

const cache = new LRUCache({
  max: 20,
  ttl: 1000 * 60 * 60 * 2, // 2 hours
})
const currentYear = new Date().getFullYear()
const STAGE_TO_WEIGHT: Record<number, number> = { 1: 2, 2: 2, 3: 3, 4: 3 }

interface Grade {
  nota: number | null
  faltas: number
}

function calculatePassingGrade(grades: Grade[], numberOfAssessments: number) {
  let totalWeightNull = 0
  let sumOfGradesNotNull = 0

  for (let i = 0; i < grades.length && i < numberOfAssessments; i++) {
    const currentStageGrade = grades[i]
    const weight = STAGE_TO_WEIGHT[i + 1]

    if (currentStageGrade.nota === null) {
      totalWeightNull += weight
    } else {
      sumOfGradesNotNull += currentStageGrade.nota * weight
    }
  }

  const weightAccordingToNumberOfAssessments = Array.from(
    { length: numberOfAssessments },
    (_, i) => STAGE_TO_WEIGHT[i + 1] || 0,
  ).reduce((sum, weight) => sum + weight, 0)

  const gradeNeededToPass =
    (60 * weightAccordingToNumberOfAssessments - sumOfGradesNotNull) /
    totalWeightNull
  return gradeNeededToPass < 0 ? 0 : Math.round(gradeNeededToPass)
}

function parseDisciplineName(discipline: string) {
  return discipline.substring(11, discipline.length).replace(/\(.*\)/, '')
}

export async function GET() {
  const session = await getServerSession(authOptions)

  const token = session?.accessToken
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const cachedGrades = cache.get(session.user.email as string)
  if (cachedGrades) {
    return NextResponse.json(cachedGrades)
  }

  const response = await fetch(
    `${process.env.SUAP_URL}/api/v2/minhas-informacoes/boletim/${currentYear}/1/`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => res.json())

  const grades: Discipline[] = []
  for (let i = 0; i < response.length; i++) {
    const discipline = response[i]

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const disciplineObj: any = {
      name: parseDisciplineName(discipline.disciplina),
    }

    for (let j = 1; j <= 4; j++) {
      const grade = discipline[`nota_etapa_${j}`].nota
      const isCurrentStageAvailable = isAvailable(grade, j)

      disciplineObj[`E${j}`] = {
        grade,
        isAvailable: isCurrentStageAvailable,
        passingGrade: isCurrentStageAvailable
          ? gradeToPass
          : discipline.quantidade_avaliacoes >= j
            ? 0
            : -1,
      }
    }

    grades.push(disciplineObj)
  }

  cache.set(session.user.email as string, grades)
  return NextResponse.json(grades)
}
