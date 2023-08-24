const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be able to execute', async () => {
    const id = '1';
    const name = 'Hidayat';

    const impacted = await prismaClient.$executeRaw`INSERT INTO sample(id,name) VALUES (${id},${name})`;
    expect(impacted).toBe(1);
  });
});