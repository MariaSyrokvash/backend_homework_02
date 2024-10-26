import {Request, Response} from 'express'

import {postsRepository} from '../postsRepository'

import {HttpStatuses} from "../../../constants/httpStatusCode.constants";

import {PostViewModel} from '../../../input-output-types/posts-types'

export const getPostsController = async(_: Request, res: Response<PostViewModel[]>) => {
    const posts = await postsRepository.getAllPosts();
    res.status(HttpStatuses.Ok200).json(posts)
}
