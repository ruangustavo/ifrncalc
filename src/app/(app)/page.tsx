import type { Viewport } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"

import { MainContent } from "./_components/main-content"

export const viewport: Viewport = {
  themeColor: "#0b2519",
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return <MainContent />
}
