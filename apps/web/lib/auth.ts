import NextAuth, { DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export type ExtendedUser = DefaultSession["user"] & {
  is_phone_verified: boolean
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

import { JWT } from "next-auth/jwt"
import { prisma } from "@repo/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { loginSchema } from "@/schemas/zod"

declare module "next-auth/jwt" {
  interface JWT {
    is_phone_verified: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt"
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        }
      }
    }),
    Credentials({
      credentials: {
        email: { type: "email", label: "Email", placeholder: "johndoe@gmail.com" },
        password: { type: "password", label: "Password", placeholder: "*****" },
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials)
        if (!result.success) {
          console.log("Invalid Credentials")
          return null
        }

        const { email, password } = result.data

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!user || !user.password) {
          console.log("Invalid Credentials")
          return null
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
          console.log("Password Not Match")
          return null
        }

        return user
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log({
      //   jwtToken: token,
      //   jwtUser: user
      // })

      return token
    },
    async session({ session, token }) {
      // console.log({
      //   session: session,
      //   sessionToken: token
      // })

      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub
        }
      })

      session.user.id = token.sub!
      session.user.is_phone_verified = existingUser?.is_phone_verified!

      return session
    }
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date(),
          is_email_verified: true
        }
      })
    }
  },
  secret: process.env.AUTH_SECRET
})