import { Nunito } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Providers } from './providers'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: `${siteConfig.name} | %s`,
    default: `${siteConfig.name} - ${siteConfig.description}`,
  },
  description: siteConfig.description,
  keywords: [
    'ifrn',
    'notas',
    'cálculo',
    'médias',
    'suap',
    'ifcalc',
    'ifrncalc',
    'ifrn calc',
    'calculadora de notas',
    'cálculo de notas ifrn',
    'aprovação no ifrn',
    'notas suap',
    'calcular médias suap',
    'médias para aprovação ifrn',
    'desempenho acadêmico ifrn',
    'calculadora ifrn',
    'sistema de notas ifrn',
    'cálculo de médias online',
    'médias suap ifrn',
    'notas finais ifrn',
    'calculadora de médias para ifrn',
  ],
  authors: [
    {
      name: 'Ruan Gustavo',
      url: 'https://www.linkedin.com/in/ruan-gustavo',
    },
  ],
  creator: 'Ruan Gustavo',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          nunito.className,
          'flex flex-col antialiased bg-muted/40 min-h-dvh'
        )}
      >
        <Providers>{children}</Providers>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
