import {Request, Response} from 'express'
import {PostViewModel} from '../../../input-output-types/posts-types'
import {postsRepository} from '../postsRepository'
import {blogsRepository} from "../../blogs/blogsRepository";
import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const getPostController = (req: Request<{id: string}>, res: Response<PostViewModel | {}>) => {
    const post = postsRepository.findAndMap(req.params.id);
    res.status(HttpStatuses.Ok200).json(post)
}
