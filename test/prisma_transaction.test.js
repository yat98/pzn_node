const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should can execute sequential transaction', async() => {
    const [john, james] = await prismaClient.$transaction([
      prismaClient.customer.create({
        data: {
          id: 'john',
          name: 'John',
          email: 'john@mail.com',
          phone: '08111111'
        }
      }),
      prismaClient.customer.create({
        data: {
          id: 'james',
          name: 'James',
          email: 'james@mail.com',
          phone: '08222222'
        }
      }),
    ], {
      timeout: 5,
    });

    expect(john.name).toBe('John');
    expect(james.name).toBe('James');
  });
  it('should can execute interactive transaction', async() => {
    const [sandy, olla] = await prismaClient.$transaction(async(prisma) => {
      const sandy = await prisma.customer.create({
        data: {
          id: 'sandy',
          name: 'Sandy',
          email: 'sandy@mail.com',
          phone: '08333333'
        }
      });
      const olla = await prisma.customer.create({
        data: {
          id: 'olla',
          name: 'Olla',
          email: 'olla@mail.com',
          phone: '08444444'
        }
      });
      return [sandy, olla];
    });
    expect(sandy.name).toBe('Sandy');
    expect(olla.name).toBe('Olla');
  });
});