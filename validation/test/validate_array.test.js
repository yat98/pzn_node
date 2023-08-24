import Joi from 'joi';

describe('Joi', () => {
  it('should can validate array', () => {
    const hobbiesSchema = Joi.array().items(
      Joi.string().required().min(3).max(100)
    ).min(1).unique();
    const hobbies = ['A','Reading','Gaming','A'];
    const result = hobbiesSchema.validate(hobbies,{
      abortEarly: false
    });
    console.info(result);
  });

  it('should can validate nested object', () => {
    const addressSchema = Joi.array().min(1).items(Joi.object({
        street: Joi.string().required().max(100),
        city: Joi.string().required().max(100),
        country: Joi.string().required().max(100),
        zipCode: Joi.string().required().max(10),
      }));

    const request = [
      {
        street: 'Belum ada',
      }
    ];

    // success
    // const request = [
    //   {
    //     street: 'Belum ada',
    //     city: 'Belum ada',
    //     country: 'Belum ada',
    //     zipCode: '300',
    //   }
    // ];

    const result = addressSchema.validate(request,{
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