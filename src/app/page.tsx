'use client'

import { GithubCorner } from '@/components/github-corner'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'
import { ExternalLink } from 'lucide-react'

import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Home() {
  const { status } = useSession()

  if (status === 'authenticated') {
    redirect('/dashboard')
  }

  return (
    <>
      <aside>
        <GithubCorner />
      </aside>
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="mx-4 flex max-w-xl flex-col">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
            {siteConfig.name}
          </h1>
          <small className="text-center text-muted-foreground">
            {siteConfig.description}
          </small>
          <Button className="mt-4" onClick={() => signIn('suap')}>
            Entrar com SUAP
            <ExternalLink size={20} className="ml-2" />
          </Button>
        </div>
      </main>
      <Separator />
      <footer className="flex items-center justify-center p-4">
        <Image
          src={'https://github.com/ruangustavo.png'}
          width={38}
          height={38}
          className="rounded-full"
          alt="Imagem de perfil do GitHub de @ruangustavo"
        />
        <p className="ml-2 text-sm text-muted-foreground">
          Desenvolvido por{' '}
          <a
            href="https://github.com/ruangustavo"
            target="_blank"
            rel="noreferrer"
          >
            @ruangustavo
          </a>
        </p>
      </footer>
    </>
  )
}
