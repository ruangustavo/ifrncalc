import {
  DEMO_BOLETIM,
  DEMO_PERIOD,
  DEMO_STUDENT_DATA,
} from "@/lib/suap/demo-student"
import type {
  BoletimSchema,
  MeuPeriodoSchema,
  MeusDadosAluno,
} from "@/lib/suap/generated/models"

export const SUAP_FIXTURES = [
  "demo",
  "worst",
  "empty",
  "one",
  "many",
  "error",
] as const

export type SuapFixture = (typeof SUAP_FIXTURES)[number]

export const SUAP_FIXTURE_COOKIE = "suap-fixture"

export function parseSuapFixture(value: string | undefined): SuapFixture {
  return SUAP_FIXTURES.find((fixture) => fixture === value) ?? "demo"
}

interface FixtureData {
  period: MeuPeriodoSchema
  boletim: BoletimSchema[] | "error"
  student: MeusDadosAluno
}

const WORST_PERIOD: MeuPeriodoSchema = { ano_letivo: 2026, periodo_letivo: 2 }

function diary(
  disciplina: string,
  hours: number,
  grades: (number | null)[],
  average: number | null = null,
): BoletimSchema {
  const [e1, e2, e3, e4] = grades

  return {
    disciplina: `${disciplina}(${WORST_PERIOD.ano_letivo}.${WORST_PERIOD.periodo_letivo})`,
    carga_horaria: hours,
    quantidade_avaliacoes: grades.length,
    nota_etapa_1: { nota: e1 ?? null, faltas: 0 },
    nota_etapa_2: { nota: e2 ?? null, faltas: 0 },
    nota_etapa_3: { nota: e3 ?? null, faltas: 0 },
    nota_etapa_4: { nota: e4 ?? null, faltas: 0 },
    media_disciplina: average,
  }
}

const WORST_DIARIES: BoletimSchema[] = [
  diary(
    "TEC.0291 - Prática Profissional (Projeto Integrador de Sistemas Corporativos)",
    80,
    [62, null, null, null],
  ),
  diary(
    "TEC.0217 - Língua Portuguesa e Literatura Brasileira: Leitura, Produção Textual e Análise Linguística",
    120,
    [87.5, 64, null, null],
  ),
  diary("TEC.0204 - Física II", 90, [5, 0, 0, null]),
  diary("TEC.0230 - Matemática II", 120, [100, 100, 100, null]),
  diary("TEC.0230 - Matemática II", 120, [35, 40, null, null]),
  diary(
    "TEC.0299 - Seminário de Orientação para a Prática Profissional",
    0,
    [],
  ),
  diary("TEC.0240 - Artes", 30, [90, 85], 88),
  diary("TEC.0250 - Educação Física", 60, [0, 0, null, null]),
]

const WORST_BOLETIM: BoletimSchema[] = WORST_DIARIES.map((entry, i) => ({
  ...entry,
  codigo_diario: String(81_240 + i),
}))

const WORST_STUDENT: MeusDadosAluno = {
  ...DEMO_STUDENT_DATA,
  curso:
    "Técnico de Nível Médio em Manutenção e Suporte em Informática, na Forma Integrada · São Paulo do Potengi",
  periodo_referencia: 1,
  ira: "0.00",
}

const MANY_BOLETIM: BoletimSchema[] = [
  ...DEMO_BOLETIM,
  ...[
    "Biologia II",
    "História II",
    "Filosofia II",
    "Sociologia II",
    "Artes II",
    "Educação Física II",
    "Espanhol II",
    "Arquitetura de Computadores",
    "Banco de Dados",
    "Redes de Computadores",
    "Sistemas Operacionais",
    "Análise e Projeto de Sistemas",
    "Desenvolvimento de Jogos",
    "Empreendedorismo",
  ].map((name, i) =>
    diary(`TEC.${1500 + i} - ${name}`, 60, [
      40 + i * 3,
      30 + i * 4,
      null,
      null,
    ]),
  ),
]

export const FIXTURE_DATA: Record<SuapFixture, FixtureData> = {
  demo: {
    period: DEMO_PERIOD,
    boletim: DEMO_BOLETIM,
    student: DEMO_STUDENT_DATA,
  },
  worst: {
    period: WORST_PERIOD,
    boletim: WORST_BOLETIM,
    student: WORST_STUDENT,
  },
  empty: { period: DEMO_PERIOD, boletim: [], student: DEMO_STUDENT_DATA },
  one: {
    period: DEMO_PERIOD,
    boletim: DEMO_BOLETIM.slice(0, 1),
    student: DEMO_STUDENT_DATA,
  },
  many: {
    period: DEMO_PERIOD,
    boletim: MANY_BOLETIM,
    student: DEMO_STUDENT_DATA,
  },
  error: { period: DEMO_PERIOD, boletim: "error", student: DEMO_STUDENT_DATA },
}
