import { Router } from 'express';
import { deleteDBController } from './controllers/deleteDBController';

export const testingRouter = Router();

testingRouter.delete('/', deleteDBController);
