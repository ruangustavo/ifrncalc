import { CalcExplainer } from "./calc-explainer/calc-explainer"

const STEPS = [
  {
    title: "Entre com o SUAP",
    description:
      "Você faz login na página oficial do SUAP, do mesmo jeito de sempre.",
  },
  {
    title: "Suas notas chegam sozinhas",
    description:
      "O IFRN Calc lê o boletim do período atual direto do SUAP. Nada pra digitar.",
  },
  {
    title: "Veja quanto falta",
    description:
      "Cada bimestre em aberto mostra a nota que você precisa pra fechar com média 60. Edite uma nota pra simular e o resto se recalcula.",
  },
] as const

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <h2 className="max-w-2xl text-4xl leading-none font-extrabold tracking-tighter text-balance md:text-5xl">
          Do SUAP até a nota que falta,{" "}
          <span className="text-highlight">em três passos.</span>
        </h2>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-2xl border bg-card p-6">
              <span className="text-sm font-semibold text-highlight tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-bold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-4 rounded-2xl border bg-card px-4 py-10 sm:px-8">
          <h3 className="text-center text-xl font-bold tracking-tight">
            A conta que a gente faz por você
          </h3>
          <p className="mx-auto mt-2 mb-8 max-w-lg text-center text-muted-foreground">
            No IFRN, os bimestres têm pesos diferentes. É por isso que fazer a
            conta de cabeça engana.
          </p>
          <CalcExplainer />
        </div>
      </div>
    </section>
  )
}
