import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { blogsService } from '../service/blogsService';
import { type BlogInputModel } from '../../../types/blogs.types';

export const putBlogController = async (req: Request<{ id: string }, any, BlogInputModel>, res: Response) => {
  const blogId = req.params.id;
  const body = req.body;
  const isUpdated = await blogsService.updateBlog(body, blogId);

  isUpdated ? res.sendStatus(HttpStatuses.NoContent204) : res.sendStatus(HttpStatuses.NotFound404);
};
