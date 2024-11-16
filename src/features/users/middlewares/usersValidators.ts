import { body } from 'express-validator';
import { usersRepository } from '../repositories/usersRepository';

export const passwordValidation = body('password').isString().trim().isLength({ min: 6, max: 20 }).withMessage('password is not correct');

export const loginValidation = body('login')
  .isString()
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage('login is not correct')
  .custom(async (login: string) => {
    const user = await usersRepository.findByLoginOrEmail(login);
    if (user) {
      throw new Error('login already exist');
    }
    return true;
  });

export const emailValidation = body('email')
  .isString()
  .trim()
  .isLength({ min: 1 })
  .isEmail()
  .withMessage('email is not correct')
  .custom(async (email: string) => {
    const user = await usersRepository.findByLoginOrEmail(email);
    if (user) {
      throw new Error('email already exist');
    }
    return true;
  });
