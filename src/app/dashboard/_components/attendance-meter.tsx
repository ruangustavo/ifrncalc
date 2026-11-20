import type { CSSProperties } from "react"

import { type Attendance, describeAbsences } from "@/utils/attendance"

export function AttendanceMeter({
  attendance,
}: {
  attendance: Attendance | null
}) {
  if (!attendance) return <span className="text-muted-foreground">—</span>

  const { absences, rate, classesHeld } = attendance

  const meterVars: CSSProperties & Record<`--${string}`, string> = {
    "--attendance-rate": `${rate}%`,
  }

  return (
    <div className="tabular-nums" style={meterVars}>
      <span className="sr-only">
        {`${rate}% de frequência, ${describeAbsences(absences)} em ${classesHeld} aulas.`}
      </span>
      <div
        aria-hidden="true"
        className="flex items-baseline justify-between gap-3"
      >
        <span className="text-sm text-muted-foreground">{rate}%</span>
        <span className="text-xs text-muted-foreground">
          {describeAbsences(absences)} em {classesHeld} aulas
        </span>
      </div>
      <div
        aria-hidden="true"
        className="relative mt-1.5 h-1 rounded-full bg-foreground/8"
      >
        <div className="absolute inset-y-0 left-0 w-(--attendance-rate) rounded-full bg-foreground/20" />
      </div>
    </div>
  )
}
