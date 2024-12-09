import { type Request, type Response, Router } from 'express';

import {
  getBlogValidators,
  createBlogValidators,
  deleteBlogValidators,
  updateBlogValidators,
  createPostInBlogValidators,
} from './middlewares/blogValidators';

// import { getBlogController } from './controllers/getBlogController';
// import { getBlogsController } from './controllers/getBlogsController';
// import { createBlogController } from './controllers/createBlogController';
// import { putBlogController } from './controllers/putBlogController';
// import { delBlogController } from './controllers/delBlogController';

// import { createPostInBlogController } from './controllers/createPostInBlogController';
// import { getPostsInBlogController } from './controllers/getPostsInBlogController';

import { blogsService } from './blogs.service';

import { getBlogsQueries, getPostsBlogQueries } from './helpers';

import { HttpStatuses } from '../../constants/httpStatusCode.constants';

import type { BlogInputModel, BlogPostInputModel, BlogsDto, BlogViewModel, PostViewModel } from '../../types/blogs.types';
import { postsRepository } from '../posts/repository/postsRepository'; // TODO: ?
import type { PostsDto } from '../../types/posts.types'; // TODO: ?

export const blogsRouter = Router();

// ------------------------------------------------getAllBlogs-------------------------------------------//

// blogsRouter.get('/', getBlogsController); // query
blogsRouter.get('/', async (req: Request, res: Response<BlogsDto>) => {
  const blogsFilters = getBlogsQueries(req);
  const blogs = await blogsService.getAll(blogsFilters);
  res.status(HttpStatuses.Ok200).json(blogs);
}); // TODO: fix query repo

// ------------------------------------------------getOneBlog-------------------------------------------//

// blogsRouter.get('/:id', ...getBlogValidators, getBlogController); // query
blogsRouter.get('/:id', ...getBlogValidators, async (req: Request<{ id: string }>, res: Response<BlogViewModel>) => {
  const blog = await blogsService.findAndMap(req.params.id);
  res.status(HttpStatuses.Ok200).json(blog);
}); // TODO: fix query repo

// ------------------------------------------------createBlog-------------------------------------------//

// blogsRouter.post('/', ...createBlogValidators, createBlogController);
blogsRouter.post('/', ...createBlogValidators, async (req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) => {
  const newBlogId = await blogsService.createBlog(req.body);
  const newBlog = await blogsService.getBlogByUUID(newBlogId);

  res.status(HttpStatuses.Created201).json(newBlog);
});

// ------------------------------------------------updateBlog-------------------------------------------//

// blogsRouter.put('/:id', ...updateBlogValidators, putBlogController);
blogsRouter.put('/:id', ...updateBlogValidators, async (req: Request<{ id: string }, any, BlogInputModel>, res: Response) => {
  const blogId = req.params.id;
  const body = req.body;
  const isUpdated = await blogsService.updateBlog(body, blogId);

  isUpdated ? res.sendStatus(HttpStatuses.NoContent204) : res.sendStatus(HttpStatuses.NotFound404);
});

// ------------------------------------------------deleteBlog-------------------------------------------//

// blogsRouter.delete('/:id', ...deleteBlogValidators, delBlogController);
blogsRouter.delete('/:id', ...deleteBlogValidators, async (req: Request<{ id: string }>, res: Response) => {
  const blogId = req.params.id;
  const isDeleted = await blogsService.deleteBlog(blogId);

  isDeleted ? res.sendStatus(HttpStatuses.NoContent204) : res.sendStatus(HttpStatuses.NotFound404);
});

// ----------------------------------------createPostInBlog---------------------------------------------//

// blogsRouter.post('/:id/posts', ...createPostInBlogValidators, createPostInBlogController);
blogsRouter.post(
  '/:id/posts',
  ...createPostInBlogValidators,
  async (req: Request<{ id: string }, any, BlogPostInputModel>, res: Response<PostViewModel>) => {
    const blogId = req.params.id;
    const body = req.body;

    const newPostId = await blogsService.createPost(body, blogId);
    const newPost = await postsRepository.getPostByUUID(newPostId);

    res.status(HttpStatuses.Created201).json(newPost);
  },
);

// ---------------------------------getAllPostsInBlog---------------------------------------//
// blogsRouter.get('/:id/posts', ...getBlogValidators, getPostsInBlogController); // query
blogsRouter.get('/:id/posts', ...getBlogValidators, async (req: Request<{ id: string }>, res: Response<PostsDto>) => {
  const blogId = req.params.id;
  const postsFilters = getPostsBlogQueries(req);
  const posts = await blogsService.getAllPostByBlogId(blogId, postsFilters);
  res.status(HttpStatuses.Ok200).json(posts);
}); // query
