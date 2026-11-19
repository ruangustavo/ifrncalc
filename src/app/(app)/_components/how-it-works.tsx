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
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <p className="text-sm font-semibold text-primary">Como funciona</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-balance md:text-4xl">
        Do SUAP até a nota que falta em três passos
      </h2>

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title} className="rounded-2xl border bg-card p-6">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-1 text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-2xl border bg-card px-4 py-10 sm:px-8">
        <h3 className="text-center text-xl font-semibold">
          A conta que a gente faz por você
        </h3>
        <p className="mx-auto mt-2 mb-8 max-w-lg text-center text-muted-foreground">
          No IFRN, os bimestres têm pesos diferentes. É por isso que fazer a
          conta de cabeça engana.
        </p>
        <CalcExplainer />
      </div>
    </section>
  )
}
