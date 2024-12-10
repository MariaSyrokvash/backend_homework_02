import { type Request, type Response } from 'express';
import { postsService } from '../posts.service';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

export const delPostController = async (req: Request<{ id: string }>, res: Response) => {
  const isDeleted = await postsService.deletePost(req.params.id);
  if (!isDeleted) {
    res.sendStatus(HttpStatuses.NotFound404);
    return;
  }
  res.sendStatus(HttpStatuses.NoContent204);
};
