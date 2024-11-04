import { Request, Response } from 'express';

import { postsService } from '../service/postsRepository';

import { HttpStatuses } from '../../../constants/httpStatusCode.constants';

import { PostsDto } from '../../../input-output-types/posts-types';

import { getPostsQueries } from '../helpers';


export const getPostsController = async(req: Request, res: Response<PostsDto>) => {
    const postsFilters = getPostsQueries(req);
    const posts = await postsService.getAllPosts(postsFilters);
    res.status(HttpStatuses.Ok200).json(posts)
}
