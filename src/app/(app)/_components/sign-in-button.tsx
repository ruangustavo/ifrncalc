'use client'

import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function SignInButton() {
  return (
    <Button className="mt-4" onClick={() => signIn('suap')} size="lg">
      Entrar com SUAP
      <ExternalLink size={20} className="ml-2" />
    </Button>
  )
}
