import { prismaClient } from "../applications/database.js"
import { ResponseError } from "../errors/response-error.js";
import { createAddressValidation } from "../validations/address-validation.js";
import { getContactValidation } from "../validations/contact-validation.js"
import { validate } from "../validations/validation.js"

const create = async (user, contactId, req) => {
  contactId = validate(getContactValidation, contactId);
  const address = validate(createAddressValidation, req);

  const countContact = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    }
  });

  if(!countContact) {
    throw new ResponseError(404,'Contact not found');
  }

  address.contact_id = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    }
  })
}

export default {
  create,
}