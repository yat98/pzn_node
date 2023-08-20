import contactService from "../services/contact-service";

const create = async (req,res,next) => {
  try {
    const user = req.user;
    const result = await contactService.create(user, req.body);
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
    const result = await contactService.get(user, req.params.contactId);
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
}