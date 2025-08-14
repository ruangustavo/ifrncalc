"use client"

import { motion } from "framer-motion"
import { CalculatorIcon, PenTool } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { DemoPreview } from "./demo-preview"
import { SignInButton } from "./sign-in-button"

export function MainContent() {
  const features: {
    title: string
    description: string
    icon: React.ReactNode
  }[] = [
    {
      title: "Cálculo automático",
      description:
        "Calcula automaticamente as notas necessárias baseado no sistema de pesos do IFRN",
      icon: <CalculatorIcon className="size-6 text-primary" aria-hidden />,
    },
    {
      title: "Edição de notas",
      description: "Simule diferentes cenários editando suas notas futuras",
      icon: <PenTool className="size-6 text-primary" aria-hidden />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <main className="relative flex flex-col items-center justify-center px-4 py-24">
        <motion.div
          className="-z-10 absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),rgba(255,255,255,0))]" />
        </motion.div>

        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-8 text-center"
          >
            <div className="relative w-fit rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/10 to-primary/5 p-6 backdrop-blur-sm">
              <CalculatorIcon className="size-20 text-primary" />
            </div>

            <div className="space-y-6">
              <h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-bold text-4xl text-transparent tracking-tight sm:text-5xl lg:text-6xl">
                {siteConfig.name}
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Calcule as notas necessárias para aprovação em suas disciplinas
                do IFRN. Conecte com seu SUAP e visualize suas médias em tempo
                real.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <SignInButton />
              <Link
                href="/calculadora"
                className="text-muted-foreground text-sm underline underline-offset-4"
              >
                Ir para a calculadora
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full max-w-3xl"
          >
            <h2 className="mb-8 text-center font-semibold text-2xl text-foreground">
              Funcionalidades
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <Card className="group shadow-none" key={feature.title}>
                  <CardHeader className="pb-3">
                    <CardDecorator>{feature.icon}</CardDecorator>

                    <h3 className="mt-6 font-medium">{feature.title}</h3>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <DemoPreview />

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

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div
    aria-hidden
    className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
  >
    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 [--border:black] dark:[--border:white]" />
    <div className="absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l bg-background">
      {children}
    </div>
  </div>
)
