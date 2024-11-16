import { Router } from 'express';
import { loginOrEmailValidation, passwordValidation } from './middlewares/authValidators';
import { inputCheckErrorsMiddleware } from '../../global-middlewares/inputCheckErrorsMiddleware';
import { loginController } from './controllers/loginController';

export const authRouter = Router();

authRouter.post(
  '/',
  passwordValidation,
  loginOrEmailValidation,
  inputCheckErrorsMiddleware,

  loginController,
);
