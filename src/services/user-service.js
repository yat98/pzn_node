import bcrypt from 'bcrypt';
import { prismaClient } from '../applications/database.js';
import { validate } from '../validations/validation.js';
import { ResponseError } from '../errors/response-error.js';
import { loginUserValidation, registerUserValidation } from '../validations/user-validation.js';
import { v4 as uuid } from 'uuid';

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

const login = async (req) => {
  const loginRequest = validate(loginUserValidation,req);
  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    }
  });
  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

  if(!user || !isPasswordValid){
    throw new ResponseError(401, 'Username or password wrong');
  }

  const token = uuid().toString();
  return await prismaClient.user.update({
    where: {
      username: user.username
    },
    data: {
      token: token,
    },
    select: {
      token: true
    }
  });
}

export default {
  register,
  login,
}