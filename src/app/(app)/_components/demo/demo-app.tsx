"use client"

import { Calculator01Icon, RotateLeft01Icon } from "@hugeicons/core-free-icons"
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
    <div className="overflow-hidden rounded-3xl border bg-background shadow-2xl shadow-primary/10 md:rounded-[2.5rem] md:border-[10px] md:border-foreground/90">
      <div className="flex h-12 items-center justify-between border-b px-4">
        <span className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <HugeiconsIcon
            strokeWidth={2}
            icon={Calculator01Icon}
            className="size-4 text-primary"
          />
          IFRN Calc
        </span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
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
