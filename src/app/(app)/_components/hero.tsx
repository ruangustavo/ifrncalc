import { SquareLock02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"

import { DemoApp } from "./demo/demo-app"
import { SignInButton } from "./sign-in-button"

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 pt-12 pb-20 md:grid-cols-[1fr_420px] md:items-center md:gap-16 md:pt-24 md:pb-28">
      <div>
        <h1 className="text-5xl leading-[0.95] font-extrabold tracking-tighter text-balance sm:text-6xl lg:text-7xl">
          Descubra quanto falta pra você{" "}
          <span className="text-highlight">passar.</span>
        </h1>

        <p className="mt-6 max-w-lg text-lg text-pretty text-muted-foreground">
          O IFRN Calc puxa suas notas direto do SUAP e mostra, em cada
          disciplina, a nota que você precisa tirar.{" "}
          <span className="font-semibold text-foreground">
            Sem planilha, sem conta na mão.
          </span>
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <SignInButton className="w-full sm:w-auto" />
          <Button
            variant="outline"
            size="xl"
            className="w-full sm:w-auto"
            asChild
          >
            <a href="#como-funciona">Ver como funciona</a>
          </Button>
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <HugeiconsIcon
            strokeWidth={2}
            icon={SquareLock02Icon}
            className="size-4 shrink-0"
          />
          Login oficial do SUAP. Sua senha nunca passa pela gente.
        </p>
      </div>

      <figure id="demo" className="scroll-mt-24">
        <DemoApp />
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          Toque numa nota colorida e simule quanto você vai tirar.
        </figcaption>
      </figure>
    </section>
  )
}
