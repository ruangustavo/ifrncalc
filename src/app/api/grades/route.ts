import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import axios from "axios";

const currentYear = new Date().getFullYear();
const STAGE_TO_WEIGHT: Record<number, number> = { 1: 2, 2: 2, 3: 3, 4: 3 };

interface Grade {
  nota: number | null;
  faltas: number;
}

function calculatePassingGrade(grades: Grade[], numberOfAssessments: number) {
  let totalWeightNull = 0;
  let sumOfGradesNotNull = 0;

  for (let i = 0; i < grades.length && i < numberOfAssessments; i++) {
    const currentStageGrade = grades[i];
    const weight = STAGE_TO_WEIGHT[i + 1];

    if (currentStageGrade.nota === null) {
      totalWeightNull += weight;
    } else {
      sumOfGradesNotNull += currentStageGrade.nota * weight;
    }
  }

  let weightAccordingToNumberOfAssessments = 0;
  for (let i = 1; i <= numberOfAssessments; i++) {
    weightAccordingToNumberOfAssessments += STAGE_TO_WEIGHT[i];
  }

  const gradeNeededToPass = Math.round(
    (60 * weightAccordingToNumberOfAssessments - sumOfGradesNotNull) /
      totalWeightNull
  );
  return gradeNeededToPass < 0 ? 0 : Math.round(gradeNeededToPass);
}

function parseDisciplineName(discipline: string) {
  return discipline.substring(11, discipline.length).replace(/\(.*\)/, "");
}

export async function GET() {
  const session = await getServerSession(authOptions);

  const token = session?.accessToken;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const response = await axios
    .get(
      `${process.env.SUAP_URL}/api/v2/minhas-informacoes/boletim/${currentYear}/1/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);

  for (let i = 0; i < response.length; i++) {
    const discipline = response[i];

    const gradeToPass = calculatePassingGrade(
      [
        discipline.nota_etapa_1,
        discipline.nota_etapa_2,
        discipline.nota_etapa_3,
        discipline.nota_etapa_4,
      ],
      discipline.quantidade_avaliacoes
    );

    response[i] = {
      ...discipline,
      disciplina: parseDisciplineName(discipline.disciplina),
      nota_para_passar: gradeToPass,
    };
  }

  return NextResponse.json(response);
}
