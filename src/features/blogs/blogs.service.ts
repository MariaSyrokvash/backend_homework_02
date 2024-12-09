import { type ObjectId } from 'mongodb';

import { type BlogDbType } from '../../db/blog-db-type';
import { blogsRepository } from './blogs.repository';
import { type PostDbType } from '../../db/post-db-type';
import {
  type BlogInputModel,
  type BlogPostInputModel,
  type BlogsDto,
  type BlogsFilters,
  type PostsBlogFilters,
} from '../../types/blogs.types';

export const blogsService = {
  async createBlog(blog: BlogInputModel): Promise<ObjectId> {
    const newBlog = {
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    } as BlogDbType;

    return await blogsRepository.createBlog(newBlog);
  },
  async createPost(post: BlogPostInputModel, blogId: string): Promise<ObjectId> {
    const blog = await this.getBlogById(blogId);
    const newPost = {
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      createdAt: new Date().toISOString(),
      blogId,
      blogName: blog.name,
    } as PostDbType;
    return await blogsRepository.createPost(newPost);
  },
  async getBlogByUUID(id: ObjectId) {
    return await blogsRepository.getBlogByUUID(id);
  },
  async getBlogById(id: string): Promise<BlogDbType> {
    return await blogsRepository.getBlogById(id);
  },
  async findAndMap(id: string) {
    return await blogsRepository.findAndMap(id);
  },
  async getAll(filters: BlogsFilters): Promise<BlogsDto> {
    const { pageSize, pageNumber } = filters;
    const blogs = await blogsRepository.getAll(filters);
    const totalCount = await blogsRepository.getTotalBlogsCount(filters.searchNameTerm);

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: blogs,
    };
  },
  async getAllPostByBlogId(blogId: string, filters: PostsBlogFilters) {
    const { pageSize, pageNumber } = filters;
    const posts = await blogsRepository.getAllPostByBlogId(blogId, filters);
    const totalCount = await blogsRepository.getTotalPostsCountByBlogId(blogId);

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: posts,
    };
  },
  async deleteBlog(id: string) {
    return await blogsRepository.deleteBlog(id);
  },
  async updateBlog(body: BlogInputModel, id: string) {
    return await blogsRepository.updateBlog(body, id);
  },
};
