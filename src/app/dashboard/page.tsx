import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Suspense } from 'react'
import { TableGrades } from './_components/table-grades'
import { Loader2 } from 'lucide-react'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-1.5">
          <Loader2 className="size-4 animate-spin" />
          <span>Carregando...</span>
        </div>
      }
    >
      <TableGrades />
    </Suspense>
  )
}
