import contactService from "../services/contact-service.js";

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

const update = async (req,res,next) => {
  try {
    const user = req.user;
    const request = req.body;
    request.id = req.params.contactId;

    const result = await contactService.update(user, request);
    res.status(200).json({
      data: result
    }).end();
  } catch (e) {
    next(e);
  }
}

const remove = async (req,res,next) => {
  try {
    const user = req.user;

    await contactService.remove(user, req.params.contactId);
    res.status(200).json({
      data: 'OK'
    }).end();
  } catch (e) {
    next(e);
  }
}

const search = async (req,res,next) => {
  try {
    const user = req.user;
    const request = {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      page: req.query.page,
      size: req.query.size,
    }
    console.info(request);
    const result = await contactService.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging
    }).end();
  } catch (e) {
    next(e);
  }
}

export default {
  create,
  get,
  update,
  remove,
  search,
}