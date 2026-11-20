import type { Metadata } from "next"
import Link from "next/link"

import { GuideHeader } from "@/app/prova-final/_components/guide-header"
import { SuapCta } from "@/app/prova-final/_components/suap-cta"
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
import { absenceLimit } from "@/utils/attendance"

import { AttendanceCalculator } from "./_components/attendance-calculator"
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

const LIMIT_BY_CLASSES = [400, 600, 800, 1000, 1200].map((classes) => ({
  classes,
  limit: absenceLimit(classes),
}))

const WHAT_HAPPENS = [
  {
    course: "Técnico integrado, subsequente e PROEJA",
    outcome: "Reprova na série inteira, sem dependência",
  },
  {
    course: "Superior (tecnologia, engenharia, licenciatura)",
    outcome: "Reprova no período",
  },
]

const H2 = "mt-14 text-2xl leading-tight font-bold tracking-tight text-balance"
const P = "mt-4 leading-relaxed text-pretty"

const QUOTE =
  "mt-4 border-l-2 border-primary pl-4 text-sm leading-relaxed text-pretty text-muted-foreground"

const LINK = "font-medium text-primary underline underline-offset-4"

export default function Faltas() {
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
            No IFRN, você precisa de pelo menos 75% de frequência na carga
            horária total das disciplinas do período. A regra fala do total,
            somando todas as disciplinas, e não de cada disciplina separada.
            Abaixo de 75%, você reprova por falta com qualquer média e perde o
            direito à prova final.
          </p>

          <AttendanceCalculator />
          <p className="mt-3 text-sm text-pretty text-muted-foreground">
            O total de aulas e de faltas de cada disciplina aparece no seu
            boletim do SUAP. Some as disciplinas pra ter o total do período.
          </p>

          <h2 className={H2}>Qual é a frequência mínima no IFRN?</h2>
          <p className={P}>
            75% da carga horária total das disciplinas que você cursa no
            período. A regra é a mesma em todos os cursos: integrado,
            subsequente, PROEJA e superior.
          </p>
          <blockquote className={QUOTE}>
            “Em todos os cursos ofertados no IFRN, será considerado reprovado
            por falta o(a) estudante que não obtiver frequência mínima de 75%
            (setenta e cinco por cento) da carga horária total das disciplinas
            cursadas, independentemente da média final.”
            <footer className="mt-1">
              Organização Didática do IFRN, Art. 333
            </footer>
          </blockquote>

          <h2 className={H2}>Quantas faltas eu posso ter?</h2>
          <p className={P}>
            O limite é 25% das aulas do período. Com 800 aulas no total, por
            exemplo, são 200 faltas somando todas as disciplinas.
          </p>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aulas no período</TableHead>
                  <TableHead>Limite de faltas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LIMIT_BY_CLASSES.map((row) => (
                  <TableRow key={row.classes}>
                    <TableCell>{row.classes}</TableCell>
                    <TableCell>{row.limit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className={P}>
            Como a conta é pelo total, uma disciplina com muitas faltas não
            reprova sozinha. O que decide é a soma de todas.
          </p>

          <h2 className={H2}>O que acontece se eu reprovar por falta?</h2>
          <p className={P}>
            Você perde o direito à prova final em todas as disciplinas, porque
            ela só vale pra quem não reprovou por falta. O resto depende do tipo
            de curso:
          </p>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Curso</TableHead>
                  <TableHead>O que acontece</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WHAT_HAPPENS.map((row) => (
                  <TableRow key={row.course}>
                    <TableCell className="whitespace-normal">
                      {row.course}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {row.outcome}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className={P}>
            No integrado e no subsequente, quem reprova em até 3 disciplinas
            pode seguir com dependência. Quem reprova por falta não tem essa
            opção e refaz a série.
          </p>
          <blockquote className={QUOTE}>
            “Nos cursos com regime seriado ou modular, será considerado
            reprovado na série ou módulo o(a) estudante que: I. for reprovado
            por falta (ausência); ou II. for reprovado em quatro (4) ou mais
            disciplinas.”
            <footer className="mt-1">
              Organização Didática do IFRN, Art. 340
            </footer>
          </blockquote>

          <h2 className={H2}>Dá pra justificar falta?</h2>
          <p className={P}>
            Dá, em três casos: tratamento de saúde com atestado médico, falta de
            transporte (inter)municipal com declaração da prefeitura, ou plantão
            militar ou de trabalho com declaração do chefe. O comprovante vai
            pra Diretoria Acadêmica em até 2 dias úteis depois que você volta às
            aulas.
          </p>
          <p className={P}>
            O prazo conta a partir de cada volta, então entregue o comprovante
            logo, sem esperar a frequência cair. A Organização Didática não diz
            se a falta justificada sai da conta; na dúvida, pergunte na
            Diretoria Acadêmica do seu campus.
          </p>
          <blockquote className={QUOTE}>
            “Caso o(a) estudante obtenha frequência inferior a 75%, poderá ser
            realizada a justificativa das ausências em cada disciplina, desde
            que haja sido apresentada documentação comprobatória à Diretoria
            Acadêmica, no prazo de até dois (2) dias úteis após o retorno do(a)
            estudante às atividades acadêmicas [...].”
            <footer className="mt-1">
              Organização Didática do IFRN, Art. 333, parágrafo único
            </footer>
          </blockquote>

          <h2 className={H2}>E abono de faltas?</h2>
          <p className={P}>
            Abono é outra coisa: a falta é registrada, mas não conta contra
            você. Na Organização Didática, ele vem com o atendimento domiciliar,
            pra quem precisa se afastar por mais de 15 dias por um destes
            motivos:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
            <li>doença infectocontagiosa;</li>
            <li>tratamento de saúde com afastamento comprovado;</li>
            <li>
              acompanhar familiar de primeiro grau com problema de saúde, com
              parecer do serviço social do campus;
            </li>
            <li>licença à gestante.</li>
          </ul>
          <p className={P}>
            O pedido vai pra Diretoria Acadêmica, com laudo médico visado pelo
            setor médico do campus. São até 60 dias, que podem chegar a 120; no
            caso da gestante, até 120 dias. Durante o atendimento, você faz as
            atividades em casa e mantém o direito às provas finais.
          </p>
          <blockquote className={QUOTE}>
            “O(a) estudante terá suas ausências registradas e abonadas durante o
            período em que estiver em atendimento domiciliar.”
            <footer className="mt-1">
              Organização Didática do IFRN, Art. 323, § 4º
            </footer>
          </blockquote>
          <p className={P}>
            A lei federal também abona as faltas de quem é convocado pra
            exercícios ou manobras no serviço militar e de reservistas no Dia do
            Reservista (
            <a
              href={GUIDE.laws.militaryService}
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              Lei nº 4.375/1964, Art. 60, § 4º
            </a>
            ), e garante exercícios domiciliares à estudante gestante (
            <a
              href={GUIDE.laws.pregnancy}
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              Lei nº 6.202/1975
            </a>
            ).
          </p>

          <h2 className={H2}>De onde vem essa regra?</h2>
          <p className={P}>
            Dos artigos 323, 333, 339, 340 e 341 da{" "}
            <a
              href={GUIDE.source.url}
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              Organização Didática do IFRN
            </a>
            , atualizada pela Resolução nº 110/2025-CONSUP/IFRN, que vale pra
            quem entrou a partir de 2025.2. Quem entrou entre 2012.1 e 2024.2
            segue a{" "}
            <a
              href={GUIDE.source.previousUrl}
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              versão anterior
            </a>
            , com as mesmas regras de frequência nos artigos 249, 258, 263, 264
            e 265. As duas estão na página de{" "}
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
            calculadora desta página arredonda a frequência pra baixo.
          </p>
          <p className={P}>
            O IFRN Calc é um projeto independente, sem vínculo oficial com o
            IFRN. A frequência que vale é a que está no SUAP; se ficar na
            dúvida, procure a secretaria acadêmica do seu campus.
          </p>

          <h2 className={H2}>Vai pra prova final?</h2>
          <p className={P}>
            Se você não reprovou por falta e fechou alguma disciplina com média
            entre 20 e 60, veja{" "}
            <Link href="/prova-final" className={LINK}>
              quanto precisa tirar na prova final
            </Link>
            .
          </p>
        </article>

        <SuapCta />
      </main>
    </>
  )
}
