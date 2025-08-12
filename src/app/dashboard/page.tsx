import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { getGrades } from "@/actions/get-grades"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { authOptions } from "@/lib/auth"
import { TableGrades } from "./_components/table-grades"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const gradesResponse = await getGrades()

  return (
    <div className="relative">
      <TableGrades gradesResponse={gradesResponse} />
      <FeedbackDialog user={session.user} />
    </div>
  )
}
