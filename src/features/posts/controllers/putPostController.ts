import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type PostInputModel } from '../../../types/posts.types';
import { postsService } from '../posts.service';

export const putPostController = async (req: Request<{ id: string }, any, PostInputModel>, res: Response) => {
  const postId = req.params.id;
  const body = req.body;
  const isUpdated = await postsService.updatePost(body, postId);
  if (!isUpdated) {
    res.sendStatus(HttpStatuses.NotFound404);
    return;
  }
  res.sendStatus(HttpStatuses.NoContent204);
};
