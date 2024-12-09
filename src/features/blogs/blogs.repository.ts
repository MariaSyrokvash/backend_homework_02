import { ObjectId, type WithId } from 'mongodb';
import { blogsCollection, postsCollection } from '../../db/mongoDb';

import type { BlogDbType } from '../../db/blog-db-type';
import type { PostDbType } from '../../db/post-db-type';
import type { BlogInputModel, BlogViewModel, PostViewModel } from '../../types/blogs.types';

export const blogsRepository = {
  async createBlog(newBlog: BlogDbType): Promise<ObjectId> {
    const res = await blogsCollection.insertOne(newBlog);
    return res.insertedId;
  },
  async createPost(newPost: PostDbType): Promise<ObjectId> {
    const res = await postsCollection.insertOne(newPost);
    const customId = res.insertedId.toString();
    await postsCollection.updateOne({ _id: res.insertedId }, { $set: { id: customId } });
    return res.insertedId;
  },
  async deleteBlog(id: string) {
    const res = await blogsCollection.deleteOne({ id });
    return res.deletedCount === 1;
  },
  async updateBlog(body: BlogInputModel, id: string) {
    const res = await blogsCollection.updateOne({ id }, { $set: body });
    return res.matchedCount === 1;
  },
  async findBlogByObjectIdAndMap(id: ObjectId) {
    if (!this._checkObjectId(id.toString())) return null;
    const res = await blogsCollection.findOne({ _id: id });
    if (!res) return null;
    return this._map(res);
  },
  async findAndMapPostById(id: ObjectId): Promise<PostViewModel> {
    const post = await postsCollection.findOne({ _id: id });
    return this._mapPost(post!);
  },
  async findBlogAndMap(id: string) {
    const blog = await blogsCollection.findOne({ id });
    return this._map(blog!);
  },
  async checkExistById(id: string): Promise<boolean> {
    if (!this._checkObjectId(id)) return false;
    const blog = await blogsCollection.findOne({ id });
    return !!blog;
  },
  _map(blog: WithId<BlogDbType>) {
    console.log(blog, 'blog');
    const blogForOutput: BlogViewModel = {
      id: blog._id?.toString(),
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      name: blog.name,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    };
    return blogForOutput;
  },
  _mapPost(post: WithId<PostDbType>) {
    const postForOutput: PostViewModel = {
      id: post._id?.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      createdAt: post.createdAt,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
    };
    return postForOutput;
  },
  _checkObjectId(id: string): boolean {
    return ObjectId.isValid(id);
  },
};
