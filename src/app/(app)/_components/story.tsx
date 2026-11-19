import Image from "next/image"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

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
          <Tape className="-top-4 left-10 -rotate-3" />
          <h2 className="font-display text-[clamp(2.25rem,9vw,3.25rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance">
            Nasceu de uma conta que eu fazia na mão.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-pretty sm:text-xl">
            <p>
              No ensino médio, toda vez que saía uma nota no SUAP eu pegava a
              calculadora pra refazer a média de cada disciplina e descobrir
              quanto faltava. Como o 3º e o 4º bimestre pesam mais, a conta
              nunca era óbvia. Eu errava, refazia, e repetia tudo no bimestre
              seguinte.
            </p>
            <p>
              Um dia resolvi automatizar.{" "}
              <span className="bg-lime box-decoration-clone px-1 font-semibold">
                Hoje o IFRN Calc faz essa conta pra mais de 10 mil alunos,
              </span>{" "}
              no instante em que a nota sai no SUAP.
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
