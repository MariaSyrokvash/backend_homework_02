import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

import { blogsService } from '../blogs.service';
import { type BlogViewModel } from '../../../types/blogs.types';

export const getBlogController = async (req: Request<{ id: string }>, res: Response<BlogViewModel>) => {
  const blog = await blogsService.findAndMap(req.params.id);
  res.status(HttpStatuses.Ok200).json(blog);
};
