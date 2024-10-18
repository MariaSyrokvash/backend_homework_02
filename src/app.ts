import express from 'express'
import cors from 'cors'
import {CONFIG} from "./config";

import {blogsRouter} from "./features/blogs";
import {postsRouter} from "./features/posts";
import {testingRouter} from "./features/testing";


export const app = express() // создать приложение

app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})

app.use(CONFIG.PATH.BLOGS, blogsRouter)
app.use(CONFIG.PATH.POSTS, postsRouter)
app.use(CONFIG.PATH.TESTING, testingRouter)
