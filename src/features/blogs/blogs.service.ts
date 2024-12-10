import { blogsRepository } from './blogs.repository';
import { type BlogDbType } from '../../db/blog-db-type';

import { type BlogInputModel } from '../../types/blogs.types';

export const blogsService = {
  async createBlog(blog: BlogInputModel): Promise<string> {
    const newBlog: BlogDbType = {
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
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
};
