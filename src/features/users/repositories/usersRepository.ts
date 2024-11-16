import { type Filter, ObjectId, type WithId } from 'mongodb';
import { type UsersFilters, type UserViewModel } from '../../../input-output-types/users-types';
import { type UserDbType } from '../../../db/user-db-type';
import { Direction } from '../../../constants/pagination.constants';
import { usersCollection } from '../../../db/mongoDb';

export const usersRepository = {
  async getAll(filters: UsersFilters) {
    const { searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection } = filters;
    const currentFilters: Filter<UserDbType> = {};

    if (typeof searchLoginTerm === 'string' && searchLoginTerm.trim()) {
      currentFilters.login = { $regex: searchLoginTerm, $options: 'i' };
    }

    if (typeof searchEmailTerm === 'string' && searchEmailTerm.trim()) {
      currentFilters.email = { $regex: searchEmailTerm, $options: 'i' };
    }

    const skip = (pageNumber - 1) * pageSize;
    const sortDirectionFlag = sortDirection === Direction.Asc ? 1 : -1;

    const res = await usersCollection
      .find(currentFilters, { projection: { _id: 0 } })
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirectionFlag })
      .toArray();

    return res.map((user) => this.map(user));
  },
  async getTotalBlogsCount({ searchLoginTerm, searchEmailTerm }: { searchLoginTerm: string | null; searchEmailTerm: string | null }) {
    const currentFilters: Filter<UserDbType> = {};

    if (typeof searchLoginTerm === 'string' && searchLoginTerm.trim()) {
      currentFilters.login = { $regex: searchLoginTerm, $options: 'i' };
    }

    if (typeof searchEmailTerm === 'string' && searchEmailTerm.trim()) {
      currentFilters.email = { $regex: searchEmailTerm, $options: 'i' };
    }

    return await usersCollection.countDocuments(currentFilters);
  },
  map(user: UserDbType) {
    const userForOutput: UserViewModel = {
      id: user.id,
      email: user.email,
      login: user.login,
      createdAt: user.createdAt,
    };
    return userForOutput;
  },
  async delete(id: string): Promise<boolean> {
    if (!this._checkObjectId(id)) return false;
    const isDel = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    return isDel.deletedCount === 1;
  },
  async findById(id: string): Promise<WithId<UserDbType> | null> {
    if (!this._checkObjectId(id)) return null;
    return await usersCollection.findOne({ _id: new ObjectId(id) });
  },
  async create(user: UserDbType): Promise<string> {
    const newUser = await usersCollection.insertOne({ ...user });
    return newUser.insertedId.toString();
  },
  _checkObjectId(id: string): boolean {
    return ObjectId.isValid(id);
  },
  async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<UserDbType> | null> {
    return await usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
  },
};
