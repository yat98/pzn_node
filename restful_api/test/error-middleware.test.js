import { getMockReq, getMockRes } from '@jest-mock/express';
import { errorMiddleware } from "../src/middleware/error-middleware.js";
import { ResponseError } from '../src/errors/response-error.js';

describe('errorMiddleware', () => { 
  it('should return error 500', () => {
    const req = getMockReq();
    const { res, next, clearMockRes } = getMockRes();
    errorMiddleware(new Error('Ups'),req,res,next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: 'Ups',
      }),
    );
    expect(next).not.toBeCalled();
    clearMockRes();
  });

  it('should return error from ResponseError', () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    errorMiddleware(new ResponseError(400,'Ups'),req,res,next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: 'Ups',
      }),
    );
    expect(next).not.toBeCalled();
    clearMockRes();
  });

  it('should call next function', () => {
    const { res, next, clearMockRes } = getMockRes();
    const req = getMockReq();
    errorMiddleware(undefined,req,res,next);

    expect(next).toBeCalled();
    clearMockRes();
  });
})