import { type NextFunction, type Request, type Response } from 'express';
import { HttpStatuses } from '../../constants/httpStatusCode.constants';

export const ADMIN_LOGIN = 'admin';
export const ADMIN_PASS = 'qwerty';
export const ADMIN_TOKEN = Buffer.from(`${ADMIN_LOGIN}:${ADMIN_PASS}`).toString('base64');

export const baseAuthGuard = (req: Request, res: Response, next: NextFunction): void => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader !== ADMIN_TOKEN) {
    res.sendStatus(HttpStatuses.Unauthorized401);
    return;
  }

  next();
};
