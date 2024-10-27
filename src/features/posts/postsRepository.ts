import {ObjectId} from "mongodb";

import {postCollection} from "../../db/mongoDb";
import {blogsRepository} from '../blogs/blogsRepository'

import {PostInputModel, PostViewModel} from '../../input-output-types/posts-types'
import {PostDbType} from '../../db/post-db-type'


export const postsRepository = {
    async createPost(post: PostInputModel) {
        const blog = await blogsRepository.getBlogById(post.blogId);

        const newPost = {
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        } as PostDbType

        const res = await postCollection.insertOne(newPost);
        const customId = res.insertedId.toString();
        await postCollection.updateOne({ _id: res.insertedId }, { $set: { id: customId } });

        return res.insertedId;
    },
    async getPostById(id: string) {
        return await postCollection.findOne({ id })
    },
    async findAndMap(id: string) {
        const post = await this.getPostById(id)! // ! используем этот метод если проверили существование
        return this.map(post as PostDbType)
    },
    async getPostByUUID(id: ObjectId){
        return await postCollection.findOne({_id: id }, { projection: { _id: 0 }}) as PostDbType
    },
    async getAllPosts() {
        const res = await postCollection.find({}, { projection: { _id: 0 }}).toArray();
        return  res.map(blog => this.map(blog))
    },
    async deletePost(id: string) {
        const res = await postCollection.deleteOne({ id })
        return res.deletedCount === 1;
    },
    async updatePost(body: PostInputModel, id: string) {
        const blog = await blogsRepository.getBlogById(body.blogId)
        const res = await postCollection.updateOne(
          { id },
          {$set: { ...body, blogName: blog.name }}
        );

        return res.matchedCount === 1 && res.modifiedCount === 1;
    },
    map(post: PostDbType) {
        const postForOutput: PostViewModel = {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            createdAt: post.createdAt,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
        }
        return postForOutput
    },
}
