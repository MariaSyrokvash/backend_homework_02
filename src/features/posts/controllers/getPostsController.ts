import { type Request, type Response } from 'express';

import { normalizePostsQueries } from '../helpers';

import { postsQueryRepository } from '../posts.query.repository';

import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

import { type PostsViewModel } from '../../../types/posts.types';

export const getPostsController = async (req: Request, res: Response<PostsViewModel>) => {
  const postsFilters = normalizePostsQueries(req);
  const posts = await postsQueryRepository.getAllPosts(postsFilters);

  res.status(HttpStatuses.Ok200).json(posts);
};
