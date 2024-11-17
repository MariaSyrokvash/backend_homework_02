import { type Filter, ObjectId, type WithId } from 'mongodb';
import { type UsersFilters, type UserViewModel } from '../../../input-output-types/users-types';
import { type UserDbType } from '../../../db/user-db-type';
import { Direction } from '../../../constants/pagination.constants';
import { usersCollection } from '../../../db/mongoDb';

export const usersRepository = {
  async getAll(filters: UsersFilters) {
    const { searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection } = filters;

    const currentFilters = this._buildSearchFilters(searchLoginTerm, searchEmailTerm);
    const skip = (pageNumber - 1) * pageSize;
    const sortDirectionFlag = sortDirection === Direction.Asc ? 1 : -1;

    const res = await usersCollection
      .find(currentFilters)
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirectionFlag })
      .toArray();

    return res.map((user) => this.map(user));
  },
  async getTotalUsersCount({ searchLoginTerm, searchEmailTerm }: { searchLoginTerm: string | null; searchEmailTerm: string | null }) {
    const currentFilters = this._buildSearchFilters(searchLoginTerm, searchEmailTerm);

    return await usersCollection.countDocuments(currentFilters);
  },
  map(user: UserDbType) {
    const userForOutput: UserViewModel = {
      id: user._id.toString(),
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
  async findById(id: string): Promise<UserViewModel | null> {
    if (!this._checkObjectId(id)) return null;

    const newUser = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!newUser) return null;

    return this.map(newUser);
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
  _buildSearchFilters(searchLoginTerm: string | null, searchEmailTerm: string | null) {
    const filters: Filter<UserDbType> = {};

    // Only create $or if at least one search term is provided
    const orConditions: Array<Filter<UserDbType>> = [];

    if (searchLoginTerm?.trim()) {
      orConditions.push({ login: { $regex: searchLoginTerm, $options: 'i' } });
    }

    if (searchEmailTerm?.trim()) {
      orConditions.push({ email: { $regex: searchEmailTerm, $options: 'i' } });
    }

    // If any conditions were added, set $or filter
    if (orConditions.length > 0) {
      filters.$or = orConditions;
    }

    return filters;
  },
};
