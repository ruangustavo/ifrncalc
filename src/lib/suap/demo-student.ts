import type {
  BoletimSchema,
  MeuPeriodoSchema,
  MeusDadosAluno,
} from "@/lib/suap/generated/models"

export const DEMO_STUDENT = {
  enrollment: "20251164010027",
  name: "Ana Clara Fernandes",
  email: "ana.fernandes@escolar.ifrn.edu.br",
}

export const DEMO_PERIOD: MeuPeriodoSchema = {
  ano_letivo: 2026,
  periodo_letivo: 1,
}

function discipline(
  code: string,
  name: string,
  hours: number,
  grades:
    | [number | null, number | null]
    | [number | null, number | null, number | null, number | null],
  average: number | null = null,
): BoletimSchema {
  const [e1, e2, e3, e4] = grades

  return {
    disciplina: `${code} - ${name}(${DEMO_PERIOD.ano_letivo}.${DEMO_PERIOD.periodo_letivo})`,
    carga_horaria: hours,
    quantidade_avaliacoes: grades.length,
    nota_etapa_1: { nota: e1, faltas: 0 },
    nota_etapa_2: { nota: e2, faltas: 0 },
    nota_etapa_3: { nota: e3 ?? null, faltas: 0 },
    nota_etapa_4: { nota: e4 ?? null, faltas: 0 },
    media_disciplina: average,
  }
}

export const DEMO_BOLETIM: BoletimSchema[] = [
  discipline("TEC.1402", "Matemática II", 120, [72, 65, null, null]),
  discipline("TEC.1401", "Língua Portuguesa e Literatura II", 120, [
    88,
    79,
    null,
    null,
  ]),
  discipline("TEC.1405", "Física I", 90, [38, 45, null, null]),
  discipline("TEC.1406", "Química II", 90, [10, 12, null, null]),
  discipline("TEC.1409", "Geografia II", 60, [98, 96, null, null]),
  discipline("TEC.1411", "Inglês II", 60, [95, 92, null, null]),
  discipline("TEC.1431", "Programação Orientada a Objetos", 120, [85, null]),
  discipline("TEC.1433", "Autoria Web", 60, [70, 82], 77),
]

export const DEMO_STUDENT_DATA: MeusDadosAluno = {
  ingresso: "2025.1",
  email_academico: DEMO_STUDENT.email,
  email_escolar: DEMO_STUDENT.email,
  cpf: "000.000.000-00",
  periodo_referencia: 2,
  ira: "81.4",
  curso: "Técnico Integrado em Informática · Pau dos Ferros",
  matriz: "Informática Integrado 2025",
  qtd_periodos: 4,
  situacao: "Matriculado",
  data_migracao: "",
  impressao_digital: false,
  emitiu_diploma: false,
}
