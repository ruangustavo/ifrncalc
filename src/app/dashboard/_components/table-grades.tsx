'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGrades } from '@/hooks/use-grades'
import { Info } from 'lucide-react'
import { Fragment } from 'react'
import { CellTable } from './cell-table'
import { ClearEditedGradesButton } from './clear-edited-grades-button'
import { TableSkeleton } from './table-skeleton'

type StageKey = 'E1' | 'E2' | 'E3' | 'E4'

export const STAGES: {
  key: StageKey
  label: string
}[] = [
  { key: 'E1', label: '1° Bimestre' },
  { key: 'E2', label: '2° Bimestre' },
  { key: 'E3', label: '3° Bimestre' },
  { key: 'E4', label: '4° Bimestre' },
] as const

export function TableGrades() {
  const { grades, isLoading, error } = useGrades()

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <Info className="size-4" />
        <AlertTitle>Houve um erro ao carregar as notas</AlertTitle>
        <AlertDescription>
          Erro ao carregar as notas. Por favor, tente novamente mais tarde.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="mb-16 md:my-2 md:m-0 space-y-2">
      <ClearEditedGradesButton />

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="md:hidden space-y-4">
            {grades?.map(grade => (
              <div
                key={grade.name}
                className="rounded-lg border border-foreground/5 bg-card p-4"
              >
                <h3 className="font-semibold mb-2">{grade.name}</h3>
                <div className="space-y-2">
                  {STAGES.map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-muted-foreground">
                        {label}
                      </span>
                      <CellTable discipline={grade} stageKey={key} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block rounded-md border border-foreground/5 bg-card">
            <Table>
              <TableCaption className="caption-top text-sm">
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
                {grades?.map(grade => (
                  <TableRow key={grade.name}>
                    <TableCell className="font-medium">{grade.name}</TableCell>
                    {[grade.E1, grade.E2, grade.E3, grade.E4].map(
                      (_, index) => (
                        <TableCell key={index}>
                          <CellTable
                            discipline={grade}
                            stageKey={`E${index + 1}`}
                          />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}
