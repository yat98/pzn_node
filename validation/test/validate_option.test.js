import Joi from 'joi';

describe('Joi', () => {
  it('should return validation error', () => {
    const usernameSchema = Joi.string().min(5).email().required();    

    const result = usernameSchema.validate('ups', {
      abortEarly: false
    });
    console.info(result.value);
    
    if(result.error){
      console.info(result.error.details);
      result.error.details.forEach(detail => {
        console.info(`${detail.path} = ${detail.message}`);
      })
    }
  });
});