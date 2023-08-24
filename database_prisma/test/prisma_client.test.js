import { prismaClient } from "../src/prisma_client";

describe('Prisma Client', () => {
  it('should be able to connect', async () => {
    await prismaClient.$connect();

    await prismaClient.$disconnect();
  });
})