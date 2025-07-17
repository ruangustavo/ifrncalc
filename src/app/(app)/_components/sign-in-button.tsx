"use client"

import { ExternalLink } from "lucide-react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function SignInButton() {
  return (
    <Button className="mt-4" onClick={() => signIn("suap")} size="lg">
      Entrar com SUAP
      <ExternalLink size={20} className="ml-2" />
    </Button>
  )
}
