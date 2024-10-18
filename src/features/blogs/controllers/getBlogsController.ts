import {Request, Response} from 'express'
import {BlogViewModel} from '../../../input-output-types/blogs-types'
import {blogsRepository} from '../blogsRepository'
import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const getBlogsController = (req: Request, res: Response<BlogViewModel[]>) => {
    const blogs = blogsRepository.getAll();
    res.status(HttpStatuses.Ok200).json(blogs)
}
