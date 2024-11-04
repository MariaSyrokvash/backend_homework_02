import {Request, Response} from 'express'
import {blogsRepository} from '../blogsRepository'
import {HttpStatuses} from "../../../constants/httpStatusCode.constants";
import {PostViewModel} from "../../../input-output-types/posts-types";

export const getPostsInBlogController = async (req: Request<{id: string}>, res: Response<PostViewModel[]>) => {
    const blogId = req.params.id;
    const blogs = await blogsRepository.getAllPostByBlogId(blogId);
    res.status(HttpStatuses.Ok200).json(blogs)
}
