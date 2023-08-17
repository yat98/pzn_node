import bcrypt from 'bcrypt';
import { prismaClient } from '../applications/database.js';
import { validate } from '../validations/validation.js';
import { ResponseError } from '../errors/response-error.js';
import { registerUserValidation } from '../validations/user-validation.js';

const register = async (req) => {
  const user = validate(registerUserValidation, req);
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if(countUser > 0){
    throw new ResponseError(422, 'User already exists');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    }
  });
}

export default {
  register,
}