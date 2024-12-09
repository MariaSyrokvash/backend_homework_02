import { type ObjectId } from 'mongodb';
import { blogsRepository } from './blogs.repository';

import { type PostDbType } from '../../db/post-db-type';
import { type BlogDbType } from '../../db/blog-db-type';

import { type BlogInputModel, type BlogPostInputModel } from '../../types/blogs.types';

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
  async deleteBlog(id: string) {
    const isExistBlog = await blogsRepository.checkExistById(id);

    if (!isExistBlog) {
      return false;
    }
    return await blogsRepository.deleteBlog(id);
  },
  async updateBlog(body: BlogInputModel, id: string) {
    const isExistBlog = await blogsRepository.checkExistById(id);

    if (!isExistBlog) {
      return false;
    }
    return await blogsRepository.updateBlog(body, id);
  },
  async createPost(post: BlogPostInputModel, blogId: string): Promise<ObjectId> {
    const blog = await blogsRepository.findBlogAndMap(blogId);

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
};
