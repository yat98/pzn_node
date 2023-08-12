import Joi from 'joi';

describe('Joi', () => {
  it('should can validate and get result', () => {
    const birthDateSchema = Joi.date().required().max('now').min('1-1-1988');

    const result = birthDateSchema.validate('1-1-1987');
    console.info(typeof result.value);
    console.info(typeof result.error);
    console.info(result.value);
    console.info(result.error);

    const result2 = birthDateSchema.validate('1-1-1997');
    console.info(typeof result2.value);
    console.info(typeof result2.error);
    console.info(result2.value);
    console.info(result2.error);
  });
});