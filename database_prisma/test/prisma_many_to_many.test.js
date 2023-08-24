const { prismaClient } = require("../src/prisma_client");

describe('Prisma client',() => {
  it('should can insert many to many', async() => {
    const like = await prismaClient.like.create({
      data: {
        customer_id: '1',
        product_id: 'P0001'
      },
      include: {
        customer:true,
        product:true,
      }
    });

    console.info(like);
  });
  it('should can find one with many to many relation', async() => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: '1'
      },
      include: {
        likes: {
          include: {
            product: true,
          }
        }
      }
    });

    console.info(JSON.stringify(customer));
  });
  it('should can find many with many to many relation', async() => {
    const customer = await prismaClient.customer.findMany({
      where: {
        likes: {
          some: {
            product: {
              name: {
                contains: 'A'
              }
            }
          }
        }
      },
      include: {
        likes: {
          include: {
            product: true,
          }
        }
      }
    });

    console.info(JSON.stringify(customer));
  });
  it('should can insert many to many relation with implicit', async() => {
    const customer = await prismaClient.customer.update({
      where: {
        id: 'hidayat'
      },
      data: {
        loves: {
          connect: [
            {id: 'P0001'},
            {id: 'P0002'},
          ]
        }
      },
      include: {
        loves: true
      }
    });

    console.info(customer);
  });
  it('should can find many using many to many relation with implicit', async() => {
    const customer = await prismaClient.customer.findMany({
      where: {
        loves: {
          some: {
            name: {
              contains: 'A'
            }
          }
        }
      },
      include: {
        loves: {
          where: {
            name: {
              contains: 'A'
            }
          }
        }
      }
    });

    console.info(JSON.stringify(customer));
  });
})