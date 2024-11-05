import { body } from "express-validator";
import { inputCheckErrorsMiddleware } from "../../../global-middlewares/inputCheckErrorsMiddleware";
import { NextFunction, Request, Response } from "express";
import { postsRepository } from "../repository/postsRepository";
import { adminMiddleware } from "../../../global-middlewares/admin-middleware";
import { HttpStatuses } from "../../../constants/httpStatusCode.constants";
import {
  MaxLengthPostContent,
  MaxLengthPostShortDescription,
  MaxLengthPostTitle,
  MinLength,
} from "../../../constants/posts.constants";
import { blogsService } from "../../blogs/service/blogsService";

// title: string // max 30
// shortDescription: string // max 100
// content: string // max 1000
// blogId: string // valid

export const titleValidator = body("title")
  .isString()
  .withMessage("not string")
  .trim()
  .isLength({ min: MinLength, max: MaxLengthPostTitle })
  .withMessage(`more then ${MaxLengthPostTitle} or 0`);

export const shortDescriptionValidator = body("shortDescription")
  .isString()
  .withMessage("not string")
  .trim()
  .isLength({ min: MinLength, max: MaxLengthPostShortDescription })
  .withMessage(`more then ${MaxLengthPostShortDescription} or 0`);

export const contentValidator = body("content")
  .isString()
  .withMessage("not string")
  .trim()
  .isLength({ min: MinLength, max: MaxLengthPostContent })
  .withMessage(`more then ${MaxLengthPostContent} or 0`);

export const blogIdValidator = body("blogId")
  .isString()
  .withMessage("not string")
  .trim()
  .custom(async (blogId) => {
    const blog = await blogsService.getBlogById(blogId);
    if (!blog) {
      // Reject the value if no blog was found with the given blogId
      throw new Error("no blog");
    }
    return true;
  })
  .withMessage("no blog");

export const findPostValidator = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const post = await postsRepository.getPostById(req.params.id);
  if (!post) {
    res.sendStatus(HttpStatuses.NotFound404);
    return;
  }
  next();
};

const commonPostValidators = [
  blogIdValidator,
  titleValidator,
  shortDescriptionValidator,
  contentValidator,

  inputCheckErrorsMiddleware,
];

export const getPostValidators = [findPostValidator];

export const createPostValidators = [adminMiddleware, ...commonPostValidators];

export const updatePostValidators = [
  adminMiddleware,
  findPostValidator,

  ...commonPostValidators,
];

export const deletePostValidators = [adminMiddleware, findPostValidator];
