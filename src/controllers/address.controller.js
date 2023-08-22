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

export default {
  create,
}