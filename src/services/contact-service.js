import { prismaClient } from "../applications/database.js";
import { ResponseError } from "../errors/response-error.js";
import { createContactValidation, getContactValidation, updateContactValidation } from "../validations/contact-validation.js";
import { validate } from "../validations/validation.js"

const create = async (user, req) => {
  const contact = validate(createContactValidation, req);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    }
  })
}

const get = async (user, contactId) => {
  contactId = validate(getContactValidation,contactId);
  const contact = await prismaClient.contact.findUnique({
    where: {
      id: contactId,
      username: user.username
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    }
  });

  if(!contact) throw new ResponseError(404, 'Contact not found');

  return contact;
}

const update = async (user, req) => {
  const updateRequest = validate(updateContactValidation, req);
  const countContact = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: req.id
    }
  });

  if(countContact < 1) {
    throw new ResponseError(404, 'Contact not found');
  }

  return prismaClient.contact.update({
    data: updateRequest,
    where: {
      username: user.username,
      id: req.id
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    }
  })
}

export default{
  create,
  get,
  update,
}