import { type Request, type Response } from 'express';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type BlogsDto } from '../../../input-output-types/blogs-types';
import { getBlogsQueries } from '../helpers';
import { blogsService } from '../service/blogsService';

export const getBlogsController = async (req: Request, res: Response<BlogsDto>) => {
  const blogsFilters = getBlogsQueries(req);
  const blogs = await blogsService.getAll(blogsFilters);
  res.status(HttpStatuses.Ok200).json(blogs);
};
