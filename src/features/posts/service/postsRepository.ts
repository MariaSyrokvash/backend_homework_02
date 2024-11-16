import { type ObjectId } from 'mongodb';
import { type PostInputModel, type PostsDto, type PostsFilters } from '../../../input-output-types/posts-types';
import { blogsService } from '../../blogs/service/blogsService';
import { type PostDbType } from '../../../db/post-db-type';
import { postsRepository } from '../repository/postsRepository';

export const postsService = {
  async createPost(post: PostInputModel) {
    const blog = await blogsService.getBlogById(post.blogId);

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
  async getPostByUUID(id: ObjectId) {
    return await postsRepository.getPostByUUID(id);
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
    const blog = await blogsService.getBlogById(body.blogId);
    const reqBody = { ...body, blogName: blog.name };
    return await postsRepository.updatePost(reqBody, id);
  },
};
