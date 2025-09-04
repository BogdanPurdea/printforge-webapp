
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/server/prisma"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? (() => { throw new Error("GITHUB_ID is not defined") })(),
      clientSecret: process.env.GITHUB_SECRET ?? (() => {throw new Error("GITHUB_SECRET is not defined")})(),
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.hashedPassword) {
          return null
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isValidPassword) {
          return null
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  }
}
