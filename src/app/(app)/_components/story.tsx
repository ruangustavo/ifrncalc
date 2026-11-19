import Image from "next/image"

import { siteConfig } from "@/config/site"

export function Story() {
  return (
    <section className="border-y bg-background">
      <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
        <p className="text-sm font-semibold text-primary">Por que existe</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Nasceu de um problema que eu tinha no ensino médio
        </h2>
        <div className="mt-6 space-y-4 text-lg text-pretty text-muted-foreground">
          <p>
            Toda vez que saía uma nota no SUAP, eu pegava a calculadora pra
            refazer a média de cada disciplina e descobrir quanto faltava. Como
            o 3º e o 4º bimestre pesam mais, a conta nunca era óbvia. Eu errava,
            refazia, e repetia tudo no bimestre seguinte.
          </p>
          <p>
            Um dia resolvi automatizar. Hoje o IFRN Calc faz essa conta pra mais
            de 10 mil alunos do IFRN, no instante em que a nota sai no SUAP.
          </p>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <Image
            src="https://github.com/ruangustavo.png"
            alt=""
            width={44}
            height={44}
            className="rounded-full"
          />
          <div className="text-sm">
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold hover:underline"
            >
              {siteConfig.author.name}
            </a>
            <p className="text-muted-foreground">
              Criador do IFRN Calc e ex-aluno do IFRN
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
