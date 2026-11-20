import {
  DEMO_BOLETIM,
  DEMO_PERIOD,
  DEMO_STUDENT,
  DEMO_STUDENT_DATA,
} from "@/lib/suap/demo-student"
import type {
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
  id: DEMO_STUDENT.enrollment,
  name: DEMO_STUDENT.name,
  email: DEMO_STUDENT.email,
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

const PERIODS: PagedMeuPeriodoSchema = paged([DEMO_PERIOD])

const BOLETIM: PagedBoletimSchema = paged(DEMO_BOLETIM)

const STUDENT: MeusDadosAluno = DEMO_STUDENT_DATA

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
