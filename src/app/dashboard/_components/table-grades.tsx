"use client"

import { ExternalLink } from "lucide-react"
import { signIn } from "next-auth/react"
import { Suspense } from "react"

import type { GetGradesResponse } from "@/actions/get-grades"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

import { CellTable } from "./cell-table"
import { ClearEditedGradesButton } from "./clear-edited-grades-button"
import { DisciplineMeta } from "./discipline-meta"
import { STAGES } from "./stages"
import { TableSkeleton } from "./table-skeleton"
import { TierLegend } from "./tier-legend"

interface TableGradesProps {
  gradesResponse: GetGradesResponse
}

export function TableGrades({ gradesResponse }: TableGradesProps) {
  const response = gradesResponse

  if (!response.success) {
    return (
      <div className="space-y-3">
        <ClearEditedGradesButton />
        <Alert variant="destructive">
          <AlertDescription>
            <div className="space-y-3">
              <p>{response.message}</p>
              <Button
                onClick={() => signIn("suap")}
                variant="outline-destructive"
                size="sm"
              >
                Entrar novamente
                <ExternalLink className="ml-2 size-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!response.grades || response.grades.length === 0) {
    return (
      <div className="space-y-3">
        <ClearEditedGradesButton />
        <Alert>
          <AlertDescription>
            Nenhuma disciplina encontrada para este período.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex min-h-8 flex-wrap items-center gap-x-4 gap-y-2">
        <TierLegend />
        <ClearEditedGradesButton />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <ul className="divide-y overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10 md:hidden">
          {response.grades.map((grade) => (
            <li key={grade.name} className="px-4 pt-3.5 pb-4">
              <h3 className="font-bold">{grade.name}</h3>
              <DisciplineMeta discipline={grade} />
              <div className="mt-3 grid grid-cols-4 gap-2">
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
              </tr>
            </thead>
            <tbody>
              {response.grades.map((grade) => (
                <tr key={grade.name} className="border-b last:border-0">
                  <th scope="row" className="px-6 py-4 text-left">
                    <span className="text-lg leading-tight font-bold">
                      {grade.name}
                    </span>
                    <DisciplineMeta discipline={grade} />
                  </th>
                  {STAGES.map(({ key }) => (
                    <td key={key} className="px-6 py-4">
                      <CellTable discipline={grade} stageKey={key} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Suspense>
    </div>
  )
}
