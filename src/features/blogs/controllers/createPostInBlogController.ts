import { type Request, type Response } from 'express';
import { blogsService } from '../service/blogsService';
import { type BlogPostInputModel, type PostViewModel } from '../../../input-output-types/blogs-types';
import { postsRepository } from '../../posts/repository/postsRepository';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

export const createPostInBlogController = async (req: Request<{ id: string }, any, BlogPostInputModel>, res: Response<PostViewModel>) => {
  const blogId = req.params.id;
  const body = req.body;

  const newPostId = await blogsService.createPost(body, blogId);
  const newPost = await postsRepository.getPostByUUID(newPostId);

  res.status(HttpStatuses.Created201).json(newPost);
};
