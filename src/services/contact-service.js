import { prismaClient } from "../applications/database.js";
import { createContactValidation } from "../validations/contact-validation.js";
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

export default{
  create,
}