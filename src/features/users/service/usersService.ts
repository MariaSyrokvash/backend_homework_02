import { type UserInputModel, type UsersDto, type UsersFilters } from '../../../input-output-types/users-types';
import { usersRepository } from '../repositories/usersRepository';
import { bcryptService } from '../../../common/adapters/bcrypt.service';
import { type UserDbType } from '../../../db/user-db-type';

export const usersService = {
  async getAll(filters: UsersFilters): Promise<UsersDto> {
    const { pageSize, pageNumber, searchLoginTerm, searchEmailTerm } = filters;

    const blogs = await usersRepository.getAll(filters);
    const totalCount = await usersRepository.getTotalUsersCount({
      searchLoginTerm,
      searchEmailTerm,
    });

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: blogs,
    };
  },

  async createUser(dto: UserInputModel): Promise<string> {
    const { login, password, email } = dto;
    const passwordHash = await bcryptService.generateHash(password);

    const newUser = {
      login,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    } as UserDbType;

    return await usersRepository.create(newUser);
  },
  async deleteUserById(id: string): Promise<boolean> {
    const user = await usersRepository.findById(id);
    if (!user) return false;
    return await usersRepository.delete(id);
  },
};
