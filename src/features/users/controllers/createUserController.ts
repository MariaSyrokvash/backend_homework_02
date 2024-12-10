import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type UserInputModel, type UserViewModel } from '../../../types/users.types';
import { usersQueryRepository } from '../users.query.repository';
import { usersService } from '../users.service';

export const createUserController = async (req: Request<any, any, UserInputModel>, res: Response<UserViewModel>) => {
  const userId = await usersService.createUser(req.body);
  if (!userId) {
    res.sendStatus(HttpStatuses.Forbidden403);
    return;
  }
  const newUser = await usersQueryRepository.getUserById(userId);
  if (!newUser) {
    res.sendStatus(HttpStatuses.ServiceUnavailable503);
    return;
  }
  res.status(HttpStatuses.Created201).json(newUser);
};
