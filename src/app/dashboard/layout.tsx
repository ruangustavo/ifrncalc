import { Metadata } from 'next'
import React from 'react'
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
      <main className="container flex-1">{children}</main>
    </>
  )
}
