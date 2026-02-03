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
      <main className="container flex-1 pt-4 md:pt-0">{children}</main>
    </>
  )
}
