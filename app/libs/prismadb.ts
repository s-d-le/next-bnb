import { PrismaClient } from "@prisma/client";

// Make Prisma available globally
declare global {
  var prisma: PrismaClient | undefined;
}

// Nextjs hot reload can create multiple clients. This prevents multiple instances of Prisma Client in development
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
