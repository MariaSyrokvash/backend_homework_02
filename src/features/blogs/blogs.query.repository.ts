import { type Filter, ObjectId, type WithId } from 'mongodb';
import type { BlogsFilters, BlogsViewModel, BlogViewModel } from '../../types/blogs.types';
import { Direction } from '../../constants/pagination.constants';
import { isValidObjectId } from '../../utils/common.utils';
import { blogsCollection } from '../../db/mongoDb';
import type { BlogDbType } from '../../db/blog-db-type';

export const blogsQueryRepository = {
  async getAllBlogs(filters: BlogsFilters): Promise<BlogsViewModel> {
    const { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = filters;
    const skip = (pageNumber - 1) * pageSize;
    const currentFilters: Filter<BlogDbType> = {};

    if (searchNameTerm) {
      currentFilters.name = { $regex: searchNameTerm, $options: 'i' };
    }
    const totalCount = await blogsCollection.countDocuments(currentFilters);

    const blogs = await blogsCollection
      .find(currentFilters)
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === Direction.Asc ? 1 : -1 })
      .toArray();

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: this._mapBlogs(blogs),
    };
  },
  async getOneBlog(id: string): Promise<BlogViewModel | null> {
    if (!isValidObjectId(id)) return null;
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (!blog) return null;
    return this._mapBlog(blog);
  },
  _mapBlog(blog: WithId<BlogDbType>) {
    const blogForOutput: BlogViewModel = {
      id: blog._id.toString(),
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      name: blog.name,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    };
    return blogForOutput;
  },
  _mapBlogs(blogs: Array<WithId<BlogDbType>>) {
    return blogs.map((blog) => this._mapBlog(blog));
  },
};
