import { prismaClient } from "../applications/database.js";
import { ResponseError } from "../errors/response-error.js";
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "../validations/contact-validation.js";
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
      id: updateRequest.id
    }
  });

  if(countContact < 1) {
    throw new ResponseError(404, 'Contact not found');
  }

  return prismaClient.contact.update({
    data: updateRequest,
    where: {
      username: user.username,
      id: updateRequest.id
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

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const countContact = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if(countContact < 1) {
    throw new ResponseError(404, 'Contact not found');
  }

  return prismaClient.contact.delete({
    where: {
      username: user.username,
      id: contactId,
    },
  })
}

const search = async (user, req) => {
  req = validate(searchContactValidation, req);
  const skip =  (req.page - 1) * req.size;
  const filters = [];

  if(req.name){
    filters.push({
      OR: [
        { first_name: { contains: req.name } },
        { last_name: { contains: req.name } },
      ]
    })
  }

  if(req.email){
    filters.push({
      email: { contains: req.email }
    });
  }

  if(req.phone){
    filters.push({
      phone: { contains: req.phone }
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      username: user.username,
      AND: filters
    },
    take: req.size,
    skip: skip,
  });

  const totalItem = await prismaClient.contact.count({
    where: {
      username: user.username,
      AND: filters
    },
  });

  return {
    data: contacts,
    paging: {
      page: req.page,
      total_item: totalItem,
      total_page: Math.ceil(totalItem / req.size),
    }
  }
}

export default{
  create,
  get,
  update,
  remove,
  search,
}