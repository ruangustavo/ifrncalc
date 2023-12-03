import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
    updateAge: 0,
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.token = token.accessToken;
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  providers: [
    {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      id: "suap",
      name: "SUAP",
      type: "oauth",
      authorization: {
        url: "https://suap.ifrn.edu.br/o/authorize",
        params: { scope: "email identificacao" },
      },
      token: "https://suap.ifrn.edu.br/o/token/",
      userinfo: "https://suap.ifrn.edu.br/api/eu/",
      profile(profile) {
        return {
          id: profile.identificacao,
          email: profile.email,
        }
      },
    },
  ],
};