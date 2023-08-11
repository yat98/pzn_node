const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be able to create one to one', async() => {
    const wallet = await prismaClient.wallet.create({
      data: {
        id: 'Hidayat',
        customer_id: '1',
        balance: 1000000
      },
      include:{
        customer: true
      }
    });
    console.info(wallet);
  });
  it('should be able to create one to one with relation', async() => {
    const customer = await prismaClient.customer.create({
      data: {
        id: 'josh',
        name: 'Josh',
        email: 'josh@mail.com',
        phone: '08888888',
        wallet: {
          create: {
            id: 'josh',
            balance: 2000000
          }
        }
      },
      include:{
        wallet: true
      }
    });

    console.info(customer);
  });
  it('should be able to find one to one with relation', async() => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: 'josh'
      },
      include:{
        wallet: true
      }
    });

    console.info(customer);
  });
  it('should be able to find one to one with relation filter', async() => {
    const customer = await prismaClient.customer.findMany({
      where: {
        wallet: {
          isNot: null
        }
      },
      include:{
        wallet: true
      }
    });

    console.info(customer);
  });
});