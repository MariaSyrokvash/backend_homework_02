import { usersRepository } from './users.repository';
import { bcryptService } from '../../adapters/bcrypt.service';
import { type UserInputModel } from '../../types/users.types';

export const usersService = {
  async createUser({ login, password, email }: UserInputModel): Promise<string | null> {
    const userByLogin = await usersRepository.findByLoginOrEmail(login);
    const userByEmail = await usersRepository.findByLoginOrEmail(email);

    if (userByLogin || userByEmail) {
      return null;
    }

    const passwordHash = await bcryptService.generateHash(password);
    const newUser = {
      login,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    return await usersRepository.create(newUser);
  },
  async deleteUserById(id: string): Promise<boolean> {
    const user = await usersRepository.findUserById(id);
    if (!user) return false;
    return await usersRepository.delete(id);
  },
};
