'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { useGrades } from '@/hooks/use-grades'
import { useGradesStore } from '@/store/grades'
import { CheckCircle, Info, Trash2 } from 'lucide-react'
import { Fragment } from 'react'
import { CellTable } from './cell-table'
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
  const { clearEditedGrades } = useGradesStore()
  const { grades, isLoading, error } = useGrades()
  const { toast } = useToast()

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

  const handleClearEditedGrades = () => {
    clearEditedGrades()

    toast({
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="size-4 text-green-500" />
          <span className="font-medium">
            As notas editadas foram limpas com sucesso!
          </span>
        </div>
      ),
    })
  }

  return (
    <div className="mb-16 md:my-2 md:m-0 space-y-2">
      <Button
        size="xs"
        variant="outline"
        onClick={handleClearEditedGrades}
        className="md:flex md:items-center md:gap-1.5 md:ml-auto
        fixed bottom-4 left-1/2 -translate-x-1/2 z-10 md:static md:translate-x-0
        flex items-center gap-1.5 w-[calc(100%-2rem)] md:w-auto"
      >
        <Trash2 className="size-4" />
        Limpar notas editadas
      </Button>

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
