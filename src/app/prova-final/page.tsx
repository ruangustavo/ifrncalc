import type { Metadata } from "next"
import Link from "next/link"

import { StructuredData } from "@/components/structured-data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { siteConfig } from "@/config/site"

import { FinalExamCalculator } from "./_components/final-exam-calculator"
import { Formula } from "./_components/formula"
import { GuideHeader } from "./_components/guide-header"
import { SuapCta } from "./_components/suap-cta"
import { GUIDE } from "./guide"

export const metadata: Metadata = {
  title: GUIDE.title,
  description: GUIDE.description,
  alternates: { canonical: GUIDE.path },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: GUIDE.path,
    siteName: siteConfig.name,
    title: GUIDE.title,
    description: GUIDE.description,
    publishedTime: GUIDE.published,
    modifiedTime: GUIDE.modified,
    authors: [siteConfig.author.url],
  },
  twitter: {
    card: "summary_large_image",
    title: GUIDE.title,
    description: GUIDE.description,
  },
}

const ARTICLE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: GUIDE.title,
  description: GUIDE.description,
  inLanguage: "pt-BR",
  datePublished: GUIDE.published,
  dateModified: GUIDE.modified,
  mainEntityOfPage: `${siteConfig.url}${GUIDE.path}`,
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  about: {
    "@type": "EducationalOrganization",
    name: "Instituto Federal do Rio Grande do Norte",
    alternateName: "IFRN",
    url: "https://portal.ifrn.edu.br/",
  },
  citation: {
    "@type": "CreativeWork",
    name: GUIDE.source.name,
    url: GUIDE.source.url,
  },
}

const WHO_TAKES_IT = [
  { situation: "Média 60 ou mais", outcome: "Aprovado, sem prova final" },
  { situation: "Média de 20 até menos de 60", outcome: "Faz prova final" },
  { situation: "Média abaixo de 20", outcome: "Reprovado, sem prova final" },
  {
    situation: "Frequência abaixo de 75%",
    outcome: "Reprovado por falta, com qualquer média",
  },
]

const NEEDED_BY_AVERAGE = [
  { average: 20, needed: 100 },
  { average: 30, needed: 90 },
  { average: 40, needed: 80 },
  { average: 50, needed: 70 },
  { average: 55, needed: 65 },
  { average: 59, needed: 61 },
]

const ANNUAL_FORMULAS = [
  String.raw`\text{MFD} = \frac{\text{MD} + \text{NAF}}{2}`,
  String.raw`\text{MFD} = \frac{2\,\text{NAF} + 2N_2 + 3N_3 + 3N_4}{10}`,
  String.raw`\text{MFD} = \frac{2N_1 + 2\,\text{NAF} + 3N_3 + 3N_4}{10}`,
  String.raw`\text{MFD} = \frac{2N_1 + 2N_2 + 3\,\text{NAF} + 3N_4}{10}`,
  String.raw`\text{MFD} = \frac{2N_1 + 2N_2 + 3N_3 + 3\,\text{NAF}}{10}`,
]

const SEMESTER_FORMULAS = [
  String.raw`\text{MFD} = \frac{\text{MD} + \text{NAF}}{2}`,
  String.raw`\text{MFD} = \frac{2\,\text{NAF} + 3N_2}{5}`,
  String.raw`\text{MFD} = \frac{2N_1 + 3\,\text{NAF}}{5}`,
]

const H2 = "mt-14 text-2xl leading-tight font-bold tracking-tight text-balance"
const H3 = "mt-8 text-lg leading-snug font-bold text-balance"
const P = "mt-4 leading-relaxed text-pretty"

const FORMULA = "rounded-xl bg-card px-4 ring-1 ring-foreground/10"

const QUOTE =
  "mt-4 border-l-2 border-primary pl-4 text-sm leading-relaxed text-pretty text-muted-foreground"

const LINK = "font-medium text-primary underline underline-offset-4"

