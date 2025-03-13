'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut()}
      className="flex items-center space-x-2"
      size="xs"
    >
      <LogOut className="size-4" />
      <span className="sr-only md:not-sr-only">Sair</span>
    </Button>
  )
}
