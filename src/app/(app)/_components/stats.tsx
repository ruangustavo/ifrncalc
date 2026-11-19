const STATS = [
  { value: "+10 mil", label: "alunos já calcularam suas notas" },
  { value: "Todos", label: "os campi do IFRN no RN" },
  { value: "R$ 0", label: "gratuito e de código aberto" },
] as const

export function Stats() {
  return (
    <section className="border-y">
      <dl className="mx-auto grid max-w-6xl divide-y px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((stat) => (
          <div key={stat.label} className="py-8 sm:px-8 sm:first:pl-0">
            <dt className="text-4xl font-extrabold tracking-tighter text-highlight">
              {stat.value}
            </dt>
            <dd className="mt-1 text-muted-foreground">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
