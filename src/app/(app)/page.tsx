import { GithubCorner } from '@/components/github-corner'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'
import { authOptions } from '@/lib/auth'
import { motion } from 'framer-motion'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { MainContent } from './_components/main-content'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return <MainContent />
}
