import { SignInButton } from "../sign-in-button"
import { SunRays } from "./sun-rays"

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-lime text-ink">
      <SunRays />
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div>
          <h2 className="max-w-3xl font-display text-[clamp(2.75rem,11vw,4rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-balance lg:text-[clamp(4rem,6vw,5.5rem)]">
            Veja quanto falta em cada disciplina.
          </h2>
          <p className="mt-6 max-w-md text-lg text-pretty text-ink/75">
            Entre com o SUAP e suas notas aparecem calculadas. Leva menos de um
            minuto.
          </p>
        </div>
        <SignInButton className="w-full bg-ink text-cream hover:bg-ink/85 sm:w-auto" />
      </div>
    </section>
  )
}
