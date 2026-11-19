import Link from "next/link"

import { siteConfig } from "@/config/site"

import { BrandMark } from "./brand-mark"
import { SignInButton } from "./sign-in-button"

const NAV = [
  { href: "#cores", label: "Como funciona" },
  { href: "#alunos", label: "Quem usa" },
  { href: "#duvidas", label: "Dúvidas" },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-forest">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-16 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <BrandMark className="size-4 text-lime" />
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-cream/70 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-150 ease-[ease] hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <SignInButton size="sm" />
      </div>
    </header>
  )
}
