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

  const grades = await getGrades()

  return <DataTable columns={columns} data={grades} />
}
