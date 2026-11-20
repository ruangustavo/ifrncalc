import { IraCard } from "@/app/dashboard/_components/ira-card"
import { ReportHeading } from "@/app/dashboard/_components/report-heading"
import { TableGrades } from "@/app/dashboard/_components/table-grades"
import { toDisciplines } from "@/lib/suap/boletim"
import {
  DEMO_BOLETIM,
  DEMO_PERIOD,
  DEMO_STUDENT_DATA,
} from "@/lib/suap/demo-student"
import { GradesProvider } from "@/store/grades"

import { BackLink } from "./_components/back-link"
import { DemoCta } from "./_components/demo-cta"
import { DemoNotice } from "./_components/demo-notice"

const period = {
  year: DEMO_PERIOD.ano_letivo,
  term: DEMO_PERIOD.periodo_letivo,
}

export default function Demo() {
  return (
    <div className="space-y-6 pt-6 pb-28 lg:pt-10">
      <BackLink />
      <DemoNotice />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <ReportHeading
          period={period}
          course={DEMO_STUDENT_DATA.curso}
          courseStage={DEMO_STUDENT_DATA.periodo_referencia}
        />
        <IraCard ira={DEMO_STUDENT_DATA.ira} />
      </div>
      <GradesProvider scope={{ kind: "demo" }}>
        <TableGrades
          gradesResponse={{
            success: true,
            grades: toDisciplines(DEMO_BOLETIM),
            period,
          }}
        />
      </GradesProvider>
      <DemoCta />
    </div>
  )
}
