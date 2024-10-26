import {Response, Request} from 'express'

import {postsRepository} from '../postsRepository'

import {PostInputModel, PostViewModel} from '../../../input-output-types/posts-types'

import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

export const createPostController = async(req: Request<any, any, PostInputModel>, res: Response<PostViewModel>) => {
    const newPostId = await postsRepository.createPost(req.body)
    const newPost =  await postsRepository.getPostByUUID(newPostId)

    res.status(HttpStatuses.Created201).json(newPost)
}
