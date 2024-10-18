import {Request, Response} from 'express'

import {postsRepository} from '../postsRepository'

import {PostInputModel} from '../../../input-output-types/posts-types'

import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const putPostController = (req: Request<{id: string}, any, PostInputModel>, res: Response) => {
    const postId = req.params.id;
    const body = req.body;

    const isUpdated = postsRepository.updatePost(body, postId)

    isUpdated
        ? res.sendStatus(HttpStatuses.NoContent204)
        : res.sendStatus(HttpStatuses.NotFound404);
}
