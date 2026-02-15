"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ExternalLink } from "lucide-react"
import { signIn } from "next-auth/react"
import { Suspense, useState } from "react"
import type { Discipline, GetGradesResponse } from "@/actions/get-grades"
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
import { cn } from "@/lib/utils"

import { CellTable } from "./cell-table"
import { ClearEditedGradesButton } from "./clear-edited-grades-button"
import { TableSkeleton } from "./table-skeleton"

type StageKey = "E1" | "E2" | "E3" | "E4"

interface TableGradesProps {
  gradesResponse: GetGradesResponse
}

export const STAGES: {
  key: StageKey
  label: string
  shortLabel: string
}[] = [
  { key: "E1", label: "1° Bimestre", shortLabel: "1º Bim" },
  { key: "E2", label: "2° Bimestre", shortLabel: "2º Bim" },
  { key: "E3", label: "3° Bimestre", shortLabel: "3º Bim" },
  { key: "E4", label: "4° Bimestre", shortLabel: "4º Bim" },
] as const

function GradeCard({ grade }: { grade: Discipline }) {
  const [isExpanded, setIsExpanded] = useState(true)

  const calculatePartialAverage = (grade: Discipline) => {
    const stages = [grade.E1, grade.E2, grade.E3, grade.E4]
    const filled = stages.filter((s) => s.grade !== null)
    if (filled.length === 0) return null
    const sum = filled.reduce((acc, s) => acc + (s.grade ?? 0), 0)
    return Math.round(sum / filled.length)
  }

  const partialAverage = grade.partialAverage ?? calculatePartialAverage(grade)

  return (
    <div className="rounded-xl bg-card p-4">
      <button
        type="button"
        className="flex w-full items-start gap-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div
          className={cn(
            "mt-1 h-10 w-1.5 shrink-0 rounded-full",
            partialAverage === null
              ? "bg-primary"
              : {
                  "bg-green-500": partialAverage && partialAverage <= 40,
                  "bg-yellow-500": partialAverage && partialAverage <= 90,
                  "bg-red-500": partialAverage && partialAverage > 90,
                },
          )}
        />
        <div className="min-w-0 flex-1 text-left">
          <h3 className="font-semibold leading-tight">{grade.name}</h3>
          <p className="mt-0.5 text-muted-foreground text-sm">
            {grade.hours}h
            {partialAverage !== null && ` • Média parcial: ${partialAverage}`}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 size-5 shrink-0 text-muted-foreground transition-transform",
            isExpanded && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 grid grid-cols-4 gap-2">
              {STAGES.map(({ key, shortLabel }) => {
                return (
                  <div
                    key={key}
                    className="flex flex-col items-center gap-1 rounded-lg border p-2"
                  >
                    <span className="text-muted-foreground text-xs">
                      {shortLabel}
                    </span>
                    <CellTable discipline={grade} stageKey={key} compact />
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function TableGrades({ gradesResponse }: TableGradesProps) {
  const response = gradesResponse

  if (!response.success) {
    return (
      <div className="mb-16 space-y-2 md:m-0 md:my-2">
        <ClearEditedGradesButton />
        <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
          <AlertDescription className="text-sm">
            <div className="space-y-3">
              <p>{response.message}</p>
              <Button
                onClick={() => signIn("suap")}
                variant="outline"
                size="sm"
                className="border-destructive/20 text-destructive hover:bg-destructive/10"
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
      <div className="mb-16 space-y-2 md:m-0 md:my-2">
        <ClearEditedGradesButton />
        <Alert>
          <AlertDescription className="text-sm">
            Nenhuma disciplina encontrada para este período.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="mb-16 space-y-2 md:m-0 md:my-2">
      <ClearEditedGradesButton />
      <Suspense fallback={<TableSkeleton />}>
        <div className="space-y-4 md:hidden">
          {response.grades.map((grade) => (
            <GradeCard key={grade.name} grade={grade} />
          ))}
        </div>
        <div className="hidden rounded-md border border-foreground/5 bg-card md:block">
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
              {response.grades.map((grade) => (
                <TableRow key={grade.name}>
                  <TableCell className="font-medium">{grade.name}</TableCell>
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
