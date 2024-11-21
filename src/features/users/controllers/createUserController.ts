import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

import { usersService } from '../service/usersService';
import { usersRepository } from '../repositories/usersRepository';
import { type UserInputModel, type UserViewModel } from '../../../types/users.types';

export const createUserController = async (req: Request<any, any, UserInputModel>, res: Response<UserViewModel>) => {
  const userId = await usersService.createUser(req.body);
  const newUser = await usersRepository.findById(userId);

  if (!newUser) throw new Error('User not created');
  res.status(HttpStatuses.Created201).json(newUser);
};
