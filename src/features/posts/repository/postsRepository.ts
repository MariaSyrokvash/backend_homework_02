import { type ObjectId } from 'mongodb';
import { type PostDbType } from '../../../db/post-db-type';
import { postsCollection } from '../../../db/mongoDb';

import { Direction } from '../../../constants/pagination.constants';
import { type PostInputModel, type PostsFilters } from '../../../types/posts.types';
import { type PostViewModel } from '../../../types/blogs.types';

export const postsRepository = {
  async createPost(newPost: PostDbType) {
    const res = await postsCollection.insertOne(newPost);
    const customId = res.insertedId.toString();
    await postsCollection.updateOne({ _id: res.insertedId }, { $set: { id: customId } });
    return res.insertedId;
  },
  async getPostById(id: string) {
    return await postsCollection.findOne({ id });
  },
  async findAndMap(id: string) {
    const post = await this.getPostById(id); // ! используем этот метод если проверили существование
    return this.map(post as PostDbType);
  },
  async getPostByUUID(id: ObjectId) {
    return (await postsCollection.findOne({ _id: id }, { projection: { _id: 0 } })) as PostDbType;
  },
  async getAllPosts(filters: PostsFilters) {
    const { pageSize, sortBy, sortDirection, pageNumber } = filters;
    const currentFilters: any = {};

    const skip = (pageNumber - 1) * pageSize;

    const res = await postsCollection
      .find(currentFilters, { projection: { _id: 0 } })
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === Direction.Asc ? 1 : -1 })
      .toArray();
    return res.map((blog) => this.map(blog));
  },
  async deletePost(id: string) {
    const res = await postsCollection.deleteOne({ id });
    return res.deletedCount === 1;
  },
  async updatePost(body: PostInputModel, id: string) {
    const res = await postsCollection.updateOne({ id }, { $set: { ...body } });

    return res.matchedCount === 1 && res.modifiedCount === 1;
  },
  async getTotalPostsCount() {
    return await postsCollection.countDocuments();
  },
  map(post: PostDbType) {
    const postForOutput: PostViewModel = {
      id: post.id,
      title: post.title,
      shortDescription: post.shortDescription,
      createdAt: post.createdAt,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
    };
    return postForOutput;
  },
};
