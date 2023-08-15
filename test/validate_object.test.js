import Joi from 'joi';

describe('Joi', () => {
  it('should can validate object', () => {
    const loginSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().required().min(6).max(100),
    });

    const request = {
      username: 'yat@mail.com',
      password: 'rahasia'
    };

    const result = loginSchema.validate(request,{
      abortEarly: false
    });

    console.info(result);
  });

  it('should can validate nested object', () => {
    const createUserSchema = Joi.object({
      id: Joi.string().required().max(100),
      name: Joi.string().required().max(100),
      address: Joi.object({
        street: Joi.string().required().max(100),
        city: Joi.string().required().max(100),
        country: Joi.string().required().max(100),
        zipCode: Joi.string().required().max(10),
      }).required(),
    });

    const request = {
      id: 'yat@mail.com',
      name: 'rahasia',
      address: {

      }
    };

    const result = createUserSchema.validate(request,{
      abortEarly: false
    });

    console.info(result);

    if(result.error){
      for(const error of result.error.details){
        console.info(`${error.path} : ${error.message}`);
      }
    }
  });
});