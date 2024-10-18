import {Response, Request} from 'express'

import {blogsRepository} from '../blogsRepository'

import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

import {BlogInputModel, BlogViewModel} from '../../../input-output-types/blogs-types'

export const createBlogController = (req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) => {
    const newBlogId = blogsRepository.create(req.body)
    const newBlog = blogsRepository.findAndMap(newBlogId)

    res
        .status(HttpStatuses.Created201)
        .json(newBlog)
}
