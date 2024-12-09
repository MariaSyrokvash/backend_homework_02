import { type Request, type Response } from 'express';
import { blogsService } from '../blogs.service';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

export const delBlogController = async (req: Request<{ id: string }>, res: Response) => {
  const blogId = req.params.id;
  const isDeleted = await blogsService.deleteBlog(blogId);

  isDeleted ? res.sendStatus(HttpStatuses.NoContent204) : res.sendStatus(HttpStatuses.NotFound404);
};
