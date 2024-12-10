import { type Request, type Response } from 'express';
import { normalizeUsersQueries } from '../helpers';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type UsersViewModel } from '../../../types/users.types';
import { usersQueryRepository } from '../users.query.repository';

export const getUsersController = async (req: Request, res: Response<UsersViewModel>) => {
  const filters = normalizeUsersQueries(req);
  const allUsers = await usersQueryRepository.getAllUsers(filters);
  res.status(HttpStatuses.Ok200).json(allUsers);
};
