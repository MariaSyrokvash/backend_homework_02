import type { Request, Response } from 'express';

import { authService } from '../service/authService';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type LoginInputModel } from '../../../types/auth.types';

export const loginController = async (req: Request<any, any, LoginInputModel>, res: Response): Promise<void> => {
  const { loginOrEmail, password } = req.body;

  const accessToken = await authService.loginUser(loginOrEmail, password);

  if (!accessToken) {
    res.sendStatus(HttpStatuses.Unauthorized401);
    return;
  }

  res.sendStatus(HttpStatuses.NoContent204);
};
