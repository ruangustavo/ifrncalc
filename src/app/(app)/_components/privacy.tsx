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
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <h2 className="max-w-2xl text-4xl leading-none font-extrabold tracking-tighter text-balance md:text-5xl">
          Sua senha nunca passa{" "}
          <span className="text-highlight">pela gente.</span>
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {POINTS.map((point) => (
            <li key={point.title}>
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-highlight">
                <HugeiconsIcon
                  strokeWidth={2}
                  icon={point.icon}
                  className="size-5"
                />
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight">
                {point.title}
              </h3>
              <p className="mt-1 text-muted-foreground">{point.description}</p>
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
