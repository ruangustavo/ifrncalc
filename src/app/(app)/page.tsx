import { GithubCorner } from '@/components/github-corner'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { SignInButton } from './_components/sign-in-button'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
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
          <SignInButton />
        </div>
      </main>
      <Separator />
      <footer className="flex items-center justify-center p-4">
        <Image
          src="https://github.com/ruangustavo.png"
          width={36}
          height={36}
          quality={25}
          className="rounded-full"
          alt="Imagem de perfil do GitHub de @ruangustavo"
        />
        <p className="ml-2 text-sm text-muted-foreground">
          Desenvolvido por
          <a
            href="https://github.com/ruangustavo"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-[6px] font-semibold"
          >
            @ruangustavo
          </a>
        </p>
      </footer>
    </>
  )
}
