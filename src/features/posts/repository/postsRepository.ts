import { ObjectId } from "mongodb";

import { postCollection } from "../../../db/mongoDb";

import {
  PostInputModel,
  PostsFilters,
  PostViewModel,
} from "../../../input-output-types/posts-types";
import { PostDbType } from "../../../db/post-db-type";
import { Direction } from "../../../constants/pagination.constants";

export const postsRepository = {
  async createPost(newPost: PostDbType) {
    const res = await postCollection.insertOne(newPost);
    const customId = res.insertedId.toString();
    await postCollection.updateOne(
      { _id: res.insertedId },
      { $set: { id: customId } },
    );
    return res.insertedId;
  },
  async getPostById(id: string) {
    return await postCollection.findOne({ id });
  },
  async findAndMap(id: string) {
    const post = await this.getPostById(id)!; // ! используем этот метод если проверили существование
    return this.map(post as PostDbType);
  },
  async getPostByUUID(id: ObjectId) {
    return (await postCollection.findOne(
      { _id: id },
      { projection: { _id: 0 } },
    )) as PostDbType;
  },
  async getAllPosts(filters: PostsFilters) {
    const { pageSize, sortBy, sortDirection, pageNumber } = filters;
    const currentFilters: any = {};

    const skip = (pageNumber - 1) * pageSize;

    const res = await postCollection
      .find(currentFilters, { projection: { _id: 0 } })
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === Direction.Asc ? 1 : -1 })
      .toArray();
    return res.map((blog) => this.map(blog));
  },
  async deletePost(id: string) {
    const res = await postCollection.deleteOne({ id });
    return res.deletedCount === 1;
  },
  async updatePost(body: PostInputModel, id: string) {
    const res = await postCollection.updateOne({ id }, { $set: { ...body } });

    return res.matchedCount === 1 && res.modifiedCount === 1;
  },
  async getTotalPostsCount() {
    return postCollection.countDocuments();
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
