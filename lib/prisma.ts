import { PrismaClient } from "@prisma/client";

/**
 * Sets a new prisma client as the global object.
 * Done to maintain a singleton pattern so that the database is not exhausted
 * by multiple prisma connections.
 */
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
