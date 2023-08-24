import Joi from 'joi';

describe('Joi', () => {
  it('should can create schema', () => {
    const schema = Joi.string().min(3).max(100).required();
    const request = 'eka';
    const result = schema.validate(request);
    if(result.error){
      console.info(result.error);
    }
  });
  it('should  can validate basic data', () => {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().required().min(1000).max(1000000);

    const resultUsername = usernameSchema.validate('eko@gmail.com');
    console.info(resultUsername);

    const resultIsAdmin = isAdminSchema.validate('salah');
    console.info(resultIsAdmin);

    const resultPrice = priceSchema.validate('salah');
    console.info(resultPrice);
  });
});