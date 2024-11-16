import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type UserInputModel, type UserViewModel } from '../../../input-output-types/users-types';
import { usersService } from '../service/usersService';
import { usersRepository } from '../repositories/usersRepository';

export const createUserController = async (req: Request<any, any, UserInputModel>, res: Response<UserViewModel>) => {
  const userId = await usersService.createUser(req.body);
  const newUser = await usersRepository.findById(userId);

  if (newUser) res.status(HttpStatuses.Created201).json(newUser);
};
