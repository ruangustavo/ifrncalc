import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { siteConfig } from "@/config/site"

import { GithubStarCount } from "./github-star-count"

const POINTS = [
  {
    title: "Login na página do SUAP",
    description:
      "Você digita sua senha no site do SUAP, não aqui. O SUAP só entrega ao IFRN Calc uma autorização pra ler seu boletim.",
  },
  {
    title: "Sem cadastro, sem banco de dados",
    description:
      "Não existe conta no IFRN Calc. Suas notas são lidas do SUAP quando você abre o app e não ficam salvas com a gente.",
  },
  {
    title: "Código aberto",
    description:
      "Qualquer pessoa pode ler no GitHub exatamente o que o IFRN Calc faz com seus dados.",
  },
] as const

export function Privacy() {
  return (
    <section className="mx-auto grid max-w-7xl gap-x-12 gap-y-12 border-t border-cream/10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-32">
      <div className="lg:col-span-5">
        <h2 className="font-display text-[clamp(2.5rem,10vw,3.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance lg:text-[clamp(3.5rem,5vw,4.75rem)]">
          Sua senha nunca passa pela gente.
        </h2>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="group mt-8 inline-flex items-center gap-2 font-medium underline decoration-foreground/30 underline-offset-4 transition-colors duration-150 hover:decoration-foreground"
        >
          Ver o código no GitHub
          <HugeiconsIcon
            strokeWidth={2}
            icon={ArrowUpRight01Icon}
            className="size-4"
          />
          <GithubStarCount />
        </a>
      </div>

      <ol className="divide-y lg:col-span-6 lg:col-start-7">
        {POINTS.map((point, index) => (
          <li
            key={point.title}
            className="grid grid-cols-[2rem_1fr] gap-x-4 py-6 sm:grid-cols-[3rem_1fr]"
          >
            <span className="font-display text-sm font-semibold text-highlight tabular-nums">
              {index + 1}
            </span>
            <div>
              <h3 className="font-display text-xl leading-tight font-bold">
                {point.title}
              </h3>
              <p className="mt-2 text-pretty text-muted-foreground">
                {point.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
