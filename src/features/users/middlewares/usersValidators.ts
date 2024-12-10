import { body } from 'express-validator';

export const passwordValidation = body('password').isString().trim().isLength({ min: 6, max: 20 }).withMessage('password is not correct');

export const loginValidation = body('login').isString().trim().isLength({ min: 3, max: 10 }).withMessage('login is not correct');

export const emailValidation = body('email').isString().trim().isLength({ min: 1 }).isEmail().withMessage('email is not correct');
