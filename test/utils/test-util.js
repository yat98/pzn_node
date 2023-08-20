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
  removeTestContact,
  getTestContact,
}