import { CalculatorIcon } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { NavLink } from "./nav-link"
import { SignOutButton } from "./sign-out-button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight transition-colors hover:text-primary"
        >
          <CalculatorIcon className="size-5 text-primary" />
          {siteConfig.name}
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink href="/calculadora">Calculadora</NavLink>
          <div className="ml-1 border-l pl-2">
            <SignOutButton />
          </div>
        </nav>
      </div>
    </header>
  )
}
