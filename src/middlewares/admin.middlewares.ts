import { type Response, type Request, type NextFunction } from 'express';
import { HttpStatuses } from '../constants/httpStatusCode.constants';
import { CONFIG } from '../config';

export const fromBase64ToUTF8 = (code: string) => {
  const buff = Buffer.from(code, 'base64');
  const decodedAuth = buff.toString('utf8');
  return decodedAuth;
};
export const fromUTF8ToBase64 = (code: string) => {
  const buff2 = Buffer.from(code, 'utf8');
  const codedAuth = buff2.toString('base64');
  return codedAuth;
};

export const adminAuthGuard = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization!;

  if (!auth) {
    res.status(HttpStatuses.Unauthorized401).json({});
    return;
  }
  if (auth.slice(0, 6) !== 'Basic ') {
    res.status(HttpStatuses.Unauthorized401).json({});
    return;
  }

  const codedAuth = fromUTF8ToBase64(CONFIG.ADMIN);

  if (auth.slice(6) !== codedAuth) {
    res.status(HttpStatuses.Unauthorized401).json({});
    return;
  }

  next();
};
