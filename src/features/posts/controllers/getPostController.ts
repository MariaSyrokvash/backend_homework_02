import { Request, Response } from "express";
import { PostViewModel } from "../../../input-output-types/posts-types";
import { HttpStatuses } from "../../../constants/httpStatusCode.constants";
import { postsService } from "../service/postsRepository";

export const getPostController = async (
  req: Request<{ id: string }>,
  res: Response<PostViewModel>,
) => {
  const post = await postsService.findAndMap(req.params.id);
  res.status(HttpStatuses.Ok200).json(post);
};
