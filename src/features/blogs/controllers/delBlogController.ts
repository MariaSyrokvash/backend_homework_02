import { Request, Response } from "express";
import { HttpStatuses } from "../../../constants/httpStatusCode.constants";
import { blogsService } from "../service/blogsService";

export const delBlogController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const blogId = req.params.id;

  const isDeleted = await blogsService.deleteBlog(blogId);

  isDeleted
    ? res.sendStatus(HttpStatuses.NoContent204)
    : res.sendStatus(HttpStatuses.NotFound404);
};
