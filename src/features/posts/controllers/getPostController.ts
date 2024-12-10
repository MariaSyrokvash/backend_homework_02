import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { postsService } from '../service/postsRepository';
import { type PostViewModel } from '../../../types/posts.types';

export const getPostController = async (req: Request<{ id: string }>, res: Response<PostViewModel>) => {
  const post = await postsService.findAndMap(req.params.id);

  if (!post) {
    res.sendStatus(HttpStatuses.NotFound404);
    return;
  }

  res.status(HttpStatuses.Ok200).json(post);
};
