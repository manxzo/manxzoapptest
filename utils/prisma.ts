import { PrismaClient, Prisma } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create Prisma client with error logging
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "info",
      },
      {
        emit: "event",
        level: "warn",
      },
    ],
  });
};

export const prisma = globalForPrisma.prisma || prismaClientSingleton();

// Event listeners for logging with proper type safety
prisma.$on("error" as never, (e: Prisma.LogEvent) => {
  console.error("Prisma Error:", e);
});

prisma.$on("warn" as never, (e: Prisma.LogEvent) => {
  console.warn("Prisma Warning:", e);
});

// Only log queries in development
if (process.env.NODE_ENV === "development") {
  prisma.$on("query" as never, (e: Prisma.QueryEvent) => {
    console.log("Prisma Query:", e);
  });

  prisma.$on("info" as never, (e: Prisma.LogEvent) => {
    console.info("Prisma Info:", e);
  });
}

// Prevent multiple instances during development
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
