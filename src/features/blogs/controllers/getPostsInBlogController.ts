import { type Request, type Response } from 'express';
import { blogsService } from '../service/blogsService';
import { getPostsBlogQueries } from '../helpers';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type PostsDto } from '../../../types/posts.types';

export const getPostsInBlogController = async (req: Request<{ id: string }>, res: Response<PostsDto>) => {
  const blogId = req.params.id;
  const postsFilters = getPostsBlogQueries(req);
  const posts = await blogsService.getAllPostByBlogId(blogId, postsFilters);
  res.status(HttpStatuses.Ok200).json(posts);
};
