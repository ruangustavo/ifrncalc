"use client"

import { ExternalLink } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Suspense } from "react"

import type { GetGradesResponse } from "@/actions/get-grades"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { disciplineOutlook, type FinalExamOutlook } from "@/utils/final-exam"

import { AttendanceMeter } from "./attendance-meter"
import { AttendanceSummary } from "./attendance-summary"
import { CellTable } from "./cell-table"
import { ClearEditedGradesButton } from "./clear-edited-grades-button"
import { DisciplineMeta } from "./discipline-meta"
import { FinalExamBand } from "./final-exam-band"
import { STAGES } from "./stages"
import { TableSkeleton } from "./table-skeleton"
import { TierLegend } from "./tier-legend"

interface TableGradesProps {
  gradesResponse: GetGradesResponse
}

function examRank(outlook: FinalExamOutlook | null) {
  return outlook?.kind === "exam" ? outlook.needed : Number.POSITIVE_INFINITY
}

export function TableGrades({ gradesResponse }: TableGradesProps) {
  const response = gradesResponse
  const router = useRouter()

  if (!response.success) {
    return (
      <div className="space-y-3">
        <ClearEditedGradesButton />
        <Alert variant="destructive">
          <AlertDescription>
            <div className="space-y-3">
              <p>{response.message}</p>
              {response.reason === "session" ? (
                <Button
                  onClick={() => signIn("suap")}
                  variant="outline-destructive"
                  size="sm"
                >
                  Entrar novamente
                  <ExternalLink className="ml-2 size-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => router.refresh()}
                  variant="outline-destructive"
                  size="sm"
                >
                  Tentar de novo
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (response.grades.length === 0) {
    return (
      <div className="space-y-3">
        <ClearEditedGradesButton />
        <Alert>
          <AlertDescription>
            <p className="text-pretty">
              Nenhuma disciplina encontrada para este período.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const rows = response.grades
    .map((grade) => ({ grade, outlook: disciplineOutlook(grade) }))
    .toSorted((a, b) => examRank(a.outlook) - examRank(b.outlook))

  return (
    <div className="space-y-4">
      <div className="flex justify-end empty:hidden">
        <ClearEditedGradesButton />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <ul className="divide-y overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10 md:hidden">
          {rows.map(({ grade, outlook }) => (
            <li key={grade.id} className="@container px-4 pt-3.5 pb-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-bold">{grade.name}</h3>
                <AttendanceSummary attendance={grade.attendance} />
              </div>
              <DisciplineMeta discipline={grade} />
              <div className="mt-3 grid grid-cols-4 gap-2 @max-[15rem]:grid-cols-2">
                {STAGES.map(({ key, shortLabel }) => (
                  <CellTable
                    key={key}
                    discipline={grade}
                    stageKey={key}
                    shortLabel={shortLabel}
                    compact
                  />
                ))}
              </div>
              {outlook && <FinalExamBand outlook={outlook} />}
            </li>
          ))}
        </ul>
        <div className="hidden overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10 md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-xs tracking-wide text-muted-foreground uppercase">
                <th className="w-1/3 px-6 py-4 font-semibold">Disciplina</th>
                {STAGES.map(({ key, label }) => (
                  <th key={key} className="px-6 py-4 font-semibold">
                    {label}
                  </th>
                ))}
                <th className="w-64 px-6 py-4 font-semibold">Frequência</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ grade, outlook }) => (
                <tr key={grade.id} className="border-b last:border-0">
                  <th scope="row" className="px-6 py-4 text-left">
                    <span className="text-lg leading-tight font-bold">
                      {grade.name}
                    </span>
                    <DisciplineMeta discipline={grade} />
                    {outlook && <FinalExamBand outlook={outlook} />}
                  </th>
                  {STAGES.map(({ key }) => (
                    <td key={key} className="px-6 py-4">
                      <CellTable discipline={grade} stageKey={key} />
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <AttendanceMeter attendance={grade.attendance} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TierLegend />
      </Suspense>
    </div>
  )
}
