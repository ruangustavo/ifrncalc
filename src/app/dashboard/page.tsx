import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { after } from "next/server"

import { getGrades } from "@/actions/get-grades"
import { getStudentData } from "@/actions/get-student-data"
import { recordGradeSimulated } from "@/actions/record-event"
import { FeedbackBanner } from "@/components/feedback-banner"
import { FeedbackCard } from "@/components/feedback-card"
import { FEEDBACK_DISMISSED_COOKIE } from "@/components/feedback-cookie"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { notifyError } from "@/lib/notify"
import { StudentIdentitySchema, upsertStudent } from "@/lib/students"
import { GradesProvider } from "@/store/grades"

import { IraCard } from "./_components/ira-card"
import { MaintenanceNotice } from "./_components/maintenance-notice"
import { ReportHeading } from "./_components/report-heading"
import { TableGrades } from "./_components/table-grades"
import { VisitRecorder } from "./_components/visit-recorder"

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

  after(async () => {
    const identity = StudentIdentitySchema.safeParse(session)

    if (!db || !identity.success) {
      return
    }

    try {
      await upsertStudent(db, {
        ...identity.data,
        academic: studentData.academic ?? null,
      })
    } catch (error) {
      notifyError("dashboard / analytics", {
        message: error instanceof Error ? error.message : String(error),
      })
    }
  })

  return (
    <div className="space-y-6 pt-6 pb-28 lg:pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <ReportHeading
          period={gradesResponse.period}
          course={studentData.academic?.course}
          courseStage={studentData.academic?.currentPeriod}
        />
        {studentData.success && studentData.ira?.trim() && (
          <IraCard ira={studentData.ira} />
        )}
      </div>
      {!feedbackDismissed && <FeedbackBanner user={session.user} />}
      <GradesProvider
        scope={{ kind: "student", onGradeSimulated: recordGradeSimulated }}
      >
        <TableGrades gradesResponse={gradesResponse} />
      </GradesProvider>
      <FeedbackCard user={session.user} />
      <MaintenanceNotice />
      <VisitRecorder />
    </div>
  )
}
