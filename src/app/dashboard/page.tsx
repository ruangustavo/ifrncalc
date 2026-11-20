import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { getGrades } from "@/actions/get-grades"
import { getStudentData } from "@/actions/get-student-data"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { authOptions } from "@/lib/auth"

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

  return (
    <div className="space-y-8 pt-8 pb-28 lg:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div>
          <h1 className="text-headline font-extrabold text-balance">
            Quanto falta em cada disciplina.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground sm:text-lg">
            A nota colorida é a que você precisa tirar em cada bimestre em
            aberto pra fechar com média 60. Toque nela pra simular outra nota.
          </p>
        </div>
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
