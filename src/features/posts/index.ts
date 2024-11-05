import { Router } from "express";

import { createPostController } from "./controllers/createPostController";
import { getPostsController } from "./controllers/getPostsController";
import { getPostController } from "./controllers/getPostController";
import { delPostController } from "./controllers/delPostController";
import { putPostController } from "./controllers/putPostController";

import {
  createPostValidators,
  deletePostValidators,
  getPostValidators,
  updatePostValidators,
} from "./middlewares/postValidators";

export const postsRouter = Router();

postsRouter.get("/", getPostsController);
postsRouter.get("/:id", ...getPostValidators, getPostController);
postsRouter.post("/", ...createPostValidators, createPostController);
postsRouter.put("/:id", ...updatePostValidators, putPostController);
postsRouter.delete("/:id", ...deletePostValidators, delPostController);