export default function ProvaFinal() {
  return (
    <>
      <StructuredData data={ARTICLE_STRUCTURED_DATA} />
      <GuideHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pt-8 pb-28 sm:pt-12">
        <article>
          <h1 className="text-4xl leading-none font-extrabold tracking-tight text-balance sm:text-5xl">
            {GUIDE.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Por {siteConfig.author.name}, ex-aluno do IFRN · Atualizado em{" "}
            <time dateTime={GUIDE.modified}>{GUIDE.modifiedLabel}</time>
          </p>
          <p className="mt-6 text-lg leading-relaxed text-pretty">
            No IFRN, você faz prova final quando fecha a disciplina com média de
            20 até menos de 60 e não reprovou por falta. Pra passar, a média
            final precisa chegar a 60. O IFRN calcula essa média de mais de um
            jeito e fica com o maior resultado, então a nota que você precisa
            pode ser menor do que 120 menos a sua média.
          </p>

          <FinalExamCalculator />
          <p className="mt-3 text-sm text-pretty text-muted-foreground">
            Os pesos já vêm no padrão do IFRN: 2, 2, 3 e 3 na disciplina anual,
            2 e 3 na semestral.
          </p>

          <h2 className={H2}>Quem faz prova final no IFRN?</h2>
          <p className={P}>
            Depende da média da disciplina (MD), que é a conta dos bimestres com
            os pesos, antes da prova final.
          </p>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Situação</TableHead>
                  <TableHead>O que acontece</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WHO_TAKES_IT.map((row) => (
                  <TableRow key={row.situation}>
                    <TableCell className="whitespace-normal">
                      {row.situation}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {row.outcome}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <blockquote className={QUOTE}>
            “O(a) estudante que não for reprovado por falta e obtiver MD igual
            ou superior a 20 (vinte) e inferior a 60 (sessenta) terá direito a
            submeter-se a uma avaliação final em cada disciplina [...].”
            <footer className="mt-1">
              Organização Didática do IFRN, Art. 335, § 1º
            </footer>
          </blockquote>
          <p className={P}>
            A frequência mínima conta pelo total do período, somando todas as
            disciplinas. Veja{" "}
            <Link href="/faltas" className={LINK}>
              como funcionam as faltas no IFRN
            </Link>
            .
          </p>

          <h2 className={H2}>Como a média final é calculada?</h2>
          <p className={P}>
            Depois da prova, o IFRN calcula a média final da disciplina (MFD)
            com a nota da avaliação final (NAF). Existe mais de uma conta, e
            vale a que der o maior resultado:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
            <li>a média simples entre a sua média e a nota da prova final;</li>
            <li>
              a sua média refeita com a prova final no lugar da nota de um
              bimestre, com o mesmo peso dele.
            </li>
          </ul>
          <p className={P}>Com média final de 60 ou mais, você passa.</p>

          <h3 className={H3}>
            Disciplina anual: 4 bimestres, pesos 2, 2, 3 e 3
          </h3>
          <p className={P}>A média da disciplina é:</p>
          <div className={`mt-3 ${FORMULA}`}>
            <Formula
              tex={String.raw`\text{MD} = \frac{2N_1 + 2N_2 + 3N_3 + 3N_4}{10}`}
            />
          </div>
          <p className={P}>A média final é a maior entre estas cinco:</p>
          <ul className="mt-3 space-y-2">
            {ANNUAL_FORMULAS.map((formula) => (
              <li key={formula} className={FORMULA}>
                <Formula tex={formula} />
              </li>
            ))}
          </ul>

          <h3 className={H3}>Disciplina semestral: 2 bimestres, pesos 2 e 3</h3>
          <p className={P}>A média da disciplina é:</p>
          <div className={`mt-3 ${FORMULA}`}>
            <Formula tex={String.raw`\text{MD} = \frac{2N_1 + 3N_2}{5}`} />
          </div>
          <p className={P}>A média final é a maior entre estas três:</p>
          <ul className="mt-3 space-y-2">
            {SEMESTER_FORMULAS.map((formula) => (
              <li key={formula} className={FORMULA}>
                <Formula tex={formula} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-pretty text-muted-foreground">
            N1 a N4 são as notas dos bimestres, MD é a média da disciplina, NAF
            é a nota da avaliação final e MFD é a média final da disciplina.
          </p>
          <blockquote className={QUOTE}>
            “Será considerado aprovado em disciplina, após avaliação final, o(a)
            estudante que obtiver média final igual ou maior que 60 (sessenta),
            calculada através de uma das seguintes equações, prevalecendo a que
            resultar em maior média final da disciplina.”
            <footer className="mt-1">
              Organização Didática do IFRN, Art. 335, § 2º
            </footer>
          </blockquote>

          <h2 className={H2}>Quanto preciso tirar na prova final?</h2>
          <p className={P}>
            Pela média simples, você precisa de 120 menos a sua média. É a conta
            que quase todo mundo faz na mão:
          </p>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sua média</TableHead>
                  <TableHead>Nota na prova final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {NEEDED_BY_AVERAGE.map((row) => (
                  <TableRow key={row.average}>
                    <TableCell>{row.average}</TableCell>
                    <TableCell>{row.needed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className={P}>
            Esse é o máximo que você vai precisar. Se você foi muito mal em um
            bimestre só, trocar essa nota pela prova final rende mais, e a nota
            necessária cai.
          </p>

          <h3 className={H3}>
            Exemplo: disciplina anual com notas 70, 70, 10 e 70
          </h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
            <li>
              A média é (2×70 + 2×70 + 3×10 + 3×70) / 10 = 52. Dá direito à
              prova final.
            </li>
            <li>Pela média simples, você precisaria de 120 − 52 = 68.</li>
            <li>
              Trocando o 3º bimestre pela prova final, a conta vira (2×70 + 2×70
              + 3×NAF + 3×70) / 10. Pra chegar a 60, a NAF precisa ser pelo
              menos 36,7.
            </li>
            <li>
              Vale a conta mais favorável: você precisa de 37 na prova final, e
              não de 68.
            </li>
          </ol>
          <p className={P}>
            Trocar um bimestre só compensa quando a nota dele ficou bem abaixo
            das outras. Com notas parecidas em todos os bimestres, vale o 120
            menos a média.
          </p>

          <h2 className={H2}>E nas disciplinas semestrais?</h2>
          <p className={P}>
            A lógica é a mesma, com dois bimestres. Exemplo com 30 no 1º e 60 no
            2º: a média é (2×30 + 3×60) / 5 = 48. Pela média simples você
            precisaria de 72. Trocando o 1º bimestre pela prova final, precisa
            de 60.
          </p>

          <h2 className={H2}>E nas disciplinas em blocos?</h2>
          <p className={P}>
            Nos cursos organizados em blocos, a disciplina tem uma nota só.
            Depois da prova final, vale a maior entre a nota da prova e a média
            que você já tinha. Como a sua média está abaixo de 60, você precisa
            de 60 na prova final.
          </p>

          <h2 className={H2}>Quando é a prova final?</h2>
          <p className={P}>
            A data sai no calendário acadêmico do seu campus, então muda de um
            campus pra outro. O professor precisa lançar as notas e as faltas no
            SUAP pelo menos 48 horas antes da prova.
          </p>

          <h2 className={H2}>De onde vem essa regra?</h2>
          <p className={P}>
            Dos artigos 333 a 337 da{" "}
            <a
              href={GUIDE.source.url}
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              Organização Didática do IFRN
            </a>
            , homologada pela Resolução nº 85/2025-CONSUP/IFRN e atualizada pela
            Resolução nº 110/2025-CONSUP/IFRN, de 29 de outubro de 2025. Ela
            está na página de{" "}
            <a
              href={GUIDE.source.index}
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              documentos e normativos
            </a>{" "}
            do IFRN.
          </p>
          <p className={P}>
            A Organização Didática não fala em arredondamento, então a
            calculadora desta página arredonda a nota necessária pra cima.
          </p>
          <p className={P}>
            O IFRN Calc é um projeto independente, sem vínculo oficial com o
            IFRN. A nota que vale é a que está no SUAP; se ficar na dúvida,
            procure a secretaria acadêmica do seu campus.
          </p>

          <h2 className={H2}>Ainda faltam notas?</h2>
          <p className={P}>
            Se o último bimestre ainda não fechou, use a{" "}
            <Link href="/calculadora" className={LINK}>
              calculadora de média
            </Link>{" "}
            pra ver quanto você precisa tirar nele e passar sem prova final.
          </p>
        </article>

        <SuapCta />
      </main>
    </>
  )
}
