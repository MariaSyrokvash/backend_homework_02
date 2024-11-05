import { Request, Response } from "express";

import { postsRepository } from "../../posts/repository/postsRepository";

import {
  BlogPostInputModel,
  PostViewModel,
} from "../../../input-output-types/blogs-types";

import { HttpStatuses } from "../../../constants/httpStatusCode.constants";

import { blogsService } from "../service/blogsService";

export const createPostInBlogController = async (
  req: Request<{ id: string }, any, BlogPostInputModel>,
  res: Response<PostViewModel>,
) => {
  const blogId = req.params.id;
  const body = req.body;

  const newPostId = await blogsService.createPost(body, blogId);
  const newPost = await postsRepository.getPostByUUID(newPostId);

  res.status(HttpStatuses.Created201).json(newPost);
};
