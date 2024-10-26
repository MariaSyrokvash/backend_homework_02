import {Response, Request} from 'express'

import {blogsRepository} from '../blogsRepository'

import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

import {BlogInputModel, BlogViewModel} from '../../../input-output-types/blogs-types'

export const createBlogController = async (req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) => {
    const newBlogId = await blogsRepository.createBlog(req.body)
    const newBlog = await blogsRepository.getBlogByUUID(newBlogId)

    res.status(HttpStatuses.Created201).json(newBlog)
}
