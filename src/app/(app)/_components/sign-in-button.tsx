"use client"

import { ExternalLink } from "lucide-react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function SignInButton() {
  return (
    <Button
      className="mt-6 bg-primary hover:bg-primary/90"
      onClick={() => signIn("suap")}
      size="lg"
    >
      Conectar com SUAP
      <ExternalLink size={18} className="ml-2" />
    </Button>
  )
}
