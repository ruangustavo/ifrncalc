import { ModeToggle } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { SignOutButton } from './sign-out-button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-b-foreground/5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <h1 className="font-bold uppercase">IFRN Calc</h1>
        <nav className="flex flex-1 justify-end space-x-1">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" className="group">
              <Github className="size-5 stroke-muted-foreground transition-colors group-hover:stroke-foreground" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <ModeToggle />
          <SignOutButton />
        </nav>
      </div>
    </header>
  )
}
