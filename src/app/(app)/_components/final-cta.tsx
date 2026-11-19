import { SquareLock02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { SignInButton } from "./sign-in-button"

export function FinalCta() {
  return (
    <section className="px-4 pb-16 md:pb-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl bg-primary/10 px-6 py-14 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Saiba agora quanto falta em cada disciplina
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Leva menos de um minuto: entre com o SUAP e suas notas aparecem
          calculadas.
        </p>
        <SignInButton className="mt-8 w-full sm:w-auto" />
        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <HugeiconsIcon
            strokeWidth={2}
            icon={SquareLock02Icon}
            className="size-4 shrink-0"
          />
          Sua senha fica só com o SUAP.
        </p>
      </div>
    </section>
  )
}
