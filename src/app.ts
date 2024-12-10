import express from 'express';
import cors from 'cors';
import { CONFIG } from './config';
import { blogsRouter } from './features/blogs/blogs.router';
import { usersRouter } from './features/users';
import { authRouter } from './features/auth';
import { postsRouter } from './features/posts/posts.router';
import { testingRouter } from './features/testing';

import { HttpStatuses } from './constants/httpStatusCode.constants';

export const app = express(); // создать приложение

app.use(express.json()); // создание свойств-объектов body и query во всех реквестах
app.use(cors()); // разрешить любым фронтам делать запросы на наш бэк

app.get('/', (req, res) => {
  res.status(HttpStatuses.Ok200).json({ version: '5.0' });
});

app.use(CONFIG.PATH.AUTH.LOGIN, authRouter);
app.use(CONFIG.PATH.BLOGS, blogsRouter);
app.use(CONFIG.PATH.POSTS, postsRouter);
app.use(CONFIG.PATH.USERS, usersRouter);
app.use(CONFIG.PATH.TESTING, testingRouter);
