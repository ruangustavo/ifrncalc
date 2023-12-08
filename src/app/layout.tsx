import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IFRN Calc",
  description:
    "O IFRN Calc é uma ferramenta que permite calcular a média do IFRN de forma simples e rápida.",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${inter.className} flex flex-col antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  );
}
