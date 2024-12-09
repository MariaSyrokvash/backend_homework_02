import { type ObjectId } from 'mongodb';

import { type PostDbType } from '../../../db/post-db-type';

import { blogsRepository } from '../../blogs/blogs.repository';
import { postsRepository } from '../repository/postsRepository';

import { type PostInputModel, type PostsDto, type PostsFilters } from '../../../types/posts.types';

export const postsService = {
  async createPost(post: PostInputModel) {
    const blog = await blogsRepository.findBlogAndMap(post.blogId);

    const newPost = {
      title: post.title,
      content: post.content,
      shortDescription: post.shortDescription,
      blogId: post.blogId,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    } as PostDbType;

    return await postsRepository.createPost(newPost);
  },
  async getPostById(id: string) {
    return await postsRepository.getPostById(id);
  },
  async findAndMap(id: string) {
    return await postsRepository.findAndMap(id);
  },
  async getPostByObjectId(id: ObjectId) {
    return await postsRepository.findPostByObjectId(id);
  },
  async getAllPosts(filters: PostsFilters): Promise<PostsDto> {
    const { pageSize, pageNumber } = filters;
    const posts = await postsRepository.getAllPosts(filters);
    const totalCount = await postsRepository.getTotalPostsCount();

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: posts,
    };
  },
  async deletePost(id: string) {
    return await postsRepository.deletePost(id);
  },
  async updatePost(body: PostInputModel, id: string) {
    const blog = await blogsRepository.findBlogAndMap(body.blogId);
    const reqBody = { ...body, blogName: blog.name };
    return await postsRepository.updatePost(reqBody, id);
  },
};
