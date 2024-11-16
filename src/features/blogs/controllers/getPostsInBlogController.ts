import { type Request, type Response } from 'express';
import { blogsService } from '../service/blogsService';
import { type PostsDto } from '../../../input-output-types/posts-types';
import { getPostsBlogQueries } from '../helpers';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

export const getPostsInBlogController = async (req: Request<{ id: string }>, res: Response<PostsDto>) => {
  const blogId = req.params.id;
  const postsFilters = getPostsBlogQueries(req);
  const posts = await blogsService.getAllPostByBlogId(blogId, postsFilters);
  res.status(HttpStatuses.Ok200).json(posts);
};
