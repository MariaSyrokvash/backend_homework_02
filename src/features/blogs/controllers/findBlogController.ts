import {Request, Response} from 'express'

import {blogsRepository} from '../blogsRepository'

import {BlogViewModel} from '../../../input-output-types/blogs-types'

import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const getBlogController = (req: Request<{id: string}>, res: Response<BlogViewModel>) => {
    const blog = blogsRepository.findAndMap(req.params.id);
    res.status(HttpStatuses.Ok200).json(blog)
}
