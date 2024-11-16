import { type Request, type Response } from 'express';
import { getUsersQueries } from '../helpers';
import { type UsersDto } from '../../../input-output-types/users-types';
import { usersService } from '../service/usersService';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

export const getUsersController = async (req: Request, res: Response<UsersDto>) => {
  const filters = getUsersQueries(req);
  const allUsers = await usersService.getAll(filters);
  res.status(HttpStatuses.Ok200).json(allUsers);
};
