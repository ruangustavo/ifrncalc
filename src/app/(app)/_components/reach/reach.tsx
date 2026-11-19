import { RnMap } from "./rn-map"
import { RN_CAMPUS_CITIES } from "./rn-outline"

const CITIES = RN_CAMPUS_CITIES.map((city) => city.name).toSorted((a, b) =>
  a.localeCompare(b, "pt-BR"),
)

export function Reach() {
  return (
    <section id="alunos" className="scroll-mt-14 overflow-x-clip">
      <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-32">
        <div className="lg:col-span-5">
          <h2>
            <span className="block font-display text-[clamp(5rem,22vw,7rem)] leading-[0.85] font-extrabold tracking-[-0.02em] text-lime lg:text-[clamp(7rem,10.5vw,10rem)]">
              +10 mil
            </span>
            <span className="mt-4 block max-w-sm font-display text-2xl leading-tight font-semibold text-balance sm:text-3xl">
              alunos do IFRN já fizeram essa conta aqui.
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-lg text-pretty text-cream/75">
            Funciona em todos os campi do IFRN, pra qualquer aluno com acesso ao
            SUAP.
          </p>
        </div>

        <div className="lg:col-span-7">
          <RnMap />
          <ul className="mt-8 flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <li
                key={city}
                className="rounded-full border border-cream/20 px-3 py-1 text-sm text-cream/80"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
