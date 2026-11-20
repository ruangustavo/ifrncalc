"use client"

import { useSession } from "next-auth/react"

import { Header } from "@/app/dashboard/_components/header"

export function DemoHeader() {
  const { status } = useSession()

  return (
    <Header
      viewer={
        status === "loading"
          ? "pending"
          : status === "authenticated"
            ? "member"
            : "guest"
      }
    />
  )
}
