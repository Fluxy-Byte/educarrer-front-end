import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin } from "better-auth/plugins"
import { prisma } from "./../prisma"

const PORT = process.env.PORT ?? "5401"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [
    admin({
      impersonationSessionDuration: 60 * 60 * 24, // 24 hours
    })
  ],
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? `http://localhost:${PORT}`],
  secret: process.env.BETTER_AUTH_SECRET!,
   baseURL: process.env.BETTER_AUTH_URL ?? `http://localhost:${PORT}`,
})
