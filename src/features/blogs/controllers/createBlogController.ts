import { type Response, type Request } from 'express';
import { blogsService } from '../service/blogsService';
import { type BlogInputModel, type BlogViewModel } from '../../../input-output-types/blogs-types';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

export const createBlogController = async (req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) => {
  const newBlogId = await blogsService.createBlog(req.body);
  const newBlog = await blogsService.getBlogByUUID(newBlogId);

  res.status(HttpStatuses.Created201).json(newBlog);
};
