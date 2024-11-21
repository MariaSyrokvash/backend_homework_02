import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

import { getBlogsQueries } from '../helpers';
import { blogsService } from '../service/blogsService';
import { type BlogsDto } from '../../../types/blogs.types';

export const getBlogsController = async (req: Request, res: Response<BlogsDto>) => {
  const blogsFilters = getBlogsQueries(req);
  const blogs = await blogsService.getAll(blogsFilters);
  res.status(HttpStatuses.Ok200).json(blogs);
};
