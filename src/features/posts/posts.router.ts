import { Router } from 'express';

import { createPostValidators, deletePostValidators, updatePostValidators } from './middlewares/postValidators';
import { getPostsController } from './controllers/getPostsController';
import { getPostController } from './controllers/getPostController';
import { createPostController } from './controllers/createPostController';
import { putPostController } from './controllers/putPostController';
import { delPostController } from './controllers/delPostController';

export const postsRouter = Router();

postsRouter.get('/', getPostsController);
postsRouter.get('/:id', getPostController);
postsRouter.post('/', ...createPostValidators, createPostController);
postsRouter.put('/:id', ...updatePostValidators, putPostController);
postsRouter.delete('/:id', ...deletePostValidators, delPostController);
