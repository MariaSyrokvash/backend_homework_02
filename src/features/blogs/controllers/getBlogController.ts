import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type BlogViewModel } from '../../../input-output-types/blogs-types';
import { blogsService } from '../service/blogsService';

export const getBlogController = async (req: Request<{ id: string }>, res: Response<BlogViewModel>) => {
  const blog = await blogsService.findAndMap(req.params.id);
  res.status(HttpStatuses.Ok200).json(blog);
};
