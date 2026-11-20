import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { getGrades } from "@/actions/get-grades"
import { getStudentData } from "@/actions/get-student-data"
import { FeedbackBanner } from "@/components/feedback-banner"
import { FeedbackCard } from "@/components/feedback-card"
import { FEEDBACK_DISMISSED_COOKIE } from "@/components/feedback-cookie"
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

  const [gradesResponse, studentData, cookieStore] = await Promise.all([
    getGrades(),
    getStudentData(),
    cookies(),
  ])

  const feedbackDismissed = cookieStore.has(FEEDBACK_DISMISSED_COOKIE)

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
      {!feedbackDismissed && <FeedbackBanner user={session.user} />}
      <TableGrades gradesResponse={gradesResponse} />
      <FeedbackCard user={session.user} />
      <MaintenanceNotice />
    </div>
  )
}
