"use client"

import { RotateLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { GradeCard } from "@/app/dashboard/_components/grade-card"
import { IraCard } from "@/app/dashboard/_components/ira-card"
import { Button } from "@/components/ui/button"
import { useGradesStore } from "@/store/grades"

import { DEMO_GRADES, DEMO_IRA } from "./demo-grades"
import { GradeLegend } from "./grade-legend"

export function DemoApp() {
  const { editedGrades, clearEditedGrades } = useGradesStore()
  const hasEdits = Object.keys(editedGrades).length > 0

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/10 dark:shadow-none">
      <div className="flex h-11 items-center gap-3 border-b px-4">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
        <span className="text-sm font-medium">Seu boletim</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          notas de exemplo
        </span>
      </div>

      <div className="space-y-3 bg-muted/40 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <IraCard ira={DEMO_IRA} />
          {hasEdits && (
            <Button variant="outline" size="xs" onClick={clearEditedGrades}>
              <HugeiconsIcon strokeWidth={2} icon={RotateLeft01Icon} />
              Desfazer
            </Button>
          )}
        </div>

        {DEMO_GRADES.map((grade) => (
          <GradeCard key={grade.name} grade={grade} />
        ))}

        <GradeLegend />
      </div>
    </div>
  )
}
