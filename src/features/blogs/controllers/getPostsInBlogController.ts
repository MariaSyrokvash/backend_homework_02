import {Request, Response} from 'express'
import {HttpStatuses} from "../../../constants/httpStatusCode.constants";
import {PostViewModel} from "../../../input-output-types/posts-types";
import { blogsService } from '../service/blogsService';

export const getPostsInBlogController = async (req: Request<{id: string}>, res: Response<PostViewModel[]>) => {
    const blogId = req.params.id;
    const blogs = await blogsService.getAllPostByBlogId(blogId);
    res.status(HttpStatuses.Ok200).json(blogs)
}
