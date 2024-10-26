import {Request, Response} from 'express'
import {BlogViewModel} from '../../../input-output-types/blogs-types'
import {blogsRepository} from '../blogsRepository'
import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const getBlogsController = async (_: Request, res: Response<BlogViewModel[]>) => {
    const blogs = await blogsRepository.getAll();
    res.status(HttpStatuses.Ok200).json(blogs)
}
