import type {
  BoletimSchema,
  ErrorSchema,
  MeusDadosAluno,
  PagedBoletimSchema,
  PagedMeuPeriodoSchema,
} from "@/lib/suap/generated/models"

export function isSuapMock(): boolean {
  return process.env.SUAP_MOCK === "true"
}

export const MOCK_ACCESS_TOKEN = "mock"

export const MOCK_USER = {
  id: "20250000000",
  name: "Aluno Demo",
  email: "demo@ifrn.local",
}

type MockResponse =
  | {
      status: 200
      data: PagedMeuPeriodoSchema | PagedBoletimSchema | MeusDadosAluno
    }
  | { status: 404; data: ErrorSchema }

function paged<T>(results: T[]) {
  return { results, count: results.length, next: null, previous: null }
}

function discipline(
  code: string,
  name: string,
  hours: number,
  assessments: number,
  grades: (number | null)[],
): BoletimSchema {
  const [e1, e2, e3, e4] = grades
  return {
    disciplina: `${code} - ${name}(2025.1)`,
    carga_horaria: hours,
    quantidade_avaliacoes: assessments,
    nota_etapa_1: { nota: e1 ?? null, faltas: 0 },
    nota_etapa_2: { nota: e2 ?? null, faltas: 0 },
    nota_etapa_3: { nota: e3 ?? null, faltas: 0 },
    nota_etapa_4: { nota: e4 ?? null, faltas: 0 },
    media_disciplina: null,
  }
}

const PERIODS: PagedMeuPeriodoSchema = paged([
  { ano_letivo: 2025, periodo_letivo: 1 },
])

const BOLETIM: PagedBoletimSchema = paged([
  discipline("TEC.0001", "Matemática", 120, 4, [72, 65, null, null]),
  discipline("TEC.0002", "Física", 120, 4, [30, 41, null, null]),
  discipline("TEC.0003", "Programação Web", 90, 2, [80, null]),
  discipline("TEC.0004", "Língua Portuguesa", 120, 4, [85, 90, 78, 88]),
  discipline("TEC.0005", "Inglês", 60, 4, [null, null, null, null]),
])

const STUDENT: MeusDadosAluno = {
  ingresso: "2023.1",
  email_academico: MOCK_USER.email,
  email_escolar: MOCK_USER.email,
  cpf: "000.000.000-00",
  periodo_referencia: 3,
  ira: "78.5",
  curso: "Técnico Integrado em Informática (demo)",
  matriz: "Demo",
  qtd_periodos: 4,
  situacao: "Matriculado",
  data_migracao: "",
  impressao_digital: false,
  emitiu_diploma: false,
}

export function mockSuapResponse(url: string): MockResponse {
  const { pathname } = new URL(url, "http://suap.mock")

  if (pathname === "/api/ensino/meus-periodos-letivos/") {
    return { status: 200, data: PERIODS }
  }
  if (/^\/api\/ensino\/meu-boletim\/\d+\/\d+\/$/.test(pathname)) {
    return { status: 200, data: BOLETIM }
  }
  if (pathname === "/api/ensino/meus-dados-aluno/") {
    return { status: 200, data: STUDENT }
  }
  return { status: 404, data: { message: `No mock for ${pathname}` } }
}
