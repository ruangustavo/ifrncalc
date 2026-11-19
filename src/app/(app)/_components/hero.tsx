import { SquareLock02Icon, UserGroupIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { DemoApp } from "./demo/demo-app"
import { SignInButton } from "./sign-in-button"

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-16 md:grid-cols-[1fr_400px] md:items-center md:gap-16 md:pt-16 md:pb-24">
      <div className="flex flex-col items-start">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground sm:text-sm">
          <HugeiconsIcon
            strokeWidth={2}
            icon={UserGroupIcon}
            className="size-4 text-primary"
          />
          Mais de 10 mil alunos em todos os campi do RN
        </p>

        <h1 className="text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Descubra quanto você precisa tirar pra{" "}
          <span className="text-primary">passar</span>.
        </h1>

        <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
          O IFRN Calc puxa suas notas direto do SUAP e calcula, disciplina por
          disciplina, a nota que falta pra você ser aprovado. Sem planilha, sem
          conta na mão.
        </p>

        <SignInButton className="mt-8 w-full sm:w-auto" />

        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <HugeiconsIcon
            strokeWidth={2}
            icon={SquareLock02Icon}
            className="size-4 shrink-0"
          />
          Login oficial do SUAP. Sua senha nunca passa pela gente.
        </p>

        <Link
          href="/calculadora"
          className="mt-6 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Prefere digitar as notas? Use a calculadora
        </Link>
      </div>

      <div id="demo" className="scroll-mt-20">
        <p className="mb-3 text-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Experimente:</span>{" "}
          toque numa nota colorida e simule quanto você vai tirar.
        </p>
        <DemoApp />
      </div>
    </section>
  )
}
