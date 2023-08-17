import { ResponseError } from "../errors/response-error.js";

const validate = (schema, req) => {
  const result = schema.validate(req, {
    abortEarly: false,
  });
  if(result.error) throw new ResponseError(422,result.error);
  return result.value;
}

export {
  validate,
}