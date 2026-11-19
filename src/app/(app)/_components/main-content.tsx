"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import { siteConfig } from "@/config/site"
import screenshotImage from "@/images/screenshot.png"

import { CalcExplainer } from "./calc-explainer/calc-explainer"
import { PhoneFrame } from "./phone-frame"
import { SignInButton } from "./sign-in-button"

interface MainContentProps {
  starCount: ReactNode
}

export function MainContent({ starCount }: MainContentProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background/95 to-muted/20">
      <main className="relative flex flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-8 text-center"
          >
            <div className="flex flex-col items-center space-y-4">
              <h1 className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-3xl lg:text-4xl">
                Calcule suas médias para passar
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Calcule as notas necessárias para aprovação em suas disciplinas
                do IFRN. Conecte com seu SUAP e visualize suas médias.
              </p>

              <SignInButton />
              <Link
                href="/calculadora"
                className="text-sm text-muted-foreground underline underline-offset-4"
              >
                Ir para a calculadora
              </Link>
            </div>

            <div className="relative">
              <div className="max-w-full overflow-hidden mask-(--mask-image)">
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
            <h2 className="mb-8 text-center text-2xl font-semibold text-foreground">
              Como funciona
            </h2>

            <CalcExplainer />
          </motion.div>

          <motion.p
            className="flex flex-wrap items-center justify-center gap-x-2 text-center text-sm text-muted-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span>
              é dev? deixa uma estrelinha no{" "}
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
              >
                projeto
              </a>{" "}
              ou contribua com código :)
            </span>
            {starCount}
          </motion.p>

          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
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
