import {Router} from 'express'
import {createBlogController} from './controllers/createBlogController'
import {getBlogsController} from './controllers/getBlogsController'
import {getBlogController} from './controllers/findBlogController'
import {delBlogController} from './controllers/delBlogController'
import {putBlogController} from './controllers/putBlogController'
import {blogValidators, findBlogValidator} from './middlewares/blogValidators'
import {adminMiddleware} from '../../global-middlewares/admin-middleware'

export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.get('/:id', findBlogValidator, getBlogController)

blogsRouter.post('/', adminMiddleware, ...blogValidators, createBlogController)
blogsRouter.put('/:id', adminMiddleware, findBlogValidator, ...blogValidators, putBlogController)

blogsRouter.delete('/:id', adminMiddleware, findBlogValidator, delBlogController)
