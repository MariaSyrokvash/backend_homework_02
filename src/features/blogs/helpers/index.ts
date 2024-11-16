import { type SortDirection } from 'mongodb';
import { type Request } from 'express';
import { type BlogsFilters, type PostsBlogFilters } from '../../../input-output-types/blogs-types';
import { DefaultPageNumber, DefaultPageSize, DefaultSortBy, Direction } from '../../../constants/pagination.constants';

export const getBlogsQueries = (req: Request): BlogsFilters => {
  const pageNumber = Number(req.query.pageNumber) || DefaultPageNumber;
  const pageSize = Number(req.query.pageSize) || DefaultPageSize;
  const sortBy = req.query.sortBy ? String(req.query.sortBy) : DefaultSortBy;
  const sortDirection: SortDirection = req.query.sortDirection?.toString() === Direction.Asc ? Direction.Asc : Direction.Desc;
  const searchNameTerm = req.query.searchNameTerm ? String(req.query.searchNameTerm) : null;

  return {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    searchNameTerm,
  };
};

export const getPostsBlogQueries = (req: Request): PostsBlogFilters => {
  const pageNumber = Number(req.query.pageNumber) || DefaultPageNumber;
  const pageSize = Number(req.query.pageSize) || DefaultPageSize;
  const sortBy = req.query.sortBy ? String(req.query.sortBy) : DefaultSortBy;
  const sortDirection = req.query.sortDirection?.toString() === Direction.Asc ? Direction.Asc : Direction.Desc;

  return {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
  };
};
