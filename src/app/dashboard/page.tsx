import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { getGrades } from "@/actions/get-grades"
import { getStudentData } from "@/actions/get-student-data"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { authOptions } from "@/lib/auth"

import { IraCard } from "./_components/ira-card"
import { MaintenanceNotice } from "./_components/maintenance-notice"
import { ReportHeading } from "./_components/report-heading"
import { TableGrades } from "./_components/table-grades"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const [gradesResponse, studentData] = await Promise.all([
    getGrades(),
    getStudentData(),
  ])

  return (
    <div className="space-y-6 pt-6 pb-28 lg:pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <ReportHeading
          period={gradesResponse.period}
          course={studentData.course}
          courseStage={studentData.courseStage}
        />
        {studentData.success && studentData.ira?.trim() && (
          <IraCard ira={studentData.ira} />
        )}
      </div>
      <TableGrades gradesResponse={gradesResponse} />
      <MaintenanceNotice />
      <FeedbackDialog user={session.user} />
    </div>
  )
}
