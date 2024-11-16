import { type Response, type Request } from 'express';
import { postsService } from '../service/postsRepository';
import { type PostInputModel, type PostViewModel } from '../../../input-output-types/posts-types';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

export const createPostController = async (req: Request<any, any, PostInputModel>, res: Response<PostViewModel>) => {
  const newPostId = await postsService.createPost(req.body);
  const newPost = await postsService.getPostByUUID(newPostId);

  res.status(HttpStatuses.Created201).json(newPost);
};
