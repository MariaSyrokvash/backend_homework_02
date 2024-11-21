import { type WithId } from 'mongodb';
import { usersRepository } from '../../users/repositories/usersRepository';
import { type UserDbType } from '../../../db/user-db-type';
import { bcryptService } from '../../../adapters/bcrypt.service';

export const authService = {
  async loginUser(loginOrEmail: string, password: string): Promise<WithId<UserDbType> | null> {
    return await this.checkUserCredentials(loginOrEmail, password);
  },

  async checkUserCredentials(loginOrEmail: string, password: string): Promise<WithId<UserDbType> | null> {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user) return null;

    const isPassCorrect = await bcryptService.checkPassword(password, user.passwordHash);
    if (!isPassCorrect) return null;

    return user;
  },
};
