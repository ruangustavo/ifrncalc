import Image from "next/image"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { RoughHighlight } from "./rough-highlight"
import { Tape } from "./tape"

const SHEET_SHADOW =
  "shadow-[0_1px_1px_rgb(0_0_0/0.3),0_18px_30px_-12px_rgb(0_0_0/0.55)]"

export function Story() {
  return (
    <section className="overflow-x-clip px-4 py-20 sm:px-6 lg:py-28">
      <div className="relative mx-auto max-w-3xl">
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 rotate-[2.5deg] bg-[oklch(0.87_0.035_95)]",
            SHEET_SHADOW,
          )}
        />
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -rotate-[2.2deg] bg-[oklch(0.91_0.032_95)]",
            SHEET_SHADOW,
          )}
        />
        <article
          className={cn(
            "relative -rotate-[0.5deg] bg-cream px-6 py-12 text-ink sm:px-14 sm:py-16",
            SHEET_SHADOW,
          )}
        >
          <Tape className="-top-1 -left-9 -rotate-[38deg]" />
          <h2 className="font-display text-[clamp(2.25rem,9vw,3.25rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance">
            Nasceu de uma conta que eu fazia na mão.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-pretty sm:text-xl">
            <p>
              Quando eu fazia o ensino médio em Pau dos Ferros, sempre que saía
              uma nota no SUAP eu fazia a mesma coisa: pegava a calculadora e
              refazia a média, matéria por matéria. Era chato, e eu repetia tudo
              de novo na nota seguinte.
            </p>
            <p>
              Mas eu não conseguia deixar de fazer. Quando ia mal numa prova,
              precisava saber se dava pra recuperar e em quais matérias eu tinha
              que focar.
            </p>
            <p>
              Um dia resolvi automatizar.{" "}
              <RoughHighlight>
                Hoje o IFRN Calc faz essa conta pra mais de 10 mil alunos,
              </RoughHighlight>{" "}
              toda vez que sai nota no SUAP.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <Image
              src="https://github.com/ruangustavo.png"
              alt=""
              width={48}
              height={48}
              className="rounded-full ring-2 ring-ink"
            />
            <div className="text-sm">
              <a
                href={siteConfig.author.url}
                target="_blank"
                rel="noreferrer"
                className="font-display text-base font-bold hover:underline"
              >
                {siteConfig.author.name}
              </a>
              <p className="text-ink/70">
                Criador do IFRN Calc e ex-aluno do IFRN
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
