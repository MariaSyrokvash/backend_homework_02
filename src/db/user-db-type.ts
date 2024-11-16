import { type ObjectId } from 'mongodb';

export interface UserDbType {
  _id: ObjectId;
  id: string;
  login: string;
  email: string;
  createdAt: string;
  passwordHash: string;
}
