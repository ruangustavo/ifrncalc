import Image from "next/image"
import Link from "next/link"

import demoScreen from "./demo-screen.png"

export function DemoPhone() {
  return (
    <figure className="flex flex-col items-center">
      <Link
        href="/demo"
        aria-label="Abrir o boletim de exemplo"
        className="block rounded-[2.75rem] bg-ink p-2.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-cream/15 transition-transform duration-200 ease-snap outline-none focus-visible:ring-4 focus-visible:ring-lime/60 motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.99]"
      >
        <Image
          src={demoScreen}
          alt="Boletim de exemplo no IFRN Calc, com a nota que falta em cada disciplina"
          width={304}
          height={624}
          sizes="304px"
          priority
          className="block rounded-[2.25rem]"
        />
      </Link>
      <figcaption className="mt-4 text-sm text-cream/60">
        Boletim de exemplo · toca pra abrir
      </figcaption>
    </figure>
  )
}
