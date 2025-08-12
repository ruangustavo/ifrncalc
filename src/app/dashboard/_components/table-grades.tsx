"use client"

import {
  Apple,
  Atom,
  BookMarked,
  BookText,
  Calculator,
  Cpu,
  Dumbbell,
  ExternalLink,
  FlaskConical,
  Globe2,
  Languages,
  Leaf,
  Monitor,
  Package,
} from "lucide-react"
import { signIn } from "next-auth/react"
import { Component, Suspense, use } from "react"
import { getGrades } from "@/actions/get-grades"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
import { TableSkeleton } from "./table-skeleton"

type StageKey = "E1" | "E2" | "E3" | "E4"

export const STAGES: {
  key: StageKey
  label: string
}[] = [
  { key: "E1", label: "1° Bimestre" },
  { key: "E2", label: "2° Bimestre" },
  { key: "E3", label: "3° Bimestre" },
  { key: "E4", label: "4° Bimestre" },
] as const

export function TableGrades() {
  const response = use(getGrades())

  const getIcon = (gradeName: string) => {
    const iconMap = {
      matemática: Calculator,
      português: BookText,
      história: BookMarked,
      geografia: Globe2,
      física: Atom,
      química: FlaskConical,
      biologia: Leaf,
      "educação física": Dumbbell,
      inglês: Languages,
      computação: Cpu,
      computadores: Monitor,
      arquitetura: Component,
      alimento: Apple,
      embalagem: Package,
    }

    const name = gradeName.toLowerCase()

    const Icon =
      Object.entries(iconMap).find(([key]) => name.includes(key))?.[1] ??
      BookText

    return <Icon className="size-4 text-primary" />
  }

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
            <div
              key={grade.name}
              className="rounded-lg border border-foreground/5 bg-card"
            >
              <div className="flex items-center gap-1.5 p-4 pb-2">
                {getIcon(grade.name)}
                <h3 className="flex items-center gap-2 font-semibold">
                  {grade.name}
                </h3>
              </div>
              <Separator />
              <div className="space-y-2 p-4 pt-2">
                {STAGES.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      {label}
                    </span>
                    <CellTable discipline={grade} stageKey={key} />
                  </div>
                ))}
              </div>
            </div>
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
