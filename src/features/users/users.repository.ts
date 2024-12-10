import { ObjectId, type WithId } from 'mongodb';
import { type UserDbType } from '../../db/user-db-type';
import { usersCollection } from '../../db/mongoDb';
import { isValidObjectId } from '../../utils/common.utils';

export const usersRepository = {
  async delete(id: string): Promise<boolean> {
    if (!isValidObjectId(id)) return false;
    const isDel = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    return isDel.deletedCount === 1;
  },
  async findUserById(id: string) {
    if (!isValidObjectId(id)) return null;
    return await usersCollection.findOne({ _id: new ObjectId(id) });
  },
  async create(user: UserDbType): Promise<string> {
    const newUser = await usersCollection.insertOne({ ...user });
    return newUser.insertedId.toString();
  },
  async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<UserDbType> | null> {
    return await usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
  },
};
