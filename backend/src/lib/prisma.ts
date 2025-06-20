import { PrismaClient } from "@prisma/client";

// グローバル変数で再利用
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// すでにprismaが存在すればそれを使い、なければ新しく作る
const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 