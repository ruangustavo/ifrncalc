import {
  DatabaseLockedIcon,
  Key01Icon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { siteConfig } from "@/config/site"

import { GithubStarCount } from "./github-star-count"

const POINTS = [
  {
    icon: Key01Icon,
    title: "Login na página do SUAP",
    description:
      "Você digita sua senha no site do SUAP, não aqui. O SUAP só entrega ao IFRN Calc uma autorização pra ler seu boletim.",
  },
  {
    icon: DatabaseLockedIcon,
    title: "Sem cadastro, sem banco de dados",
    description:
      "Não existe conta no IFRN Calc. Suas notas são lidas do SUAP quando você abre o app e não ficam salvas com a gente.",
  },
  {
    icon: SourceCodeIcon,
    title: "Código aberto",
    description:
      "Qualquer pessoa pode ler no GitHub exatamente o que o IFRN Calc faz com seus dados.",
  },
] as const

export function Privacy() {
  return (
    <section className="border-y bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Sua senha nunca passa pela gente
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {POINTS.map((point) => (
            <li key={point.title}>
              <HugeiconsIcon
                icon={point.icon}
                className="size-6 text-primary"
              />
              <h3 className="mt-3 text-lg font-semibold">{point.title}</h3>
              <p className="mt-1 text-background/70">{point.description}</p>
            </li>
          ))}
        </ul>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
        >
          Ver o código no GitHub
          <GithubStarCount />
        </a>
      </div>
    </section>
  )
}
