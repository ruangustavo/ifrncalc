import { CalculatorIcon } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { NavLink } from "./nav-link"
import { SignOutButton } from "./sign-out-button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <CalculatorIcon className="size-5 text-primary" />
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold transition-colors hover:text-primary"
          >
            {siteConfig.name}
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          <ul>
            <li>
              <NavLink href="/calculadora">Calculadora</NavLink>
            </li>
          </ul>
          <SignOutButton />
        </nav>
      </div>
    </header>
  )
}
