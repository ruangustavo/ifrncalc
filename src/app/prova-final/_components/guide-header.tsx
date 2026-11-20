"use client"

import { useSession } from "next-auth/react"

import { Header } from "@/app/dashboard/_components/header"

export function GuideHeader() {
  const { data: session, status } = useSession()

  return (
    <Header
      viewer={status === "loading" ? "pending" : session ? "member" : "guest"}
    />
  )
}
