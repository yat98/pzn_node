const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should can count', async () => {
    const count = await prismaClient.customer.count({
      where: {
        name: 'Hidayat'
      }
    });

    expect(count).toBe(1);
  });
});