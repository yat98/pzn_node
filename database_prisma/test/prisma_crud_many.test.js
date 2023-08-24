const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be able to create many', async() => {
    const {count} = await prismaClient.customer.createMany({
      data: [
        {
          id: 'eko',
          name: 'Eko',
          email: 'eko@mail.com',
          phone: '085555555'
        },
        {
          id: 'andi',
          name: 'Andi',
          email: 'andi@mail.com',
          phone: '086666666'
        },
      ]
    });
    expect(count).toBe(2);
  });
  it('should be able to update many', async() => {
    const {count} = await prismaClient.customer.updateMany({
      data: {
        name: 'Eko edited',
      },
      where: {
        name: 'Eko'
      }
    });
    expect(count).toBe(1);
  });
  it('should be able to delete many', async() => {
    const {count} = await prismaClient.customer.deleteMany({
      where: {
        name: 'Tidak ada'
      }
    });
    expect(count).toBe(0);
  });
  it('should be able to read many', async() => {
    const data = await prismaClient.customer.findMany({});
    expect(data.length).toBe(2);
  });
});