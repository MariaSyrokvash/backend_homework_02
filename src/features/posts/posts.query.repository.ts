import { type Filter, ObjectId, type WithId } from 'mongodb';
import { Direction } from '../../constants/pagination.constants';
import { isValidObjectId } from '../../utils/common.utils';
import { postsCollection } from '../../db/mongoDb';
import type { PostDbType } from '../../db/post-db-type';
import type { PostsFilters } from '../../types/posts.types';
import type { PostViewModel } from '../../types/blogs.types';

export const postsQueryRepository = {
  async getAllPosts(filters: PostsFilters) {
    const { pageSize, sortBy, sortDirection, pageNumber } = filters;
    const currentFilters: Filter<PostDbType> = {};
    const skip = (pageNumber - 1) * pageSize;

    const totalCount = await postsCollection.countDocuments();

    const posts = await postsCollection
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
      items: this._mapPosts(posts),
    };
  },
  async getOnePost(id: string): Promise<PostViewModel | null> {
    if (!isValidObjectId(id)) return null;
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });
    if (!post) return null;
    return this._mapPost(post);
  },
  async getAllPostByBlogId(blogId: string, filters: PostsFilters) {
    const { pageSize, pageNumber, sortBy, sortDirection } = filters;
    const currentFilters: Filter<PostDbType> = {};

    const skip = (pageNumber - 1) * pageSize;
    const totalCount = await postsCollection.countDocuments({ blogId });
    const posts = await postsCollection
      .find({ blogId, ...currentFilters })
      .skip(skip)
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === Direction.Asc ? 1 : -1 })
      .toArray();

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: this._mapPosts(posts),
    };
  },
  _mapPost(post: WithId<PostDbType>) {
    const postForOutput: PostViewModel = {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      createdAt: post.createdAt,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
    };
    return postForOutput;
  },
  _mapPosts(posts: Array<WithId<PostDbType>>) {
    return posts.map((post) => this._mapPost(post));
  },
};
