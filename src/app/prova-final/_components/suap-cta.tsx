"use client"

import { useSession } from "next-auth/react"

import { SignInButton } from "@/app/(app)/_components/sign-in-button"

export function SuapCta() {
  const { status } = useSession()

  if (status !== "unauthenticated") return null

  return (
    <div className="mt-12 rounded-3xl bg-chrome p-6 text-chrome-foreground sm:p-8">
      <p className="text-2xl leading-tight font-bold">
        Quer ver isso em todas as disciplinas?
      </p>
      <p className="mt-2 text-pretty text-chrome-foreground/75">
        Conecte com o SUAP e o IFRN Calc mostra quanto falta em cada uma, sem
        digitar nota.
      </p>
      <SignInButton variant="chrome" className="mt-5 w-full sm:w-auto" />
    </div>
  )
}
