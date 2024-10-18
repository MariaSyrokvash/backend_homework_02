import {Router} from 'express'

import {createBlogController} from './controllers/createBlogController'
import {getBlogsController} from './controllers/getBlogsController'
import {getBlogController} from './controllers/getBlogController'
import {delBlogController} from './controllers/delBlogController'
import {putBlogController} from './controllers/putBlogController'

import {
    getBlogValidators,
    createBlogValidators,
    deleteBlogValidators,
    updateBlogValidators
} from './middlewares/blogValidators'

export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.get('/:id', ...getBlogValidators, getBlogController)
blogsRouter.post('/', ...createBlogValidators, createBlogController)
blogsRouter.put('/:id', ...updateBlogValidators, putBlogController)
blogsRouter.delete('/:id', ...deleteBlogValidators, delBlogController)
