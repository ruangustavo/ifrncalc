import { DM_Sans } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import Script from "next/script"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Providers } from "./providers"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} - ${siteConfig.description}`,
  },
  description: siteConfig.description,
  keywords: [
    "ifrn",
    "notas",
    "cálculo",
    "médias",
    "suap",
    "ifcalc",
    "ifrncalc",
    "ifrn calc",
    "calculadora de notas",
    "cálculo de notas ifrn",
    "aprovação no ifrn",
    "notas suap",
    "calcular médias suap",
    "médias para aprovação ifrn",
    "desempenho acadêmico ifrn",
    "calculadora ifrn",
    "sistema de notas ifrn",
    "cálculo de médias online",
    "médias suap ifrn",
    "notas finais ifrn",
    "calculadora de médias para ifrn",
    "educação",
    "estudante",
    "instituto federal",
    "aprovação escolar",
    "ifrn natal calculadora",
    "ifrn mossoró notas",
    "ifrn caicó média",
    "ifrn apodi calculadora",
    "ifrn ceará-mirim notas",
    "ifrn currais novos",
    "ifrn ipanguaçu média",
    "ifrn joão câmara",
    "ifrn jucurutu notas",
    "ifrn lajes calculadora",
    "ifrn macau média",
    "ifrn nova cruz",
    "ifrn parelhas notas",
    "ifrn parnamirim calculadora",
    "ifrn pau dos ferros",
    "ifrn santa cruz média",
    "ifrn são gonçalo do amarante",
    "ifrn são paulo do potengi",
    "ifrn canguaretama notas",
    "ifrn zona norte natal",
    "ifrn zona leste natal",
    "ifrn cidade alta natal",
    "ifrn central natal",
    "calculadora ifrn rio grande do norte",
    "média ifrn rn",
    "notas instituto federal rn",
    "calculadora ifrn natal rn",
    "ifrn campus natal",
    "ifrn campus mossoró",
    "ifrn campus caicó",
    "ifrn campus apodi",
    "calculadora média ifrn rn",
    "sistema suap ifrn rn",
    "notas finais ifrn rio grande do norte",
    "aprovação ifrn natal",
    "média para passar ifrn rn",
    "calculadora de aprovação ifrn",
    "ifrn suap notas rn",
    "calcular média escolar ifrn",
    "notas instituto federal rio grande do norte",
    "calculadora ifrn natal rn",
    "média ponderada escolar ifrn",
    "ifrn calculadora online rn",
    "calcular notas finais ifrn",
    "sistema de notas instituto federal rn",
    "calculadora de médias ifrn rn",
    "ifrn aprovação notas rn",
    "calcular média para aprovação ifrn",
    "notas suap ifrn calculadora rn",
    "ifrn média final rn",
    "calculadora escolar online ifrn",
    "média instituto federal rn",
    "calcular notas ifrn online rn",
  ],
  authors: [
    {
      name: "Ruan Gustavo",
      url: "https://www.linkedin.com/in/ruan-gustavo",
    },
  ],
  creator: "Ruan Gustavo",
  publisher: "Ruan Gustavo",
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Calculadora de médias para estudantes do IFRN`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@ruangustavoo",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-icon-180x180.png",
  },
  category: "education",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="IFRN Calc" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body
        className={cn(
          dmSans.className,
          "flex min-h-dvh flex-col bg-muted/40 antialiased",
        )}
      >
        <Providers>{children}</Providers>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
