import type { Metadata } from "next"
import { cookies } from "next/headers"
import type React from "react"

import { parseSuapFixture, SUAP_FIXTURE_COOKIE } from "@/lib/suap/fixtures"
import { isSuapMock } from "@/lib/suap/mock"

import { FixtureToggle } from "./_components/fixture-toggle"
import { Header } from "./_components/header"

export const metadata: Metadata = { title: "Boletim" }

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const showFixtureToggle =
    process.env.NODE_ENV === "development" && isSuapMock()

  const fixture = parseSuapFixture(
    showFixtureToggle
      ? (await cookies()).get(SUAP_FIXTURE_COOKIE)?.value
      : undefined,
  )

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      {showFixtureToggle && <FixtureToggle current={fixture} />}
    </>
  )
}
