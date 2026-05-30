import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { getGrades } from "@/actions/get-grades"
import { getStudentData } from "@/actions/get-student-data"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { authOptions } from "@/lib/auth"
import { MaintenanceNotice } from "./_components/maintenance-notice"
import { TableGrades } from "./_components/table-grades"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const [gradesResponse] = await Promise.all([getGrades(), getStudentData()])

  return (
    <div className="relative">
      <TableGrades gradesResponse={gradesResponse} />
      <MaintenanceNotice />
      <FeedbackDialog user={session.user} />
    </div>
  )
}
