import bcrypt from 'bcrypt';
import { prismaClient } from '../applications/database.js';
import { validate } from '../validations/validation.js';
import { ResponseError } from '../errors/response-error.js';
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from '../validations/user-validation.js';
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

const get = async (username) => {
  username = validate(getUserValidation,username);
  return prismaClient.user.findUnique({
    where: {
      username: username
    },
    select: {
      username: true,
      name: true,
    }
  });
}

const update = async (req) => {
  const updateRequest = validate(updateUserValidation,req);
  const data = {};
  const countUser = await prismaClient.user.count({
    where: {
      username: req.username,
    }
  });

  if(countUser < 1){
    throw new ResponseError(404, 'User not found');
  }

  if(updateRequest.password){
    data.password = await bcrypt.hash(updateRequest.password, 10);
  }
  
  if(updateRequest.name){
    data.name = updateRequest.name;
  }

  return prismaClient.user.update({
    data: data,
    where: {
      username: updateRequest.username
    },
    select: {
      username: true,
      name: true,
    }
  });
}

const logout = async (username) => {
  username = validate(getUserValidation, username);
  return await prismaClient.user.update({
    where: {
      username: username
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    }
  });
}

export default {
  register,
  login,
  get,
  update,
  logout,
}