import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calculadora de Média - IFRN",
  description:
    "Calcule sua média ponderada no IFRN de forma rápida e precisa. Suporte para disciplinas anuais e semestrais com os pesos corretos do sistema SUAP.",
  keywords: [
    "calculadora média ifrn",
    "cálculo notas ifrn",
    "média ponderada ifrn",
    "notas suap",
    "aprovação ifrn",
    "disciplinas anuais",
    "disciplinas semestrais",
    "sistema de avaliação ifrn",
    "calculadora escolar",
    "média para aprovação",
  ],
  openGraph: {
    title: "Calculadora de Média IFRN - Calcule suas notas",
    description:
      "Ferramenta gratuita para calcular média ponderada no IFRN. Descubra quanto precisa tirar para ser aprovado!",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calculadora de Média IFRN - Interface da ferramenta de cálculo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Média IFRN",
    description:
      "Calcule sua média ponderada no IFRN e descubra quanto precisa tirar para ser aprovado!",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/calculadora",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CalculadoraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
