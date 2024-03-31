import { Nunito } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: `${siteConfig.name} | %s`,
    default: `${siteConfig.name} - ${siteConfig.description}`,
  },
  description: siteConfig.description,
  keywords: ['IFRN', 'Calculadora', 'Notas', 'Cálculo', 'Médias', 'SUAP'],
  authors: [
    {
      name: 'Ruan Gustavo',
      url: 'https://www.linkedin.com/in/ruan-gustavo',
    },
  ],
  verification: {
    google: 'HUrkawyDWIzcybFim8wRjb4XEt8LKZT5fxBzGhJihpw',
  },
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
          'flex flex-col antialiased bg-muted/40',
        )}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
