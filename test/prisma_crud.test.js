const { prismaClient } = require("../src/prisma_client");

describe('Prisma client', () => {
  it('should be able to create customer', async() => {
    const customer = await prismaClient.customer.create({
      data: {
        id: '1',
        name: 'Hidayat',
        email: 'hidayatchandra08@gmail.com',
        phone: '0811111111'
      }
    });

    expect(customer.id).toBe('1');
    expect(customer.name).toBe('Hidayat');
    expect(customer.email).toBe('hidayatchandra08@gmail.com');
    expect(customer.phone).toBe('0811111111');
  });
  it('should be able to update customer', async() => {
    const customer = await prismaClient.customer.update({
      data: {
        name: 'Chandra',
      },
      where: {
        id: '1'
      }
    });

    expect(customer.id).toBe('1');
    expect(customer.name).toBe('Chandra');
    expect(customer.email).toBe('hidayatchandra08@gmail.com');
    expect(customer.phone).toBe('0811111111');
  });
  it('should be able to read customer', async() => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: '1'
      }
    });

    expect(customer.id).toBe('1');
    expect(customer.name).toBe('Chandra');
    expect(customer.email).toBe('hidayatchandra08@gmail.com');
    expect(customer.phone).toBe('0811111111');
  });
  it('should be able to read customer', async() => {
    const customer = await prismaClient.customer.delete({
      where: {
        id: '1'
      }
    });

    expect(customer.id).toBe('1');
    expect(customer.name).toBe('Chandra');
    expect(customer.email).toBe('hidayatchandra08@gmail.com');
    expect(customer.phone).toBe('0811111111');
  });
});