import { cn } from "@/lib/utils"

import { ScrollSeen } from "./scroll-seen"

const EXAMPLES = [
  {
    discipline: "Programação Web",
    grades: "Tirou 90 no 1º bimestre",
    needed: 40,
    where: "no 2º bimestre",
    tone: "bg-lime",
    delay: "delay-0",
  },
  {
    discipline: "Matemática",
    grades: "Tirou 72 e 65",
    needed: 54,
    where: "no 3º e no 4º bimestre",
    tone: "bg-sun",
    delay: "delay-200",
  },
  {
    discipline: "Física",
    grades: "Tirou 45, 40 e 50",
    needed: 93,
    where: "no 4º bimestre",
    tone: "bg-coral",
    delay: "delay-[400ms]",
  },
] as const

export function Tiers() {
  return (
    <section id="cores" className="scroll-mt-14 bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="max-w-3xl font-display text-[clamp(2.5rem,10vw,3.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance lg:text-[clamp(3.5rem,5vw,4.75rem)]">
          A nota que falta, em cada disciplina.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-pretty text-ink/70">
          Pra cada bimestre em aberto, o IFRN Calc mostra quanto você precisa
          tirar pra fechar com média 60.
        </p>

        <ScrollSeen>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {EXAMPLES.map((example) => (
              <li
                key={example.discipline}
                className={cn(
                  "flex flex-col rounded-3xl p-6 transition-[opacity,scale] duration-500 ease-snap in-data-[seen=waiting]:scale-[0.94] in-data-[seen=waiting]:opacity-0 in-data-[seen=waiting]:transition-none motion-reduce:scale-100 motion-reduce:transition-opacity sm:p-8",
                  example.tone,
                  example.delay,
                )}
              >
                <span className="font-display text-2xl leading-tight font-bold">
                  {example.discipline}
                </span>
                <span className="mt-1 text-ink/75">{example.grades}</span>
                <span className="mt-8 text-sm font-semibold tracking-wide uppercase">
                  Precisa de
                </span>
                <span className="mt-2 font-display text-[clamp(5.5rem,24vw,8rem)] leading-[0.8] font-extrabold tracking-[-0.04em] tabular-nums sm:text-[clamp(5rem,11vw,9rem)]">
                  {example.needed}
                </span>
                <span className="mt-5 font-display text-xl font-bold">
                  {example.where}
                </span>
              </li>
            ))}
          </ul>
        </ScrollSeen>

        <p className="mt-6 text-sm text-ink/60">
          A cor acompanha o número: verde até 40, amarelo até 90 e vermelho
          acima disso.
        </p>
      </div>
    </section>
  )
}
