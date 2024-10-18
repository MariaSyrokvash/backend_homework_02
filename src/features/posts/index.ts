import {Router} from 'express'
import {createPostController} from './controllers/createPostController'
import {getPostsController} from './controllers/getPostsController'
import {findPostController} from './controllers/findPostController'
import {delPostController} from './controllers/delPostController'
import {putPostController} from './controllers/putPostController'
import {postValidators} from './middlewares/postValidators'

export const postsRouter = Router()

postsRouter.post('/', ...postValidators, createPostController)
postsRouter.get('/', getPostsController)
postsRouter.get('/:id', findPostController)
postsRouter.delete('/:id', delPostController)
postsRouter.put('/:id', putPostController)

// не забудьте добавить роут в апп
