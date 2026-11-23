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
import { isComputingCourse } from "@/lib/computing-course"
import { db } from "@/lib/db"
import { visitedOnEarlierDay } from "@/lib/events"
import { notifyError } from "@/lib/notify"
import { StudentIdentitySchema, upsertStudent } from "@/lib/students"
import { GradesProvider } from "@/store/grades"

import { GithubSignature } from "./_components/github-signature"
import { InstallBanner } from "./_components/install/install-banner"
import { INSTALL_BANNER_DISMISSED_COOKIE } from "./_components/install/install-cookie"
import { IraCard } from "./_components/ira-card"
import { MaintenanceNotice } from "./_components/maintenance-notice"
import { ReportHeading } from "./_components/report-heading"
import { StandaloneRefresh } from "./_components/standalone-refresh"
import { TableGrades } from "./_components/table-grades"
import { VisitRecorder } from "./_components/visit-recorder"

async function isReturningStudent(
  enrollmentId: string | undefined,
): Promise<boolean> {
  if (!db || !enrollmentId) {
    return false
  }

  try {
    return await visitedOnEarlierDay(db, enrollmentId)
  } catch (error) {
    notifyError("dashboard / install banner", {
      message: error instanceof Error ? error.message : String(error),
    })

    return false
  }
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const [gradesResponse, studentData, cookieStore, returning] =
    await Promise.all([
      getGrades(),
      getStudentData(),
      cookies(),
      isReturningStudent(session.user.id),
    ])

  const feedbackDismissed = cookieStore.has(FEEDBACK_DISMISSED_COOKIE)

  const showInstallBanner =
    feedbackDismissed &&
    !cookieStore.has(INSTALL_BANNER_DISMISSED_COOKIE) &&
    returning

  const showGithubSignature =
    studentData.academic !== undefined &&
    isComputingCourse(studentData.academic.course)

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
          period={gradesResponse.success ? gradesResponse.period : undefined}
          course={studentData.academic?.course}
          courseStage={studentData.academic?.currentPeriod}
        />
        {studentData.ira !== undefined && <IraCard ira={studentData.ira} />}
      </div>
      {!feedbackDismissed && <FeedbackBanner user={session.user} />}
      {showInstallBanner && <InstallBanner />}
      <GradesProvider
        scope={{ kind: "student", onGradeSimulated: recordGradeSimulated }}
      >
        <TableGrades gradesResponse={gradesResponse} />
      </GradesProvider>
      <FeedbackCard user={session.user} />
      {showGithubSignature && <GithubSignature />}
      <MaintenanceNotice />
      <VisitRecorder />
      <StandaloneRefresh />
    </div>
  )
}
