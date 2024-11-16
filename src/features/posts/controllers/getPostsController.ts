import { type Request, type Response } from 'express';

import { getPostsQueries } from '../helpers';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type PostsDto } from '../../../input-output-types/posts-types';
import { postsService } from '../service/postsRepository';

export const getPostsController = async (req: Request, res: Response<PostsDto>) => {
  const postsFilters = getPostsQueries(req);
  const posts = await postsService.getAllPosts(postsFilters);
  res.status(HttpStatuses.Ok200).json(posts);
};
