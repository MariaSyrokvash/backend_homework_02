import { type Request, type Response } from 'express';
import { getUsersQueries } from '../helpers';

import { usersService } from '../service/usersService';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type UsersDto } from '../../../types/users.types';

export const getUsersController = async (req: Request, res: Response<UsersDto>) => {
  const filters = getUsersQueries(req);

  const allUsers = await usersService.getAll(filters);
  res.status(HttpStatuses.Ok200).json(allUsers);
};
