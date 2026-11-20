import { DEMO_STUDENT } from "@/lib/suap/demo-student"
import { FIXTURE_DATA, type SuapFixture } from "@/lib/suap/fixtures"
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
  | { status: 404 | 500; data: ErrorSchema }

function paged<T>(results: T[]) {
  return { results, count: results.length, next: null, previous: null }
}

export function mockSuapResponse(
  url: string,
  fixture: SuapFixture,
): MockResponse {
  const { pathname } = new URL(url, "http://suap.mock")
  const { period, boletim, student } = FIXTURE_DATA[fixture]

  if (pathname === "/api/ensino/meus-periodos-letivos/") {
    return { status: 200, data: paged([period]) }
  }

  if (/^\/api\/ensino\/meu-boletim\/\d+\/\d+\/$/.test(pathname)) {
    return boletim === "error"
      ? { status: 500, data: { message: "SUAP fora do ar" } }
      : { status: 200, data: paged(boletim) }
  }

  if (pathname === "/api/ensino/meus-dados-aluno/") {
    return { status: 200, data: student }
  }

  return { status: 404, data: { message: `No mock for ${pathname}` } }
}
