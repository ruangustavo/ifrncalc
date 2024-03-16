import { redirect } from 'next/navigation'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getGrades } from '@/actions/get-grades'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  const { success, grades } = await getGrades()

  return success ? (
    <DataTable columns={columns} data={grades ?? []} />
  ) : (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
      Aconteceu um erro inesperado! 😢
    </h1>
  )
}
