import { type Collection, MongoClient } from 'mongodb';

import { config } from 'dotenv';
import { CONFIG } from '../config';
import { type PostDbType } from './post-db-type';
import { type BlogDbType } from './blog-db-type';
import { type UserDbType } from './user-db-type';

config(); // чтобы видны .env переменные

const client = new MongoClient(CONFIG.MONGO_URL);

const db = client.db(CONFIG.DB_NAME);

export const blogsCollection: Collection<BlogDbType> = db.collection(CONFIG.PATH.BLOGS);
export const postsCollection: Collection<PostDbType> = db.collection(CONFIG.PATH.POSTS);
export const usersCollection: Collection<UserDbType> = db.collection(CONFIG.PATH.USERS);

export const connectToDB = async (): Promise<boolean> => {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('You successfully connected to MongoDB!');

    return true;
  } catch (e) {
    console.log(e, 'e connectToDB');
    await client.close();
    return false;
  }
};
