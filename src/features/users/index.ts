import { Router } from 'express';
import { getUsersController } from './controllers/getUsersController';
import { emailValidation, loginValidation, passwordValidation } from './middlewares/usersValidators';
import { createUserController } from './controllers/createUserController';
import { delUserController } from './controllers/delUserController';
import { inputCheckErrors } from '../../middlewares/inputCheckErrors.middlewares';
import { adminAuthGuard } from '../../middlewares/admin.middlewares';

export const usersRouter = Router();

usersRouter.get('/', adminAuthGuard, getUsersController);
usersRouter.post('/', adminAuthGuard, passwordValidation, loginValidation, emailValidation, inputCheckErrors, createUserController);
usersRouter.delete('/:id', adminAuthGuard, delUserController);
