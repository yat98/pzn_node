const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be able to query sql', async() => {
    const id = '1';

    const samples = await prismaClient.$queryRaw`SELECT * FROM sample where id = ${id}`;
    for(const sample of samples){
      console.info(`Result sample id: ${sample.id} and name: ${sample.name}`);
      expect(sample.id).toBe('1');
    }
  });
})