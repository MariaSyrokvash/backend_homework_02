import type { Request, Response } from 'express';
import { type LoginInputModel } from '../../../input-output-types/auth-types';
import { authService } from '../service/authService';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

export const loginController = async (req: Request<any, any, LoginInputModel>, res: Response): Promise<void> => {
  const { loginOrEmail, password } = req.body;

  const accessToken = await authService.loginUser(loginOrEmail, password);

  if (!accessToken) {
    res.sendStatus(HttpStatuses.Unauthorized401);
    return;
  }

  res.sendStatus(HttpStatuses.NoContent204);
};
