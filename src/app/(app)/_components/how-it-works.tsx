const STEPS = [
  {
    title: "Entre com o SUAP",
    description:
      "Você faz login na página oficial do SUAP, do mesmo jeito de sempre.",
  },
  {
    title: "Suas notas aparecem na hora",
    description:
      "O IFRN Calc lê o boletim do período atual direto do SUAP. Nada pra digitar.",
  },
  {
    title: "Veja quanto falta",
    description:
      "Cada bimestre em aberto mostra a nota que você precisa. Edite uma nota pra simular e o resto se recalcula.",
  },
] as const

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-14 bg-sun text-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="max-w-3xl font-display text-[clamp(2.5rem,10vw,3.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance lg:text-[clamp(3.5rem,5vw,4.75rem)]">
          Do SUAP até a nota que falta, em três passos.
        </h2>

        <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="border-t-2 border-ink pt-5">
              <span className="font-display text-7xl leading-none font-extrabold tracking-[-0.04em] tabular-nums">
                {index + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl leading-tight font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty text-ink/75">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
