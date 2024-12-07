import { type Request, type Response } from 'express';

import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

import { postsService } from '../service/postsRepository';

import { type PostInputModel } from '../../../types/posts.types';

export const putPostController = async (req: Request<{ id: string }, any, PostInputModel>, res: Response) => {
  const postId = req.params.id;
  const body = req.body;

  const isUpdated = await postsService.updatePost(body, postId);

  isUpdated ? res.sendStatus(HttpStatuses.NoContent204) : res.sendStatus(HttpStatuses.NotFound404);
};
