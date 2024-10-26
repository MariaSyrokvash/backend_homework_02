import {Collection, MongoClient} from "mongodb";

import {config} from 'dotenv'

import {CONFIG} from "../config";

import {BlogDbType} from "./blog-db-type";
import {PostDbType} from "./post-db-type";

config(); // чтобы видны .env переменные

const client = new MongoClient(CONFIG.MONGO_URL)

const db = client.db(CONFIG.DB_NAME);

export const blogCollection: Collection<BlogDbType> = db.collection(CONFIG.PATH.BLOGS);
export const postCollection: Collection<PostDbType> = db.collection(CONFIG.PATH.POSTS);

export const connectToDB = async (): Promise<boolean> => {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");

    return true;
  } catch (e) {
    console.log(e, 'e');
    await client.close();
    return false;
  }
}

