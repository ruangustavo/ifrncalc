"use client"

import { ExternalLink } from "lucide-react"
import { signIn } from "next-auth/react"
import { Suspense } from "react"

import type { GetGradesResponse } from "@/actions/get-grades"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { CellTable } from "./cell-table"
import { ClearEditedGradesButton } from "./clear-edited-grades-button"
import { GradeCard } from "./grade-card"
import { STAGES } from "./stages"
import { TableSkeleton } from "./table-skeleton"

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
    <div className="space-y-3">
      <ClearEditedGradesButton />
      <Suspense fallback={<TableSkeleton />}>
        <div className="space-y-4 md:hidden">
          {response.grades.map((grade) => (
            <GradeCard key={grade.name} grade={grade} />
          ))}
        </div>
        <div className="hidden rounded-md border border-foreground/5 bg-card md:block">
          <Table>
            <TableCaption className="caption-top">
              As notas coloridas são as médias necessárias para ser aprovado
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Disciplina</TableHead>
                {STAGES.map(({ key, label }) => (
                  <TableHead key={key}>{label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {response.grades.map((grade) => (
                <TableRow key={grade.name}>
                  <TableCell>
                    <span className="font-medium">{grade.name}</span>
                  </TableCell>
                  {STAGES.map(({ key }) => (
                    <TableCell key={key}>
                      <CellTable discipline={grade} stageKey={key} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Suspense>
    </div>
  )
}
