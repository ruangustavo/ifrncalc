import { SignInButton } from "./sign-in-button"

export function FinalCta() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <div>
          <h2 className="max-w-xl text-4xl leading-none font-extrabold tracking-tighter text-balance md:text-6xl">
            Sua próxima prova já tem uma meta.
          </h2>
          <p className="mt-4 max-w-md text-lg text-primary-foreground/80">
            Entre com o SUAP e veja agora quanto falta em cada disciplina. Leva
            menos de um minuto.
          </p>
        </div>
        <SignInButton variant="secondary" className="w-full md:w-auto" />
      </div>
    </section>
  )
}
