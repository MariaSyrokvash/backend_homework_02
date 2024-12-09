import { type Filter, ObjectId } from 'mongodb';
import type { BlogsDto, BlogsFilters, BlogViewModel, PostsBlogFilters, PostViewModel } from '../../types/blogs.types';

import { Direction } from '../../constants/pagination.constants';

import { blogsCollection, postsCollection } from '../../db/mongoDb';

import type { BlogDbType } from '../../db/blog-db-type';
import type { PostDbType } from '../../db/post-db-type';

export const blogsQueryRepository = {
  async getAllBlogs(filters: BlogsFilters): Promise<BlogsDto> {
    const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = filters;
    const skip = (pageNumber - 1) * pageSize;
    const currentFilters: Filter<BlogDbType> = {};

    if (searchNameTerm) {
      currentFilters.name = { $regex: searchNameTerm, $options: 'i' };
    }
    const totalCount = await blogsCollection.countDocuments(currentFilters);

    const blogs = await blogsCollection
      .find(currentFilters, { projection: { _id: 0 } })
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === Direction.Asc ? 1 : -1 })
      .toArray();

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: this._mapBlogs(blogs),
    };
  },
  async getOneBlog(id: string): Promise<BlogViewModel | null> {
    if (!this._checkObjectId(id)) return null;
    const blog = await blogsCollection.findOne({ id });
    if (!blog) return null;
    return this._mapBlog(blog);
  },
  async getAllPostByBlogId(blogId: string, filters: PostsBlogFilters) {
    const { pageSize, pageNumber, sortBy, sortDirection } = filters;
    const currentFilters: Filter<PostDbType> = {};

    const skip = (pageNumber - 1) * pageSize;
    const totalCount = await postsCollection.countDocuments({ blogId });
    const posts = await postsCollection
      .find({ blogId, ...currentFilters })
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === Direction.Asc ? 1 : -1 })
      .toArray();

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: this._mapPosts(posts),
    };
  },
  _mapBlog(blog: BlogDbType) {
    const blogForOutput: BlogViewModel = {
      id: blog._id.toString(),
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      name: blog.name,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    };
    return blogForOutput;
  },
  _mapBlogs(blogs: BlogDbType[]) {
    return blogs.map((blog) => this._mapBlog(blog));
  },
  _mapPost(post: PostDbType) {
    const postForOutput: PostViewModel = {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      createdAt: post.createdAt,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
    };
    return postForOutput;
  },
  _mapPosts(posts: PostDbType[]) {
    return posts.map((post) => this._mapPost(post));
  },
  _checkObjectId(id: string): boolean {
    return ObjectId.isValid(id);
  },
};
