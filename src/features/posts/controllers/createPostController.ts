import {Response, Request} from 'express'

import {postsRepository} from '../postsRepository'

import {PostInputModel, PostViewModel} from '../../../input-output-types/posts-types'

import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const createPostController = (req: Request<any, any, PostInputModel>, res: Response<PostViewModel>) => {
    const newPostId = postsRepository.create(req.body)
    const newPost = postsRepository.findAndMap(newPostId)

    res.status(HttpStatuses.Created201).json(newPost)
}
