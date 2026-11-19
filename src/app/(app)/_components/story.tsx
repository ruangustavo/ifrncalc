import Image from "next/image"

import { siteConfig } from "@/config/site"

export function Story() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 md:py-28">
      <h2 className="text-4xl leading-none font-extrabold tracking-tighter text-balance md:text-5xl">
        Nasceu de uma conta que eu fazia{" "}
        <span className="text-highlight">na mão.</span>
      </h2>
      <div className="mt-8 space-y-4 text-lg text-pretty text-muted-foreground">
        <p>
          No ensino médio, toda vez que saía uma nota no SUAP eu pegava a
          calculadora pra refazer a média de cada disciplina e descobrir quanto
          faltava. Como o 3º e o 4º bimestre pesam mais, a conta nunca era
          óbvia. Eu errava, refazia, e repetia tudo no bimestre seguinte.
        </p>
        <p>
          Um dia resolvi automatizar.{" "}
          <span className="font-semibold text-foreground">
            Hoje o IFRN Calc faz essa conta pra mais de 10 mil alunos,
          </span>{" "}
          no instante em que a nota sai no SUAP.
        </p>
      </div>
      <div className="mt-10 flex items-center gap-3">
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
    </section>
  )
}
