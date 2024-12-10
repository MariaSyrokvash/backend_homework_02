import { type Request, type Response, Router } from 'express';
import { createBlogValidators, createPostInBlogValidators, deleteBlogValidators, updateBlogValidators } from './middlewares/blogValidators';
import { blogsService } from './blogs.service';
import { blogsRepository } from './blogs.repository';
import { blogsQueryRepository } from './blogs.query.repository';
import { normalizeBlogsFilters } from './helpers';
import { normalizePostsQueries } from '../posts/helpers';
import { HttpStatuses } from '../../constants/httpStatusCode.constants';
import type { PostsViewModel } from '../../types/posts.types';
import {
  type BlogInputModel,
  type BlogPostInputModel,
  type BlogsViewModel,
  type BlogViewModel,
  type PostViewModel,
} from '../../types/blogs.types';
import { postsService } from '../posts/posts.service';
import { postsQueryRepository } from '../posts/posts.query.repository';

export const blogsRouter = Router();

// ------------------------------------------------getAllBlogs----------------------------------------//

blogsRouter.get('/', async (req: Request, res: Response<BlogsViewModel>) => {
  const filters = normalizeBlogsFilters(req);
  const blogs = await blogsQueryRepository.getAllBlogs(filters);
  res.status(HttpStatuses.Ok200).json(blogs);
});

// ------------------------------------------------getOneBlog-------------------------------------------//
blogsRouter.get('/:id', async (req: Request<{ id: string }>, res: Response<BlogViewModel>) => {
  const blog = await blogsQueryRepository.getOneBlog(req.params.id);
  if (!blog) {
    res.sendStatus(HttpStatuses.NotFound404);
    return;
  }
  res.status(HttpStatuses.Ok200).json(blog);
});

// ---------------------------------getAllPostsInBlog---------------------------------------//
blogsRouter.get('/:id/posts', async (req: Request<{ id: string }>, res: Response<PostsViewModel>) => {
  const blogId = req.params.id;
  const filters = normalizePostsQueries(req);
  const isExistBlog = await blogsRepository.checkExistById(blogId);

  if (!isExistBlog) {
    res.sendStatus(HttpStatuses.NotFound404);
    return;
  }
  const posts = await postsQueryRepository.getAllPostByBlogId(blogId, filters);
  res.status(HttpStatuses.Ok200).json(posts);
});

// ------------------------------------------------createBlog-------------------------------------------//

blogsRouter.post('/', ...createBlogValidators, async (req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) => {
  const newBlogId = await blogsService.createBlog(req.body);
  const newBlog = await blogsQueryRepository.getOneBlog(newBlogId);

  if (!newBlog) {
    // TODO: think status code
    res.sendStatus(HttpStatuses.ServiceUnavailable503);
    return;
  }
  res.status(HttpStatuses.Created201).json(newBlog);
});

// -----------------------------------------------updateBlog-------------------------------------------//

blogsRouter.put('/:id', ...updateBlogValidators, async (req: Request<{ id: string }, any, BlogInputModel>, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const isUpdated = await blogsService.updateBlog(body, id);

  if (!isUpdated) {
    res.sendStatus(HttpStatuses.NotFound404);
    return;
  }

  res.sendStatus(HttpStatuses.NoContent204);
});

// ------------------------------------------------deleteBlog-------------------------------------------//

blogsRouter.delete('/:id', ...deleteBlogValidators, async (req: Request<{ id: string }>, res: Response) => {
  const blogId = req.params.id;
  const isDeleted = await blogsService.deleteBlog(blogId);

  if (!isDeleted) {
    res.sendStatus(HttpStatuses.NotFound404);
    return;
  }
  res.sendStatus(HttpStatuses.NoContent204);
});

// ----------------------------------------createPostInBlog---------------------------------------------//

blogsRouter.post(
  '/:id/posts',
  ...createPostInBlogValidators,
  async (req: Request<{ id: string }, any, BlogPostInputModel>, res: Response<PostViewModel>) => {
    const blogId = req.params.id;
    const body = req.body;

    const newPostId = await postsService.createPost({ ...body, blogId });

    if (!newPostId) {
      res.sendStatus(HttpStatuses.NotFound404);
      return;
    }

    const newPost = await postsQueryRepository.getOnePost(newPostId);
    if (!newPost) {
      res.sendStatus(HttpStatuses.NotFound404);
      return;
    }
    res.status(HttpStatuses.Created201).json(newPost);
  },
);
