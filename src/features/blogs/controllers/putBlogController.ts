import {Request, Response} from 'express'

import { blogsService } from '../service/blogsService';

import {BlogInputModel} from '../../../input-output-types/blogs-types'

import {HttpStatuses} from "../../../constants/httpStatusCode.constants";


export const putBlogController = async (req: Request<{id: string}, any, BlogInputModel>, res: Response) => {
   const blogId = req.params.id;
   const body = req.body;
   const isUpdated = await blogsService.updateBlog(body, blogId)

    isUpdated
        ? res.sendStatus(HttpStatuses.NoContent204)
        : res.sendStatus(HttpStatuses.NotFound404);
}

