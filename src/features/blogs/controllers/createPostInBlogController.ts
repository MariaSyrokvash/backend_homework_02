import { type Request, type Response } from 'express';
import { blogsService } from '../blogs.service';

import { postsRepository } from '../../posts/repository/postsRepository';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type BlogPostInputModel, type PostViewModel } from '../../../types/blogs.types';

export const createPostInBlogController = async (req: Request<{ id: string }, any, BlogPostInputModel>, res: Response<PostViewModel>) => {
  const blogId = req.params.id;
  const body = req.body;

  const newPostId = await blogsService.createPost(body, blogId);
  const newPost = await postsRepository.getPostByUUID(newPostId);

  res.status(HttpStatuses.Created201).json(newPost);
};
