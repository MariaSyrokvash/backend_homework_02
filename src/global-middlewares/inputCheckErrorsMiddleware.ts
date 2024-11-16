import { type Response, type Request, type NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HttpStatuses } from '../constants/httpStatusCode.constants';
import { type FieldNamesType, type OutputErrorsType } from '../input-output-types/output-errors-type';

export const inputCheckErrorsMiddleware = (req: Request, res: Response<OutputErrorsType>, next: NextFunction) => {
  const e = validationResult(req);
  if (!e.isEmpty()) {
    const eArray = e.array({ onlyFirstError: true }) as Array<{
      path: FieldNamesType;
      msg: string;
    }>;
    console.log(eArray);

    res.status(HttpStatuses.BadRequest400).json({
      errorsMessages: eArray.map((x) => ({ field: x.path, message: x.msg })),
    });
    return;
  }

  next();
};
