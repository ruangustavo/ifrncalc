import type { Metadata } from "next"
import type React from "react"

import { DemoHeader } from "./_components/demo-header"

export const metadata: Metadata = { title: "Boletim de exemplo" }

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DemoHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  )
}
