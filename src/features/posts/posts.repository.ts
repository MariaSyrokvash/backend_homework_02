import { ObjectId } from 'mongodb';
import { postsCollection } from '../../db/mongoDb';
import { type PostDbType } from '../../db/post-db-type';
import { type PostInputModel } from '../../types/posts.types';
import { isValidObjectId } from '../../utils/common.utils';

export const postsRepository = {
  async getPostById(id: string) {
    if (!isValidObjectId(id)) return null;
    return await postsCollection.findOne({ _id: new ObjectId(id) });
  },
  async createPost(newPost: PostDbType) {
    const res = await postsCollection.insertOne(newPost);
    return res.insertedId.toString();
  },
  async updatePost(body: PostInputModel, id: string) {
    if (!isValidObjectId(id)) return false;
    const res = await postsCollection.updateOne({ _id: new ObjectId(id) }, { $set: { ...body } });
    return res.matchedCount === 1 && res.modifiedCount === 1;
  },
  async deletePost(id: string) {
    if (!isValidObjectId(id)) return false;
    const res = await postsCollection.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount === 1;
  },
  async checkExistById(id: string): Promise<boolean> {
    if (!isValidObjectId(id)) return false;
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });
    return !!post;
  },
};
