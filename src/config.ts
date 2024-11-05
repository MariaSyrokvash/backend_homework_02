import { config } from "dotenv";
config(); // добавление переменных из файла ..env в process..env

export const CONFIG = {
  PORT: process.env.PORT || 3003,
  MONGO_URL: process.env.MONGO_URL || "",
  DB_NAME: process.env.DB_NAME || "",
  PATH: {
    BLOGS: "/blogs",
    POSTS: "/posts",
    TESTING: "/testing/all-data",
  },
  ADMIN: process.env.ADMIN || "admin:qwerty",
};
