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

function calculatePassingGrade(grades: Grade[]) {
  let totalWeightNull = 0;
  let sumOfGradesNotNull = 0;

  for (let i = 0; i < grades.length; i++) {
    const currentStageGrade = grades[i];
    const weight = STAGE_TO_WEIGHT[i + 1];

    if (currentStageGrade.nota === null) {
      totalWeightNull += weight;
    } else {
      sumOfGradesNotNull += currentStageGrade.nota * weight;
    }
  }

  const gradeNeededToPass = Math.round(
    (60 * 10 - sumOfGradesNotNull) / totalWeightNull,
  );
  return gradeNeededToPass < 0 ? 0 : gradeNeededToPass;
}

export async function GET() {
  const session = await getServerSession(authOptions);

  const response = await axios
    .get(
      `https://suap.ifrn.edu.br/api/v2/minhas-informacoes/boletim/${currentYear}/1/`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    )
    .then((response) => response.data);

  for (let i = 0; i < response.length; i++) {
    const discipline = response[i];

    const gradeToPass = calculatePassingGrade([
      discipline.nota_etapa_1,
      discipline.nota_etapa_2,
      discipline.nota_etapa_3,
      discipline.nota_etapa_4,
    ]);

    response[i] = {
      ...discipline,
      nota_para_passar: gradeToPass,
    };
  }

  return NextResponse.json(response);
}
