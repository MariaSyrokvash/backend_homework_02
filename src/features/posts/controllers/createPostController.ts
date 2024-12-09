import { type Response, type Request } from 'express';
import { postsService } from '../service/postsRepository';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type PostInputModel, type PostViewModel } from '../../../types/posts.types';

export const createPostController = async (req: Request<any, any, PostInputModel>, res: Response<PostViewModel>) => {
  const newPostId = await postsService.createPost(req.body);
  const newPost = await postsService.getPostByObjectId(newPostId);

  res.status(HttpStatuses.Created201).json(newPost!);
};
