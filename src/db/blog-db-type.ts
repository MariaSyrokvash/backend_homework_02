import { type ObjectId } from 'mongodb';

export interface BlogDbType {
  _id: ObjectId;
  id: string;
  name: string; // max 15
  description: string; // max 500
  websiteUrl: string; // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
  isMembership: boolean;
  createdAt: string;
}
