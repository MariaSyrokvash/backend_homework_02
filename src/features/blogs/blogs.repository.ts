import { ObjectId } from 'mongodb';
import { blogsCollection } from '../../db/mongoDb';

import type { BlogDbType } from '../../db/blog-db-type';
import type { BlogInputModel } from '../../types/blogs.types';

export const blogsRepository = {
  async findBlogById(id: string) {
    if (!this._checkObjectId(id)) return null;
    return await blogsCollection.findOne({ _id: new ObjectId(id) });
  },
  async createBlog(newBlog: BlogDbType): Promise<string> {
    const res = await blogsCollection.insertOne(newBlog);
    return res.insertedId.toString();
  },
  async deleteBlog(id: string) {
    const res = await blogsCollection.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount === 1;
  },
  async updateBlog(body: BlogInputModel, id: string) {
    const res = await blogsCollection.updateOne({ _id: new ObjectId(id) }, { $set: body });
    return res.matchedCount === 1;
  },
  async checkExistById(id: string): Promise<boolean> {
    if (!this._checkObjectId(id)) return false;
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    return !!blog;
  },
  _checkObjectId(id: string): boolean {
    return ObjectId.isValid(id);
  },
};
