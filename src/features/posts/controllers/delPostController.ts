import { Request, Response } from "express";
import { HttpStatuses } from "../../../constants/httpStatusCode.constants";

import { postsService } from "../service/postsRepository";

export const delPostController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const postId = req.params.id;

  const isDeleted = await postsService.deletePost(postId);

  isDeleted
    ? res.sendStatus(HttpStatuses.NoContent204)
    : res.sendStatus(HttpStatuses.NotFound404);
};
