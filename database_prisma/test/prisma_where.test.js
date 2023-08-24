const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be able to use where', async () => {
    const result = await prismaClient.product.findMany({
      where: {
        OR: [
          {name: 'A'},
          {name: 'B'},
        ]
      },
      orderBy: {
        name: 'asc'
      }
    });

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('A');
    expect(result[1].name).toBe('B');
  });
});