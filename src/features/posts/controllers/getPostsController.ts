import { type Request, type Response } from 'express';

import { getPostsQueries } from '../helpers';

import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

import { postsService } from '../service/postsRepository';

import { type PostsDto } from '../../../types/posts.types';

export const getPostsController = async (req: Request, res: Response<PostsDto>) => {
  const postsFilters = getPostsQueries(req);
  const posts = await postsService.getAllPosts(postsFilters);

  res.status(HttpStatuses.Ok200).json(posts);
};
