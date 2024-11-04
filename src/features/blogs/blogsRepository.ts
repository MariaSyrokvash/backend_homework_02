import {ObjectId} from "mongodb";

import {blogCollection, postCollection} from "../../db/mongoDb";
import {postsRepository} from "../posts/postsRepository";

import {BlogDbType} from '../../db/blog-db-type'
import {PostDbType} from "../../db/post-db-type";
import {BlogInputModel, BlogPostInputModel, BlogViewModel} from '../../input-output-types/blogs-types'

export const blogsRepository = {
    async createBlog(blog: BlogInputModel): Promise<ObjectId> {
        const newBlog = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false // Default value
        } as BlogDbType;

        const res = await blogCollection.insertOne(newBlog);
        const customId = res.insertedId.toString();
        await blogCollection.updateOne({ _id: res.insertedId }, { $set: { id: customId } });
        return res.insertedId;
    },
    async createPost(post: BlogPostInputModel, blogId: string): Promise<ObjectId> {
        const blog = await this.getBlogById(blogId);

        const newPost = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            createdAt: new Date().toISOString(),
            blogId: blogId,
            blogName: blog.name,
        } as PostDbType;

        const res = await postCollection.insertOne(newPost);
        const customId = res.insertedId.toString();
        await postCollection.updateOne({ _id: res.insertedId }, { $set: { id: customId } });
        return res.insertedId;
    },
    async getBlogByUUID(id: ObjectId){
        const res = await blogCollection.findOne({_id: id }, { projection: { _id: 0 }})
        if (res) {
            return this.map(res)
        }
        return undefined
    },

    async getBlogById(id: string): Promise<BlogDbType> {
        return await blogCollection.findOne({ id }, { projection: { _id: 0 }}) as BlogDbType
    },
    async findAndMap(id: string) {
        const blog = await this.getBlogById(id) // ! используем этот метод если проверили существование
        return this.map(blog)
    },
    async getAll() {
        const res = await blogCollection.find({}, { projection: { _id: 0 }}).toArray();
        return res.map(blog => this.map(blog))
    },
    async getAllPostByBlogId(blogId: string) {
        const res = await postCollection.find({ blogId }, { projection: { _id: 0 }}).toArray();
        return res.map(blog => postsRepository.map(blog))
    },
    async deleteBlog(id: string) {
        const res = await blogCollection.deleteOne({ id })
        return res.deletedCount === 1;
    },
    async updateBlog(body: BlogInputModel, id: string) {
        const res = await blogCollection.updateOne({ id }, { $set: body });
        return res.matchedCount === 1;
    },
    map(blog: BlogDbType) {
        const blogForOutput: BlogViewModel = {
            id: blog.id,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            name: blog.name,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership,
        }
        return blogForOutput
    },
}
