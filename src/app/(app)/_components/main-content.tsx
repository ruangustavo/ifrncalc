'use client'

import { siteConfig } from '@/config/site'
import { motion } from 'framer-motion'
import { CalculatorIcon, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { SignInButton } from './sign-in-button'

export function MainContent() {
  return (
    <main className="relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-secondary/20">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </motion.div>

      <div className="mx-4 flex max-w-3xl flex-col items-center space-y-6 px-4 py-16">
        <motion.div
          className="relative rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-6 backdrop-blur-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute -right-2 -top-2"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="size-6 text-primary" />
          </motion.div>
          <CalculatorIcon className="size-28 text-primary drop-shadow-lg" />
        </motion.div>

        <div className="space-y-6 text-center">
          <motion.h1
            className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            className="text-pretty mx-auto max-w-[42rem] text-lg text-muted-foreground/90 sm:text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Use nossa calculadora de notas para saber as médias necessárias para
            aprovação no IFRN. Acesse com seu login SUAP e acompanhe seu
            desempenho.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SignInButton />
        </motion.div>

        <motion.div
          className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
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
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
            rel="noreferrer"
          >
            Ruan Gustavo
          </a>
        </motion.div>
      </div>
    </main>
  )
}
