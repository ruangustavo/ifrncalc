import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
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
        <nav className="flex gap-4">
          <Link href="/calculadora" className="hover:text-foreground">
            Calculadora
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
