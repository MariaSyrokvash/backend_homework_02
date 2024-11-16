import { type Request, type Response } from 'express';
import { blogsCollection, postsCollection, usersCollection } from '../../../db/mongoDb';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

export const deleteDBController = async (_: Request, res: Response) => {
  await postsCollection.drop();
  await blogsCollection.drop();
  await usersCollection.drop();
  res.sendStatus(HttpStatuses.NoContent204);
};
