import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import {
  FieldNamesType,
  OutputErrorsType,
} from "../input-output-types/output-errors-type";
import { HttpStatuses } from "../constants/httpStatusCode.constants";

export const inputCheckErrorsMiddleware = (
  req: Request,
  res: Response<OutputErrorsType>,
  next: NextFunction,
) => {
  const e = validationResult(req);
  if (!e.isEmpty()) {
    const eArray = e.array({ onlyFirstError: true }) as {
      path: FieldNamesType;
      msg: string;
    }[];
    console.log(eArray);

    res.status(HttpStatuses.BadRequest400).json({
      errorsMessages: eArray.map((x) => ({ field: x.path, message: x.msg })),
    });
    return;
  }

  next();
};
