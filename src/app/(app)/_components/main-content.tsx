"use client"

import { Github } from "lucide-react"
import { Bricolage_Grotesque } from "next/font/google"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { type ReactNode, useEffect, useRef } from "react"
import { Highlighter } from "@/components/ui/highlighter"
import { siteConfig } from "@/config/site"
import { LandingIcon } from "./landing-icon"
import styles from "./main-content.module.css"

interface MainContentProps {
  starCount: ReactNode
}

const stages = [
  { label: "E1", grade: "72", color: "bg-cyan-300" },
  { label: "E2", grade: "64", color: "bg-violet-300" },
  { label: "E3", grade: "?", color: "bg-pink-300" },
  { label: "E4", grade: "?", color: "bg-lime-300" },
]

const steps = [
  {
    number: "01",
    icon: "connect",
    title: "Entre pelo SUAP",
    text: "A gente busca suas disciplinas e notas atuais.",
  },
  {
    number: "02",
    icon: "target",
    title: "Veja o que falta",
    text: "Cada matéria ganha uma meta clara e possível.",
  },
  {
    number: "03",
    icon: "sliders",
    title: "Teste cenários",
    text: "Mude notas futuras e monte seu plano de jogo.",
  },
] as const

const bricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"] })

export function MainContent({ starCount }: MainContentProps) {
  const illustrationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const illustration = illustrationRef.current
    if (!illustration || !("IntersectionObserver" in window)) return

    // Let visible-on-load artwork animate in CSS, without waiting for hydration.
    // Only defer offscreen artwork, so it stays visible even without JavaScript.
    const { top, bottom } = illustration.getBoundingClientRect()
    if (top < window.innerHeight && bottom > 0) return

    illustration.dataset.reveal = "pending"
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          illustration.dataset.reveal = "visible"
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(illustration)

    return () => {
      observer.disconnect()
      delete illustration.dataset.reveal
    }
  }, [])

  return (
    <main
      className={`${bricolageGrotesque.className} min-h-screen overflow-hidden bg-[#f5efdf] text-[#16332a] selection:bg-yellow-300`}
    >
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,transparent,transparent_27px,#7fa9c4_28px)]" />
      <div className="fixed top-0 left-[7vw] h-full w-px bg-red-300/60" />

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-black tracking-tight"
        >
          <LandingIcon name="calculator" className="size-9.5" />
          <span className="text-lg">IFRN Calc</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/calculadora"
            className="hidden font-bold text-sm underline decoration-2 decoration-wavy underline-offset-4 sm:block"
          >
            calculadora manual
          </Link>
          <button
            type="button"
            onClick={() => signIn("suap")}
            className={`${styles.button} rounded-lg border-2 border-[#16332a] bg-white px-4 py-2 font-black text-sm shadow-[3px_3px_0_#16332a]`}
          >
            Entrar
          </button>
        </div>
      </nav>

      <section className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:py-10">
        <div className={`${styles.hero} relative z-10`}>
          <div className="mb-7 inline-flex rotate-[-2deg] items-center gap-2 bg-yellow-300 px-4 py-2 font-black text-sm shadow-[3px_3px_0_#16332a]">
            ei, futuro aprovado!
            <LandingIcon name="wave" className="size-6.5" />
          </div>
          <h1 className="max-w-3xl font-black text-5xl leading-[.98] tracking-[-.045em] sm:text-7xl lg:text-[5.6rem]">
            Menos conta.
            <br />
            Mais tempo pra{" "}
            <Highlighter
              action="underline"
              color="#ef7d52"
              strokeWidth={5}
              animationDuration={700}
              iterations={2}
              padding={3}
            >
              <span className="text-emerald-700">estudar.</span>
            </Highlighter>
          </h1>
          <p className="mt-9 max-w-xl font-medium text-[#385c50] text-lg leading-relaxed sm:text-xl">
            O IFRN Calc olha suas notas no SUAP e conta direitinho quanto você
            precisa nas próximas etapas.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => signIn("suap")}
              className={`${styles.button} inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border-2 border-[#16332a] bg-emerald-600 px-6 font-bold text-white shadow-[5px_5px_0_#16332a]`}
            >
              Conectar com o SUAP
              <LandingIcon name="arrow" className={`${styles.arrow} size-5`} />
            </button>
            <span className="max-w-40 rotate-2 font-bold text-[#577268] text-sm">
              leva menos de 1 minuto{" "}
              <LandingIcon
                name="arrow"
                className="inline-block size-6 rotate-[-135deg] align-middle"
              />
            </span>
          </div>
        </div>

        <div
          ref={illustrationRef}
          className={`${styles.illustration} relative mx-auto h-[570px] w-full max-w-[520px]`}
        >
          <div
            className={`${styles.card} absolute top-20 left-2 w-[78%] rotate-[-7deg] rounded-sm bg-[#eea47a] p-6 pb-16 shadow-xl`}
          >
            <p className="font-black text-sm uppercase tracking-wider">
              Lembrete importante
            </p>
            <p className="mt-5 font-black text-3xl leading-tight">
              Você não é a sua nota.
              <br />
              Mas saber a meta ajuda.
            </p>
            <LandingIcon
              name="star"
              className="absolute -top-8 left-8 size-12 rotate-[-9deg]"
            />
          </div>

          <div
            className={`${styles.card} ${styles.target} absolute top-2 right-0 w-[58%] rotate-5 rounded-2xl border-2 border-[#16332a] bg-[#91d8ca] p-5 shadow-[6px_7px_0_#16332a]`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-black text-xs uppercase">meta atual</p>
              <LandingIcon name="target" className="size-8" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <strong className="font-black text-6xl">54</strong>
              <span className="mb-2 font-bold text-sm">em E3 + E4</span>
            </div>
            <div className="mt-4 h-3 rounded-full border-2 border-[#16332a] bg-white">
              <div
                className={`${styles.progress} h-full w-[68%] rounded-full bg-yellow-300`}
              />
            </div>
          </div>

          <div
            className={`${styles.card} ${styles.report} absolute bottom-8 left-[12%] w-[82%] rotate-2 border-2 border-[#16332a] bg-white p-5 shadow-[8px_9px_0_#16332a]`}
          >
            <div className="flex items-center justify-between gap-2 border-[#16332a]/25 border-b-2 border-dashed pb-3">
              <div className="flex items-center gap-2">
                <LandingIcon name="report" className="size-8" />
                <div>
                  <p className="font-black text-emerald-700 text-xs uppercase tracking-widest">
                    Boletim traduzido
                  </p>
                  <h2 className="font-black text-xl">Matemática</h2>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 font-black text-xs">
                <span className="sr-only min-[480px]:not-sr-only">
                  no caminho
                </span>
                <LandingIcon name="check" className="size-4.5" />
              </span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {stages.map((stage) => (
                <div key={stage.label} className="text-center">
                  <div
                    className={`${stage.color} grid aspect-square place-items-center rounded-full border-2 border-[#16332a] font-black text-xl`}
                  >
                    {stage.grade}
                  </div>
                  <span className="mt-1 block font-black text-xs">
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 bg-[#f5efdf] p-3 font-bold text-sm">
              <LandingIcon name="pencil" className="size-8" />
              Se repetir seu desempenho, fecha com 63.
            </p>
          </div>
          <div
            className={`${styles.card} ${styles.sticker} absolute right-0 bottom-2 inline-flex rotate-9 items-center gap-1.5 rounded-full border-2 border-[#16332a] bg-yellow-300 px-4 py-3 font-black shadow-[3px_3px_0_#16332a]`}
          >
            <LandingIcon name="check" className="size-4.5" />
            sem susto!
          </div>
        </div>
      </section>

      <section className="relative bg-[#16332a] px-5 py-20 text-[#f5efdf] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-black text-sm text-yellow-300 uppercase tracking-[.2em]">
                É tipo cola — mas permitida
              </p>
              <h2 className="mt-3 max-w-2xl font-black text-4xl tracking-tight sm:text-6xl">
                Três passos. Zero fórmula decorada.
              </h2>
            </div>
            <Link
              href="/calculadora"
              className="inline-flex items-center gap-2 font-black text-yellow-300 underline decoration-wavy underline-offset-8"
            >
              ou faça uma simulação manual
              <LandingIcon name="arrow" className="size-5" />
            </Link>
          </div>
          <div className="grid border-white/20 border-t md:grid-cols-3">
            {steps.map(({ number, icon, title, text }, index) => (
              <div
                key={number}
                className={`py-8 md:px-8 ${index > 0 ? "border-white/20 border-t md:border-t-0 md:border-l" : ""}`}
              >
                <div className="flex h-16 items-center justify-between gap-4">
                  <LandingIcon
                    name={icon}
                    className="size-14 text-yellow-300"
                  />
                  <span className="font-black text-yellow-300">{number}</span>
                </div>
                <h3 className="mt-7 font-black text-2xl">{title}</h3>
                <p className="mt-3 max-w-xs text-[#aec6bd] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <footer className="mt-16 flex flex-wrap justify-between gap-4 text-[#8ba79d] text-sm">
            <span>Feito por quem também já sofreu esperando nota no SUAP.</span>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <Github className="size-4" aria-hidden="true" /> deixa uma estrela{" "}
              {starCount}
            </a>
          </footer>
        </div>
      </section>
    </main>
  )
}
