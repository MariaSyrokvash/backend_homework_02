import {Request, Response} from 'express'
import {postsRepository} from '../postsRepository'
import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const delPostController = (req: Request<{id: string}>, res: Response) => {
    const postId = req.params.id;

    const isDeleted = postsRepository.deletePost(postId);

    isDeleted
        ?  res.sendStatus(HttpStatuses.NoContent204)
        : res.sendStatus(HttpStatuses.NotFound404);
}
