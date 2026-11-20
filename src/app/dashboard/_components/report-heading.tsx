import type { SchoolPeriod } from "@/actions/get-grades"

interface ReportHeadingProps {
  period?: SchoolPeriod
  course?: string
  courseStage?: number
}

function isYearly(course?: string) {
  return course !== undefined && /integrad/i.test(course)
}

function describePeriod(period: SchoolPeriod, yearly: boolean) {
  return yearly ? `${period.year}` : `${period.year}.${period.term}`
}

export function ReportHeading({
  period,
  course,
  courseStage,
}: ReportHeadingProps) {
  const yearly = isYearly(course)

  const details = [
    course,
    courseStage && `${courseStage}º ${yearly ? "ano" : "período"}`,
  ].filter(Boolean)

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">
        Boletim{period && ` ${describePeriod(period, yearly)}`}
      </h1>
      {details.length > 0 && (
        <p className="mt-1 text-sm text-pretty text-muted-foreground">
          {details.join(" · ")}
        </p>
      )}
    </div>
  )
}
