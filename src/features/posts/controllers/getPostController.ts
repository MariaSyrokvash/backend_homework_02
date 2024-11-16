import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type PostViewModel } from '../../../input-output-types/posts-types';
import { postsService } from '../service/postsRepository';

export const getPostController = async (req: Request<{ id: string }>, res: Response<PostViewModel>) => {
  const post = await postsService.findAndMap(req.params.id);
  res.status(HttpStatuses.Ok200).json(post);
};
