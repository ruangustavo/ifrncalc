import type { Metadata } from "next"
import type React from "react"

import { Header } from "./_components/header"

export const metadata: Metadata = { title: "Boletim" }

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  )
}
