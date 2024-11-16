import { Router } from 'express';
import { adminMiddleware } from '../../global-middlewares/admin-middleware';
import { getUsersController } from './controllers/getUsersController';
import { emailValidation, loginValidation, passwordValidation } from './middlewares/usersValidators';
import { inputCheckErrorsMiddleware } from '../../global-middlewares/inputCheckErrorsMiddleware';
import { createUserController } from './controllers/createUserController';
import { delUserController } from './controllers/delUserController';

export const usersRouter = Router();

usersRouter.get('/', adminMiddleware, getUsersController);
usersRouter.post(
  '/',
  adminMiddleware,
  passwordValidation,
  loginValidation,
  emailValidation,
  inputCheckErrorsMiddleware,
  createUserController,
);
usersRouter.delete('/:id', adminMiddleware, delUserController);
