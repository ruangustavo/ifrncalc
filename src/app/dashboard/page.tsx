import { redirect } from "next/navigation"
import { after } from "next/server"
import { getServerSession } from "next-auth"
import { getGrades } from "@/actions/get-grades"
import { getStudentData } from "@/actions/get-student-data"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { recordEvent } from "@/lib/events"
import { notifyError } from "@/lib/notify"
import { studentIdentitySchema, upsertStudent } from "@/lib/students"
import { IraCard } from "./_components/ira-card"
import { MaintenanceNotice } from "./_components/maintenance-notice"
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

  after(async () => {
    const identity = studentIdentitySchema.safeParse(session)
    if (!db || !identity.success) {
      return
    }

    try {
      const studentId = await upsertStudent(db, {
        ...identity.data,
        academic: studentData.academic ?? null,
      })
      await recordEvent(db, studentId, "dashboard_viewed")
    } catch (error) {
      notifyError("dashboard / analytics", {
        message: error instanceof Error ? error.message : String(error),
      })
    }
  })

  return (
    <div className="relative space-y-4 pb-16 md:space-y-6 md:pt-6">
      {studentData.success && studentData.ira?.trim() && (
        <IraCard ira={studentData.ira} />
      )}
      <TableGrades gradesResponse={gradesResponse} />
      <MaintenanceNotice />
      <FeedbackDialog user={session.user} />
    </div>
  )
}
