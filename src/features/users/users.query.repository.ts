import { type Filter, ObjectId, type WithId } from 'mongodb';
import type { UsersFilters, UsersViewModel, UserViewModel } from '../../types/users.types';
import type { UserDbType } from '../../db/user-db-type';
import { Direction } from '../../constants/pagination.constants';
import { usersCollection } from '../../db/mongoDb';
import { isValidObjectId } from '../../utils/common.utils';

export const usersQueryRepository = {
  async getAllUsers(filters: UsersFilters): Promise<UsersViewModel> {
    const { searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection } = filters;
    const skip = (pageNumber - 1) * pageSize;
    const sortDirectionFlag = sortDirection === Direction.Asc ? 1 : -1;
    const currentFilters = this._buildSearchFilters(searchLoginTerm, searchEmailTerm);

    const totalCount = await usersCollection.countDocuments(currentFilters);
    const users = await usersCollection
      .find(currentFilters)
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirectionFlag })
      .toArray();

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: this._mapUsers(users),
    };
  },
  async getUserById(id: string): Promise<UserViewModel | null> {
    if (!isValidObjectId(id)) return null;
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!user) return null;
    return this._mapUser(user);
  },
  _mapUser(user: WithId<UserDbType>) {
    const userForOutput: UserViewModel = {
      id: user._id.toString(),
      email: user.email,
      login: user.login,
      createdAt: user.createdAt,
    };
    return userForOutput;
  },
  _mapUsers(users: Array<WithId<UserDbType>>) {
    return users.map((user) => this._mapUser(user));
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
