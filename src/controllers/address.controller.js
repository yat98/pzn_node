const { default: addressService } = require("../services/address-service");

const create = async (req,res,next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const result = await addressService.create(user, contactId, req.body);
    res.status(200).json({
      data: result
    }).end();
  } catch (e) {
    next(e);
  }
}

const get = async (req,res,next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;
    const result = await addressService.get(user, contactId, addressId);
    res.status(200).json({
      data: result
    }).end();
  } catch (e) {
    next(e);
  }
}

const update = async (req,res,next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = req.params.addressId;

    const result = await addressService.update(user, contactId, request);
    res.status(200).json({
      data: result
    }).end();
  } catch (e) {
    next(e);
  }
}

export default {
  create,
  get,
  update,
}