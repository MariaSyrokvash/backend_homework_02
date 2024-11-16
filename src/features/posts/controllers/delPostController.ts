import { type Request, type Response } from 'express';
import { postsService } from '../service/postsRepository';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

export const delPostController = async (req: Request<{ id: string }>, res: Response) => {
  const postId = req.params.id;

  const isDeleted = await postsService.deletePost(postId);

  isDeleted ? res.sendStatus(HttpStatuses.NoContent204) : res.sendStatus(HttpStatuses.NotFound404);
};
