import { Request, Response } from 'express';
import { BlogsDto } from '../../../input-output-types/blogs-types';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

import { blogsService } from '../service/blogsService';
import { getBlogsQueries } from '../helpers';

export const getBlogsController = async (req: Request, res: Response<BlogsDto>) => {
    const blogsFilters = getBlogsQueries(req);
    const blogs = await blogsService.getAll(blogsFilters);
    res.status(HttpStatuses.Ok200).json(blogs)
}

