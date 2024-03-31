'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut()}
      className="flex items-center space-x-2"
    >
      <LogOut className="size-5" />
      <span className="sr-only md:not-sr-only">Sair</span>
    </Button>
  )
}
