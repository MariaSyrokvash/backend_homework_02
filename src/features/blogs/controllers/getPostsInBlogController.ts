import { Request, Response } from "express";
import { HttpStatuses } from "../../../constants/httpStatusCode.constants";
import {
  PostsDto,
  PostViewModel,
} from "../../../input-output-types/posts-types";
import { blogsService } from "../service/blogsService";
import { getPostsBlogQueries } from "../helpers";

export const getPostsInBlogController = async (
  req: Request<{ id: string }>,
  res: Response<PostsDto>,
) => {
  const blogId = req.params.id;
  const postsFilters = getPostsBlogQueries(req);
  const posts = await blogsService.getAllPostByBlogId(blogId, postsFilters);
  res.status(HttpStatuses.Ok200).json(posts);
};
