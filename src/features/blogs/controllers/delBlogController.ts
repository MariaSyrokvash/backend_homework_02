import {Request, Response} from 'express'
import {blogsRepository} from '../blogsRepository'
import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const delBlogController = async(req: Request<{id: string}>, res: Response) => {
    const blogId = req.params.id;

    const isDeleted = await blogsRepository.deleteBlog(blogId);

    isDeleted
        ?  res.sendStatus(HttpStatuses.NoContent204)
        : res.sendStatus(HttpStatuses.NotFound404);

}
