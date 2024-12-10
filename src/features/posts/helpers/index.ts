import { type Request } from 'express';
import { type SortDirection } from 'mongodb';
import { DefaultPageNumber, DefaultPageSize, DefaultSortBy, Direction } from '../../../constants/pagination.constants';
import { type PostsFilters } from '../../../types/posts.types';

export const getPostsQueries = (req: Request): PostsFilters => {
  const pageNumber: number =
    isNaN(Number(req.query.pageNumber)) || Number(req.query.pageNumber) <= 0 ? DefaultPageNumber : Number(req.query.pageNumber);

  const pageSize: number =
    isNaN(Number(req.query.pageSize)) || Number(req.query.pageSize) <= 0 ? DefaultPageSize : Number(req.query.pageSize);

  const sortBy: string = req.query.sortBy ? String(req.query.sortBy) : DefaultSortBy;

  const sortDirection: SortDirection = req.query.sortDirection?.toString() === Direction.Asc ? Direction.Asc : Direction.Desc;

  return {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
  };
};
