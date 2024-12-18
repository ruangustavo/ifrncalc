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
        <div className="rounded-md border border-foreground/5 bg-card">
          <Table>
            <TableCaption className="block caption-top text-xs md:hidden md:text-sm">
              As notas coloridas são as médias necessárias para ser aprovado
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full md:w-[300px]">
                  Disciplina
                </TableHead>
                <TableHead className="hidden md:table-cell">E1</TableHead>
                <TableHead className="hidden md:table-cell">E2</TableHead>
                <TableHead className="hidden md:table-cell">E3</TableHead>
                <TableHead className="hidden md:table-cell">E4</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades?.map(grade => (
                <TableRow key={grade.name}>
                  <TableCell className="font-medium">
                    <span className="font-semibold">{grade.name}</span>

                    <dl className="font-normal md:hidden">
                      {STAGES.map(({ key, label }) => (
                        <Fragment key={key}>
                          <dt className="sr-only">{key}</dt>
                          <dd className="flex items-center gap-1.5 py-2">
                            {label}:
                            <CellTable discipline={grade} stageKey={key} />
                          </dd>
                        </Fragment>
                      ))}
                    </dl>
                  </TableCell>
                  {[grade.E1, grade.E2, grade.E3, grade.E4].map((_, index) => (
                    <TableCell key={index} className="hidden md:table-cell">
                      <CellTable
                        discipline={grade}
                        stageKey={`E${index + 1}`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
