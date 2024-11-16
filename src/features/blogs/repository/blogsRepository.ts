import { type ObjectId } from 'mongodb';
import { type BlogDbType } from '../../../db/blog-db-type';
import { blogsCollection, postsCollection } from '../../../db/mongoDb';
import { type PostDbType } from '../../../db/post-db-type';
import { type BlogInputModel, type BlogsFilters, type BlogViewModel, type PostsBlogFilters } from '../../../input-output-types/blogs-types';
import { Direction } from '../../../constants/pagination.constants';
import { postsRepository } from '../../posts/repository/postsRepository';

export const blogsRepository = {
  async createBlog(newBlog: BlogDbType): Promise<ObjectId> {
    const res = await blogsCollection.insertOne(newBlog);
    const customId = res.insertedId.toString();
    await blogsCollection.updateOne({ _id: res.insertedId }, { $set: { id: customId } });
    return res.insertedId;
  },
  async createPost(newPost: PostDbType): Promise<ObjectId> {
    const res = await postsCollection.insertOne(newPost);
    const customId = res.insertedId.toString();
    await postsCollection.updateOne({ _id: res.insertedId }, { $set: { id: customId } });
    return res.insertedId;
  },
  async getBlogByUUID(id: ObjectId) {
    const res = await blogsCollection.findOne({ _id: id }, { projection: { _id: 0 } });
    if (res) {
      return this.map(res);
    }
    return undefined;
  },

  async getBlogById(id: string): Promise<BlogDbType> {
    return (await blogsCollection.findOne({ id }, { projection: { _id: 0 } })) as BlogDbType;
  },
  async findAndMap(id: string) {
    const blog = await this.getBlogById(id); // ! используем этот метод если проверили существование
    return this.map(blog);
  },
  async getAll(filters: BlogsFilters) {
    const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = filters;
    const currentFilters: any = {};

    if (searchNameTerm) {
      currentFilters.name = { $regex: searchNameTerm, $options: 'i' };
    }

    const skip = (pageNumber - 1) * pageSize;

    const res = await blogsCollection
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

    const posts = await postsCollection
      .find({ blogId, ...currentFilters }, { projection: { _id: 0 } })
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === Direction.Asc ? 1 : -1 })
      .toArray();
    return posts.map((blog) => postsRepository.map(blog));
  },
  async deleteBlog(id: string) {
    const res = await blogsCollection.deleteOne({ id });
    return res.deletedCount === 1;
  },
  async updateBlog(body: BlogInputModel, id: string) {
    const res = await blogsCollection.updateOne({ id }, { $set: body });
    return res.matchedCount === 1;
  },
  async getTotalBlogsCount(searchNameTerm: string | null) {
    const currentFilters: any = {};

    if (searchNameTerm) {
      currentFilters.name = { $regex: searchNameTerm, $options: 'i' };
    }

    return await blogsCollection.countDocuments(currentFilters);
  },
  async getTotalPostsCountByBlogId(blogId: string) {
    return await postsCollection.countDocuments({ blogId });
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
