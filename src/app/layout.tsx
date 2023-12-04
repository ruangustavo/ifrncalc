"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="pt-BR">
        <body className={`${inter.className} h-screen flex flex-col`}>
          <SessionProvider>{children}</SessionProvider>
        </body>
      </html>
    </>
  );
}
