import { CalendarRemove01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { type Attendance, describeAbsences } from "@/utils/attendance"

export function AttendanceSummary({
  attendance,
}: {
  attendance: Attendance | null
}) {
  if (!attendance) return null

  const { absences, rate } = attendance

  return (
    <span
      aria-label={`${describeAbsences(absences)}, ${rate}% de frequência`}
      className="inline-flex shrink-0 items-center gap-1 text-sm whitespace-nowrap text-muted-foreground tabular-nums"
    >
      <HugeiconsIcon
        icon={CalendarRemove01Icon}
        strokeWidth={2}
        className="size-3.5 opacity-70"
      />
      {absences}
      <span aria-hidden="true" className="opacity-50">
        ·
      </span>
      {rate}%
    </span>
  )
}
