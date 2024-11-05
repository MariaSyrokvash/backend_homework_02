import { Router } from "express";

import { getBlogController } from "./controllers/getBlogController";
import { delBlogController } from "./controllers/delBlogController";
import { putBlogController } from "./controllers/putBlogController";
import { getBlogsController } from "./controllers/getBlogsController";
import { createBlogController } from "./controllers/createBlogController";
import { getPostsInBlogController } from "./controllers/getPostsInBlogController";
import { createPostInBlogController } from "./controllers/createPostInBlogController";

import {
  getBlogValidators,
  createBlogValidators,
  deleteBlogValidators,
  updateBlogValidators,
  createPostInBlogValidators,
} from "./middlewares/blogValidators";

export const blogsRouter = Router();

blogsRouter.get("/", getBlogsController);
blogsRouter.get("/:id", ...getBlogValidators, getBlogController);
blogsRouter.post("/", ...createBlogValidators, createBlogController);
blogsRouter.put("/:id", ...updateBlogValidators, putBlogController);
blogsRouter.delete("/:id", ...deleteBlogValidators, delBlogController);

blogsRouter.post(
  "/:id/posts",
  ...createPostInBlogValidators,
  createPostInBlogController,
);
blogsRouter.get("/:id/posts", ...getBlogValidators, getPostsInBlogController);
