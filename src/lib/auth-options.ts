import { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { Api } from "./axios"

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },

      async authorize(credentials, req) {
        const { data: apiData } = await Api().post('/auth', {
          email: credentials?.email,
          password: credentials?.password,
        })

        const { data } = apiData

        console.log(data)

        return data || null
      },
    }),
  ],
  pages: {
    newUser: '/auth',
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token }) {
      session = token as any

      return session
    },
  },
}