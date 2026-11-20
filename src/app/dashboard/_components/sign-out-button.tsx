"use client"

import { Logout03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function SignOutButton() {
  return (
    <Button variant="ghost-chrome" size="sm" onClick={() => signOut()}>
      <HugeiconsIcon strokeWidth={2} icon={Logout03Icon} />
      <span className="sr-only md:not-sr-only">Sair</span>
    </Button>
  )
}
