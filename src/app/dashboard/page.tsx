import { FeedbackDialog } from '@/components/feedback-dialog'
import { authOptions } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { useGradesStore } from '@/store/grades'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { TableGrades } from './_components/table-grades'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className="relative">
      <TableGrades />

      <FeedbackDialog
        webhookUrl="https://discord.com/api/webhooks/1349791652415275132/qEV942FYZqNn2i94cm2dAHGAX8l__hapPf8kST2qU2ZUf1gI_WwmvZ79reCGNvD-stw9"
        user={session.user}
      />
    </div>
  )
}
