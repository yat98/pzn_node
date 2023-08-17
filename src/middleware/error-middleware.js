import { ResponseError } from "../errors/response-error.js";

const errorMiddleware = (err,req,res,next) => {
  if(err){
    if(err instanceof ResponseError){
      return res.status(err.status).json({
        errors: err.message,
      }).end();
    }else{
      return res.status(500).json({
        errors: err.message,
      }).end();
    }
  }

  next();
}

export {
  errorMiddleware,
}