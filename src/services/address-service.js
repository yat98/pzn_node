import { prismaClient } from "../applications/database.js"
import { ResponseError } from "../errors/response-error.js";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validations/address-validation.js";
import { getContactValidation } from "../validations/contact-validation.js"
import { validate } from "../validations/validation.js"

const checkContact = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  
  const countContact = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    }
  });

  if(!countContact) {
    throw new ResponseError(404,'Contact not found');
  }

  return contactId;
}

const create = async (user, contactId, req) => {
  contactId = await checkContact(user, contactId);
  const address = validate(createAddressValidation, req);
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

const get = async (user, contactId, addressId) => {
  contactId = await checkContact(user, contactId);
  addressId = validate(getAddressValidation, addressId);
  const address = await prismaClient.address.findUnique({
    where: {
      contact: {
        username: user.username,
      },
      contact_id: contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    }
  });

  if(!address) {
    throw new ResponseError(404, 'Address not found');
  }

  return address;
}

const update = async (user, contactId, req) => {
  contactId = validate(getContactValidation, contactId);
  contactId = await checkContact(user, contactId);

  const updateRequest = validate(updateAddressValidation, req); 
  const countAddress = await prismaClient.address.count({
    where: {
      contact: {
        username: user.username,
      },
      contact_id: contactId,
      id: updateRequest.id,
    },
  });

  if(countAddress < 1) {
    throw new ResponseError(404, 'Address not found');
  }

  return prismaClient.address.update({
    where: {
      contact: {
        username: user.username,
      },
      contact_id: contactId,
      id: updateRequest.id
    },
    data: updateRequest,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    }
  });
}

const remove = async (user, contactId, addressId) => {
  contactId = await checkContact(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const countAddress = await prismaClient.address.count({
    where: {
      contact: {
        username: user.username,
      },
      contact_id: contactId,
      id: addressId,
    },
  });

  if(countAddress < 1) {
    throw new ResponseError(404, 'Address not found');
  }

  return prismaClient.address.delete({
    where: {
      contact: {
        username: user.username,
      },
      contact_id: contactId,
      id: addressId,
    },
  })
}

export default {
  create,
  get,
  update,
  remove,
}