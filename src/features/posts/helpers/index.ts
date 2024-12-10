import { type Request } from 'express';
import { normalizeQueryParams } from '../../../utils/common.utils';
import { type PostsFilters } from '../../../types/posts.types';

export const normalizePostsQueries = (req: Request): PostsFilters => {
  const { pageNumber, pageSize, sortBy, sortDirection } = normalizeQueryParams(req);

  return {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
  };
};
