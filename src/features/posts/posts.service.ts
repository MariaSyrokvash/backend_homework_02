import { type PostDbType } from '../../db/post-db-type';

import { blogsRepository } from '../blogs/blogs.repository';
import { postsRepository } from './posts.repository';

import { type PostInputModel } from '../../types/posts.types';

export const postsService = {
  async createPost(post: PostInputModel) {
    const blog = await blogsRepository.findBlogById(post.blogId);

    if (!blog) {
      return null;
    }
    const newPost: PostDbType = {
      title: post.title,
      content: post.content,
      shortDescription: post.shortDescription,
      blogId: post.blogId,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    return await postsRepository.createPost(newPost);
  },
  async deletePost(id: string) {
    const isExistPost = await postsRepository.checkExistById(id);
    if (!isExistPost) {
      return false;
    }
    return await postsRepository.deletePost(id);
  },
  async updatePost(body: PostInputModel, id: string) {
    const isExistPost = await postsRepository.checkExistById(id);
    if (!isExistPost) {
      return false;
    }

    const blog = await blogsRepository.findBlogById(body.blogId);
    if (!blog) return false;

    const reqBody = { ...body, blogName: blog.name };
    return await postsRepository.updatePost(reqBody, id);
  },
};
