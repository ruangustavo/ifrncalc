import { SquareLock02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { SignInButton } from "../sign-in-button"
import { ChalkBoard } from "./chalk-board"

export function Hero() {
  return (
    <section className="overflow-clip">
      <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-14 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center rounded-full bg-sun px-3 py-1 font-display text-sm font-bold text-ink">
            +10 mil alunos do IFRN já usaram
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,12vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.035em] lg:text-[clamp(3.75rem,5.4vw,5.25rem)]">
            Quanto falta pra você <span className="text-lime">passar?</span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-pretty text-cream/75">
            O IFRN Calc puxa suas notas direto do SUAP e mostra, em cada
            disciplina, a nota que você precisa tirar.{" "}
            <span className="font-semibold text-cream">
              Sem fazer conta na mão.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SignInButton className="w-full sm:w-auto" />
            <Button
              variant="outline"
              size="xl"
              className="w-full border-input bg-input/30 text-cream hover:bg-input/50 hover:text-cream sm:w-auto"
              asChild
            >
              <Link href="/calculadora">Calcular sem login</Link>
            </Button>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-sm text-cream/60">
            <HugeiconsIcon
              strokeWidth={2}
              icon={SquareLock02Icon}
              className="size-4 shrink-0"
            />
            Você entra pela página oficial do SUAP. Sua senha não passa pela
            gente.
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <ChalkBoard />
        </div>
      </div>
    </section>
  )
}
