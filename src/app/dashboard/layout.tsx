import { Metadata } from 'next'
import React, { Suspense } from 'react'
import { Header } from './_components/header'

export const metadata: Metadata = { title: 'Boletim' }

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-secondary px-4 md:grid md:place-content-center">
        <Suspense>{children}</Suspense>
      </main>
    </>
  )
}
