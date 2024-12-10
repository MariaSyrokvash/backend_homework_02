import { type Response, type Request } from 'express';
import { postsService } from '../service/postsRepository';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type PostInputModel, type PostViewModel } from '../../../types/posts.types';

export const createPostController = async (req: Request<any, any, PostInputModel>, res: Response<PostViewModel>) => {
  const newPostId = await postsService.createPost(req.body);
  if (!newPostId) throw new Error('Post not created');

  const newPost = await postsService.getPostByObjectId(newPostId);

  if (!newPost) throw new Error('Post not created');

  res.status(HttpStatuses.Created201).json(newPost);
};
