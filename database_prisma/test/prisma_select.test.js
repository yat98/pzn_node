const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be able create and select', async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: 'budi',
        name: 'Budi',
        email: 'budi@mail.com',
        phone: '0877777777777'
      },
      select: {
        id:true,
        name: true,
      }
    });

    expect(customer.id).toBe('budi');
    expect(customer.name).toBe('Budi');
    expect(customer.email).toBeUndefined();
    expect(customer.phone).toBeUndefined();
  });

  it('should be able findMany with select', async () => {
    const customers = await prismaClient.customer.findMany({
      select: {
        id: true,
        name: true
      }
    });

    for(const customer of customers){
      expect(customer.id).toBeDefined();
      expect(customer.name).toBeDefined();
      expect(customer.email).toBeUndefined();
      expect(customer.phone).toBeUndefined();
    }
  });
});