import { ModeToggle } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { Github } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <h1 className="font-bold uppercase">IFRN Calc</h1>
        <nav className="flex-1 flex justify-end space-x-1">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Button variant="ghost">
              <Github className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
