"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import screenshotImage from "@/images/screenshot.png"
import { PhoneFrame } from "./phone-frame"
import { SignInButton } from "./sign-in-button"

export function MainContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <main className="relative flex flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-8 text-center"
          >
            <div className="flex flex-col items-center space-y-4">
              <h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-bold text-4xl text-transparent tracking-tight sm:text-3xl lg:text-4xl">
                Calcule suas médias para passar
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Calcule as notas necessárias para aprovação em suas disciplinas
                do IFRN. Conecte com seu SUAP e visualize suas médias.
              </p>

              <SignInButton />
              <Link
                href="/calculadora"
                className="text-muted-foreground text-sm underline underline-offset-4"
              >
                Ir para a calculadora
              </Link>
            </div>

            <div className="relative">
              <div className="max-w-full overflow-hidden [mask-image:var(--mask-image)]">
                <PhoneFrame
                  src={screenshotImage.src}
                  height={441}
                  className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full max-w-3xl"
          >
            <h2 className="mb-8 text-center font-semibold text-2xl text-foreground">
              Como funciona
            </h2>

            <div className="space-y-8 text-muted-foreground">
              <div className="space-y-3">
                <p>
                  O app conecta com seu SUAP e busca suas notas automaticamente.
                  Ele mostra todas as suas disciplinas do período atual.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  Para cada disciplina, o sistema calcula as notas que você
                  precisa tirar nas etapas que ainda não foram realizadas. O
                  cálculo utiliza os pesos do IFRN:
                </p>

                <div className="flex justify-center">
                  <div className="grid max-w-md grid-cols-4 gap-2">
                    <div className="text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-primary/30 bg-primary/10 font-medium text-primary text-sm">
                        E1
                      </div>
                      <div className="mt-1 text-xs">2 pts</div>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-primary/30 bg-primary/10 font-medium text-primary text-sm">
                        E2
                      </div>
                      <div className="mt-1 text-xs">2 pts</div>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-primary/30 bg-primary/10 font-medium text-primary text-sm">
                        E3
                      </div>
                      <div className="mt-1 text-xs">3 pts</div>
                    </div>
                    <div className="text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-primary/30 bg-primary/10 font-medium text-primary text-sm">
                        E4
                      </div>
                      <div className="mt-1 text-xs">3 pts</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  Se você tem 4 avaliações no semestre, precisa de 60 pontos
                  para passar. Veja um exemplo:
                </p>

                <div className="mx-auto max-w-md rounded-lg bg-muted/50 p-4">
                  <div className="mb-3 text-center font-medium text-sm">
                    Exemplo: Matemática (4 avaliações)
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">E1: 70</span>
                      <span className="text-muted-foreground text-xs">
                        70 × 2 = 140 pts
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">E2: 80</span>
                      <span className="text-muted-foreground text-xs">
                        80 × 2 = 160 pts
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">E3: ?</span>
                      <span className="font-medium text-primary text-xs">
                        Precisa: 50 pts
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">E4: ?</span>
                      <span className="font-medium text-primary text-xs">
                        Precisa: 50 pts
                      </span>
                    </div>
                    <div className="mt-2 border-t pt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Total:</span>
                        <span>140 + 160 + 150 + 150 = 600 pts</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Média:</span>
                        <span className="font-medium text-green-600">
                          600 ÷ 10 = 60 <Check className="inline size-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  Se você tem só 2 avaliações (no caso de avaliações
                  semestrais), a primeira vale 2 pontos e a segunda vale 3:
                </p>

                <div className="mx-auto max-w-md rounded-lg bg-muted/50 p-4">
                  <div className="mb-3 text-center font-medium text-sm">
                    Exemplo: História (2 avaliações)
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">E1: 60</span>
                      <span className="text-muted-foreground text-xs">
                        60 × 2 = 120 pts
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">E2: ?</span>
                      <span className="font-medium text-primary text-xs">
                        Precisa: 60 pts
                      </span>
                    </div>
                    <div className="mt-2 border-t pt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Total:</span>
                        <span>120 + 180 = 300 pts</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Média:</span>
                        <span className="font-medium text-green-600">
                          300 ÷ 5 = 60 <Check className="inline size-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p>
                  Você pode editar as notas futuras para simular diferentes
                  cenários e ver como isso afeta sua média final.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 text-muted-foreground text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span>Desenvolvido por</span>
            <Image
              src="https://github.com/ruangustavo.png"
              alt="Ruan Gustavo"
              width={24}
              height={24}
              className="rounded-full"
            />
            <a
              href="https://github.com/ruangustavo"
              target="_blank"
              className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
              rel="noreferrer"
            >
              Ruan Gustavo
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
