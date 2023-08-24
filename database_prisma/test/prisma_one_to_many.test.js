const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be create data many to one', async() => {
    const comment = await prismaClient.comment.create({
      data: {
        customer_id: 'josh',
        title: 'Comment 4',
        description: 'Sample Comment 4',
      },
      include: {
        customer: true
      }
    });

    console.info(comment);
  });
  it('should be create data one to many', async() => {
    const customer = await prismaClient.customer.create({
      data: {
        id: 'alex',
        name: 'Alex',
        email: 'alex@mail.com',
        phone: '0899999999',
        comments: {
          createMany: {
            data: [
              {title: 'Comment 1', description: 'Sample Comment 1'},
              {title: 'Comment 2', description: 'Sample Comment 2'},
              {title: 'Comment 3', description: 'Sample Comment 3'},
            ]
          }
        }
      },
      include: {
        comments: true
      }
    });

    console.info(customer);
  });
  it('should be findMany', async() => {
    const customer = await prismaClient.customer.findMany({
      include: {
        comments: {
          where: {
            title: 'Comment 1'
          }
        }
      },
      where: {
        comments: {
          some: {
            title: 'Comment 1'
          }
        }
      },
    });

    console.info(JSON.stringify(customer));
  });
})