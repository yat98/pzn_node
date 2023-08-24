const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be able to create with auto increment primary key', async() => {
    const category = await prismaClient.category.create({
      data: {
        name: 'Food'
      }
    });

    expect(category.name).toBe('Food');
  });
});