import { SignInButton } from "@/app/(app)/_components/sign-in-button"

export function DemoCta() {
  return (
    <section className="rounded-3xl bg-chrome p-6 text-chrome-foreground sm:p-8">
      <h2 className="text-2xl leading-tight font-bold">
        Agora com as suas notas
      </h2>
      <p className="mt-2 text-pretty text-chrome-foreground/75">
        Conecte com o SUAP e veja essa conta pronta em todas as suas
        disciplinas, toda vez que sai nota.
      </p>
      <SignInButton variant="chrome" className="mt-5 w-full sm:w-auto" />
    </section>
  )
}
