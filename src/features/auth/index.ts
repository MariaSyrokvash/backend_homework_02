import { Router } from 'express';
import { loginOrEmailValidation, passwordValidation } from './middlewares/authValidators';
import { loginController } from './controllers/loginController';
import { inputCheckErrors } from '../../middlewares/inputCheckErrors.middlewares';

export const authRouter = Router();

authRouter.post(
  '/',
  passwordValidation,
  loginOrEmailValidation,
  inputCheckErrors,

  loginController,
);
