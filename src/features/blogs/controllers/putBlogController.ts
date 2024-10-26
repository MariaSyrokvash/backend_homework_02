import {Request, Response} from 'express'

import {blogsRepository} from '../blogsRepository'

import {BlogInputModel} from '../../../input-output-types/blogs-types'

import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const putBlogController = async (req: Request<{id: string}, any, BlogInputModel>, res: Response) => {
   const blogId = req.params.id;
   const body = req.body;
   const isUpdated = await blogsRepository.updateBlog(body, blogId)

    isUpdated
        ? res.sendStatus(HttpStatuses.NoContent204)
        : res.sendStatus(HttpStatuses.NotFound404);
}

