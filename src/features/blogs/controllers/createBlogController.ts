import { type Response, type Request } from 'express';
import { blogsService } from '../service/blogsService';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type BlogInputModel, type BlogViewModel } from '../../../types/blogs.types';

export const createBlogController = async (req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) => {
  const newBlogId = await blogsService.createBlog(req.body);
  const newBlog = await blogsService.getBlogByUUID(newBlogId);

  res.status(HttpStatuses.Created201).json(newBlog);
};
