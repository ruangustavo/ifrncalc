import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { isSuapMock, MOCK_ACCESS_TOKEN, MOCK_USER } from "@/lib/suap/mock"

interface Profile {
  identificacao: string
  nome_social: string
  nome_usual: string
  nome_registro: string
  nome: string
  primeiro_nome: string
  ultimo_nome: string
  email: string
  email_secundario: string
  email_google_classroom: string
  email_academico: string
  campus: string
  foto: string
  tipo_usuario: string
  email_preferencial: string
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      session.user.campus = token.campus
      session.user.userType = token.userType
      session.accessToken = token.accessToken

      return session
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = isSuapMock()
          ? MOCK_ACCESS_TOKEN
          : account.access_token
        token.campus = user.campus
        token.userType = user.userType
      }

      return token
    },
  },
  providers: isSuapMock()
    ? [
        CredentialsProvider({
          id: "suap",
          name: "SUAP (mock)",
          credentials: {},
          authorize: () => MOCK_USER,
        }),
      ]
    : [
        {
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          id: "suap",
          name: "SUAP",
          type: "oauth",
          authorization: {
            url: `${process.env.SUAP_URL}/o/authorize`,
            params: { scope: "email identificacao" },
          },
          token: `${process.env.SUAP_URL}/o/token/`,
          userinfo: `${process.env.SUAP_URL}/api/rh/eu/`,
          profile(profile: Profile) {
            return {
              id: profile.identificacao,
              name: profile.nome_usual
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
                )
                .join(" "),
              email: profile.email_preferencial,
              image: profile.foto,
              campus: profile.campus,
              userType: profile.tipo_usuario,
            }
          },
        },
      ],
}
