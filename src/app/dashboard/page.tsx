import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { after } from "next/server"

import { getGrades } from "@/actions/get-grades"
import { getStudentData } from "@/actions/get-student-data"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { notifyError } from "@/lib/notify"
import { StudentIdentitySchema, upsertStudent } from "@/lib/students"
import { isSuapMock } from "@/lib/suap/mock"

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
    const identity = StudentIdentitySchema.safeParse(session)

    if (!db || isSuapMock() || !identity.success) {
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
