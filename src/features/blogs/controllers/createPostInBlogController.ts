import {Request, Response} from 'express'

import {blogsRepository} from "../blogsRepository";
import {postsRepository} from "../../posts/postsRepository";

import {BlogPostInputModel, PostViewModel} from '../../../input-output-types/blogs-types'

import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const createPostInBlogController = async (req: Request<{id: string}, any, BlogPostInputModel>, res: Response<PostViewModel>) => {
  const blogId = req.params.id;
  const body = req.body;

  const newPostId = await blogsRepository.createPost(body, blogId);
  const newPost =  await postsRepository.getPostByUUID(newPostId)

  res.status(HttpStatuses.Created201).json(newPost)
}
