import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const prisma = new PrismaClient()
          
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          await prisma.$disconnect()

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // For Google sign-in, we need to find or create the user
      if (account?.provider === "google") {
        try {
          const prisma = new PrismaClient()
          
          // Check if user exists
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })
          
          if (!existingUser) {
            // Create new user
            existingUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name!,
                image: user.image,
                favoriteGenres: "[]",
                gamingPlatforms: "[]",
                favoriteGames: "[]",
                gamesPlayed: "[]",
                wishlist: "[]",
                recommendations: "[]",
              }
            })
          }
          
          await prisma.$disconnect()
          
          // Update the user object with the database ID
          user.id = existingUser.id
          return true
        } catch (error) {
          console.error("Google sign-in error:", error)
          return false
        }
      }
      
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}
