"use client"

import { motion } from "framer-motion"
import { CalculatorIcon, Sparkles } from "lucide-react"
import Image from "next/image"
import { siteConfig } from "@/config/site"
import { SignInButton } from "./sign-in-button"

export function MainContent() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-secondary/20">
      <motion.div
        className="-z-10 absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </motion.div>

      <div className="mx-4 flex max-w-3xl flex-col items-center space-y-6 px-4 py-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6"
        >
          <div className="relative w-fit rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-6 backdrop-blur-sm">
            <motion.div
              className="-right-2 -top-2 absolute"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="size-8 text-primary" />
            </motion.div>
            <CalculatorIcon className="size-28 text-primary drop-shadow-lg" />
          </div>

          <div className="space-y-6 text-center">
            <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text font-bold text-5xl text-transparent tracking-tight sm:text-6xl lg:text-7xl">
              {siteConfig.name}
            </h1>

            <p className="mx-auto max-w-[42rem] text-pretty text-lg text-muted-foreground/90 sm:text-xl">
              Use nossa calculadora de notas para saber as médias necessárias
              para aprovação no IFRN. Acesse com seu login SUAP e acompanhe seu
              desempenho.
            </p>
          </div>

          <div>
            <SignInButton />
          </div>
        </motion.div>

        <motion.div
          className="mt-8 flex items-center gap-2 text-muted-foreground text-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
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
  )
}
