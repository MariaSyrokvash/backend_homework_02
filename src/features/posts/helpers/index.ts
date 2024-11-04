import {Request} from 'express'
import { SortDirection } from 'mongodb';

import { DefaultPageNumber, DefaultPageSize, DefaultSortBy } from '../../../constants/blogs.constants';
import { Direction } from '../../../constants/pagination.constants';
import { PostsFilters } from '../../../input-output-types/posts-types';



export const getPostsQueries = (req: Request): PostsFilters => {
  const pageNumber: number = Number(req.query.pageNumber) || DefaultPageNumber;
  const pageSize: number = Number(req.query.pageSize) || DefaultPageSize;
  const sortBy: string = req.query.sortBy ? String(req.query.sortBy) : DefaultSortBy;
  const sortDirection: SortDirection = req.query.sortDirection?.toString() === Direction.Asc ? Direction.Asc : Direction.Desc;

  return {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
  };
}
