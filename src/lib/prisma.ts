import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (typeof window === 'undefined') {
  // Server-side
  prisma = new PrismaClient()
} else {
  // Client-side - should not happen in our case
  throw new Error('Prisma client should only be used on the server side')
}

export { prisma }
