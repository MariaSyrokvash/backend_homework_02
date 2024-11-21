import { type Response, type Request, type NextFunction } from 'express';
import { HttpStatuses } from '../constants/httpStatusCode.constants';
import { CONFIG } from '../config';

export const fromBase64ToUTF8 = (base64String: string): string => {
  return Buffer.from(base64String, 'base64').toString('utf8');
};

export const fromUTF8ToBase64 = (utf8String: string): string => {
  return Buffer.from(utf8String, 'utf8').toString('base64');
};

export const adminAuthGuard = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(HttpStatuses.Unauthorized401).json({ error: 'Authorization header missing' });
    return;
  }

  if (!authHeader.startsWith('Basic ')) {
    res.status(HttpStatuses.Unauthorized401).json({ error: 'Invalid authorization format' });
    return;
  }

  const providedCredentials = authHeader.slice(6); // Remove "Basic " prefix.
  const expectedCredentials = fromUTF8ToBase64(CONFIG.ADMIN);

  if (providedCredentials !== expectedCredentials) {
    res.status(HttpStatuses.Unauthorized401).json({ error: 'Invalid credentials' });
    return;
  }

  next();
};
