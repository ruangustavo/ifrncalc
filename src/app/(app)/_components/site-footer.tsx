import Link from "next/link"

import { siteConfig } from "@/config/site"

import { BrandMark } from "./brand-mark"

export function SiteFooter() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <BrandMark className="size-3.5 text-highlight" />
          {siteConfig.name}
        </p>
        <p className="max-w-md text-pretty">
          Feito por{" "}
          <a
            href={siteConfig.author.url}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            {siteConfig.author.name}
          </a>
          . Projeto independente, sem vínculo oficial com o IFRN.
        </p>
        <nav className="flex gap-6">
          <Link
            href="/calculadora"
            className="py-1 transition-colors duration-150 hover:text-foreground"
          >
            Calculadora
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="py-1 transition-colors duration-150 hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
