import { prismaClient } from "../../src/applications/database.js";
import bcrypt from 'bcrypt';

const removeTestUser = async() => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test',
    },
  });
}

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: 'test',
      password: await bcrypt.hash('rahasia', 10),
      name: 'Test',
      token: 'test'
    }
  });
}

const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: 'test'
    }
  });
}

const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@mail.com',
      phone: '0822222222',
      username: 'test',
    }
  });
}

const createManyTestContact = async () => {
  const contacts = [];
  for (let i = 0; i < 15; i++) {
    contacts.push({
      first_name: `John ${i}`,
      last_name: `Doe ${i}`,
      email: `johndoe${i}@mail.com`,
      phone: `082222222${i}`,
      username: 'test',
    });
  }
  await prismaClient.contact.createMany({
    data: contacts,
  });
}

const removeTestContact = async() => {
  await prismaClient.contact.deleteMany({
    where: {
      username: 'test',
    },
  });
}

const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: 'test',
    }
  });
}

export {
  createTestUser,
  removeTestUser,
  getTestUser,
  createTestContact,
  createManyTestContact,
  removeTestContact,
  getTestContact,
}