import { ObjectId } from "mongodb";

import { blogCollection, postCollection } from "../../../db/mongoDb";
import { postsRepository } from "../../posts/repository/postsRepository";

import { BlogDbType } from "../../../db/blog-db-type";
import { PostDbType } from "../../../db/post-db-type";
import {
  BlogInputModel,
  BlogsFilters,
  BlogViewModel,
  PostsBlogFilters,
} from "../../../input-output-types/blogs-types";
import { Direction } from "../../../constants/pagination.constants";

export const blogsRepository = {
  async createBlog(newBlog: BlogDbType): Promise<ObjectId> {
    const res = await blogCollection.insertOne(newBlog);
    const customId = res.insertedId.toString();
    await blogCollection.updateOne(
      { _id: res.insertedId },
      { $set: { id: customId } },
    );
    return res.insertedId;
  },
  async createPost(newPost: PostDbType): Promise<ObjectId> {
    const res = await postCollection.insertOne(newPost);
    const customId = res.insertedId.toString();
    await postCollection.updateOne(
      { _id: res.insertedId },
      { $set: { id: customId } },
    );
    return res.insertedId;
  },
  async getBlogByUUID(id: ObjectId) {
    const res = await blogCollection.findOne(
      { _id: id },
      { projection: { _id: 0 } },
    );
    if (res) {
      return this.map(res);
    }
    return undefined;
  },

  async getBlogById(id: string): Promise<BlogDbType> {
    return (await blogCollection.findOne(
      { id },
      { projection: { _id: 0 } },
    )) as BlogDbType;
  },
  async findAndMap(id: string) {
    const blog = await this.getBlogById(id); // ! используем этот метод если проверили существование
    return this.map(blog);
  },
  async getAll(filters: BlogsFilters) {
    const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } =
      filters;
    const currentFilters: any = {};

    if (searchNameTerm) {
      currentFilters.name = { $regex: searchNameTerm, $options: "i" };
    }

    const skip = (pageNumber - 1) * pageSize;

    const res = await blogCollection
      .find(currentFilters, { projection: { _id: 0 } })
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === Direction.Asc ? 1 : -1 })
      .toArray();
    return res.map((blog) => this.map(blog));
  },
  async getAllPostByBlogId(blogId: string, filters: PostsBlogFilters) {
    const { pageSize, pageNumber, sortBy, sortDirection } = filters;
    const currentFilters: any = {};

    const skip = (pageNumber - 1) * pageSize;

    const posts = await postCollection
      .find({ blogId, ...currentFilters }, { projection: { _id: 0 } })
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === Direction.Asc ? 1 : -1 })
      .toArray();
    return posts.map((blog) => postsRepository.map(blog));
  },
  async deleteBlog(id: string) {
    const res = await blogCollection.deleteOne({ id });
    return res.deletedCount === 1;
  },
  async updateBlog(body: BlogInputModel, id: string) {
    const res = await blogCollection.updateOne({ id }, { $set: body });
    return res.matchedCount === 1;
  },
  async getTotalBlogsCount(searchNameTerm: string | null) {
    const currentFilters: any = {};

    if (searchNameTerm) {
      currentFilters.name = { $regex: searchNameTerm, $options: "i" };
    }

    return blogCollection.countDocuments(currentFilters);
  },
  async getTotalPostsCountByBlogId(blogId: string) {
    return postCollection.countDocuments({ blogId });
  },
  map(blog: BlogDbType) {
    const blogForOutput: BlogViewModel = {
      id: blog.id,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      name: blog.name,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    };
    return blogForOutput;
  },
};
