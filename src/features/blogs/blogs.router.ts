import { type Request, type Response, Router } from 'express';
import { createBlogValidators, createPostInBlogValidators, deleteBlogValidators, updateBlogValidators } from './middlewares/blogValidators';
import { blogsService } from './blogs.service';
import { blogsRepository } from './blogs.repository';
import { blogsQueryRepository } from './blogs.query.repository';
import { normalizeBlogsFilters, normalizePostsBlogQueries } from './helpers';
import { HttpStatuses } from '../../constants/httpStatusCode.constants';
import type { BlogInputModel, BlogPostInputModel, BlogsDto, BlogViewModel, PostViewModel } from '../../types/blogs.types';
import type { PostsDto } from '../../types/posts.types';

export const blogsRouter = Router();

// ------------------------------------------------getAllBlogs----------------------------------------//

blogsRouter.get('/', async (req: Request, res: Response<BlogsDto>) => {
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

// ------------------------------------------------createBlog-------------------------------------------//

blogsRouter.post('/', ...createBlogValidators, async (req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) => {
  const newBlogId = await blogsService.createBlog(req.body);
  const newBlog = await blogsRepository.findBlogByObjectIdAndMap(newBlogId);

  if (!newBlog) {
    res.sendStatus(HttpStatuses.BadRequest400);
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

    const isExistBlog = await blogsRepository.checkExistById(blogId);
    if (!isExistBlog) {
      res.sendStatus(HttpStatuses.NotFound404);
      return;
    }

    const newPostId = await blogsService.createPost(body, blogId);
    const newPost = await blogsRepository.findAndMapPostById(newPostId);

    res.status(HttpStatuses.Created201).json(newPost);
  },
);

// ---------------------------------getAllPostsInBlog---------------------------------------//
blogsRouter.get('/:id/posts', async (req: Request<{ id: string }>, res: Response<PostsDto>) => {
  const blogId = req.params.id;
  const filters = normalizePostsBlogQueries(req);

  const isExistBlog = await blogsRepository.checkExistById(blogId);
  if (!isExistBlog) {
    res.sendStatus(HttpStatuses.NotFound404);
    return;
  }

  const posts = await blogsQueryRepository.getAllPostByBlogId(blogId, filters);
  res.status(HttpStatuses.Ok200).json(posts);
});
