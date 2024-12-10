import { type Response, type Request } from 'express';
import { postsService } from '../posts.service';
import { postsQueryRepository } from '../posts.query.repository';
import { HttpStatuses } from '../../../constants/httpStatusCode.constants';
import { type PostInputModel, type PostViewModel } from '../../../types/posts.types';

export const createPostController = async (req: Request<any, any, PostInputModel>, res: Response<PostViewModel>) => {
  const newPostId = await postsService.createPost(req.body);
  if (!newPostId) {
    res.sendStatus(HttpStatuses.ServiceUnavailable503);
    return;
  }
  const newPost = await postsQueryRepository.getOnePost(newPostId);
  if (!newPost) {
    res.sendStatus(HttpStatuses.ServiceUnavailable503);
    return;
  }
  res.status(HttpStatuses.Created201).json(newPost);
};
