"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
  return (
    <Button variant="ghost" onClick={() => signOut()} size="xs">
      <LogOut className="size-4" />
      <span className="sr-only md:not-sr-only">Sair</span>
    </Button>
  )
}
