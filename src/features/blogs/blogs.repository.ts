import { ObjectId } from 'mongodb';
import { blogsCollection } from '../../db/mongoDb';

import type { BlogDbType } from '../../db/blog-db-type';
import type { BlogInputModel } from '../../types/blogs.types';

import { isValidObjectId } from '../../utils/common.utils';

export const blogsRepository = {
  async findBlogById(id: string) {
    if (!isValidObjectId(id)) return null;
    return await blogsCollection.findOne({ _id: new ObjectId(id) });
  },
  async createBlog(newBlog: BlogDbType): Promise<string> {
    const res = await blogsCollection.insertOne(newBlog);
    return res.insertedId.toString();
  },
  async deleteBlog(id: string) {
    if (!isValidObjectId(id)) return false;
    const res = await blogsCollection.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount === 1;
  },
  async updateBlog(body: BlogInputModel, id: string) {
    if (!isValidObjectId(id)) return false;
    const res = await blogsCollection.updateOne({ _id: new ObjectId(id) }, { $set: body });
    return res.matchedCount === 1;
  },
  async checkExistById(id: string): Promise<boolean> {
    if (!isValidObjectId(id)) return false;
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    return !!blog;
  },
};
