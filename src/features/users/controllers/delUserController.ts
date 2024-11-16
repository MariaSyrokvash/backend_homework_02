import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { usersService } from '../service/usersService';

export const delUserController = async (req: Request<{ id: string }>, res: Response) => {
  const userId = req.params.id;
  const isDeleted = await usersService.deleteUserById(userId);
  isDeleted ? res.sendStatus(HttpStatuses.NoContent204) : res.sendStatus(HttpStatuses.NotFound404);
};
