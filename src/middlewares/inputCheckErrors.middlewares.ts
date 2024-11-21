import { type Response, type Request, type NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { HttpStatuses } from '../constants/httpStatusCode.constants';

import { type FieldNamesType, type OutputErrorsType } from '../types/common.types';

export const inputCheckErrors = (req: Request, res: Response<OutputErrorsType>, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationErrors = errors.array({ onlyFirstError: true }) as Array<{
      path: FieldNamesType;
      msg: string;
    }>;

    if (process.env.NODE_ENV !== 'production') {
      console.log('Validation Errors:', validationErrors);
    }

    res.status(HttpStatuses.BadRequest400).json({
      errorsMessages: validationErrors.map(({ path, msg }) => ({
        field: path,
        message: msg,
      })),
    });
    return;
  }

  next();
};
