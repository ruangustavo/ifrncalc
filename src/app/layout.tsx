import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

const inter = Inter({ subsets: ['latin'] })

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
    google:
      'google-site-verification=nw6ORfHvFq5R12GVz2HbqTcs7sIZDFkW0_zhquDExR4',
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
    <>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${inter.className} flex flex-col antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  )
}
