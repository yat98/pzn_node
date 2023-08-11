const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be able to read many with sorting', async() => {
    const customers = await prismaClient.customer.findMany({
      skip: 0,
      take: 10,
      orderBy: [
        {
          name: 'desc'
        },
        {
          email: 'asc'
        }
      ]
    });

    for(const customer of customers){
      console.info(customer.name,customer.email);
    }
  });
});