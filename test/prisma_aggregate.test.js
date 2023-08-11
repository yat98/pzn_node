const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be able query using aggregate', async () => {
    const result = await prismaClient.product.aggregate({
      _min:{
        price: true,
        stock: true,
      },
      _max: {
        price: true,
        stock: true,
      },
      _avg: {
        price: true,
        stock: true,
      }
    });

    expect(result._min.price).toBe(1000);
    expect(result._max.price).toBe(5000);
    expect(result._avg.price).toBe(3000);

    expect(result._min.stock).toBe(100);
    expect(result._max.stock).toBe(500);
    expect(result._avg.stock).toBe(300);
  });
  it('should be able query using groupBY', async () => {
    const result = await prismaClient.product.groupBy({
      by: ['category'],
      _min:{
        price: true,
        stock: true,
      },
      _max: {
        price: true,
        stock: true,
      },
      _avg: {
        price: true,
        stock: true,
      }
    });

    for(const res of result){
      if(res.category === 'K1'){
        expect(res._min.price).toBe(1000);
        expect(res._max.price).toBe(3000);
        expect(res._avg.price).toBe(2000);

        expect(res._min.stock).toBe(100);
        expect(res._max.stock).toBe(300);
        expect(res._avg.stock).toBe(200);
      }else if(res.category === 'K2'){
        expect(res._min.price).toBe(4000);
        expect(res._max.price).toBe(5000);
        expect(res._avg.price).toBe(4500);

        expect(res._min.stock).toBe(400);
        expect(res._max.stock).toBe(500);
        expect(res._avg.stock).toBe(450);
      }
    }
  });
  it('should be able query using groupBY having', async () => {
    const result = await prismaClient.product.groupBy({
      by: ['category'],
      _min:{
        price: true,
        stock: true,
      },
      _max: {
        price: true,
        stock: true,
      },
      _avg: {
        price: true,
        stock: true,
      },
      having: {
        price: {
          _avg: {
            gt: 3000
          }
        }
      }
    });
    console.info(result);

    for(const res of result){
      expect(res._min.price).toBe(4000);
      expect(res._max.price).toBe(5000);
      expect(res._avg.price).toBe(4500);

      expect(res._min.stock).toBe(400);
      expect(res._max.stock).toBe(500);
      expect(res._avg.stock).toBe(450);
    }
  });
});