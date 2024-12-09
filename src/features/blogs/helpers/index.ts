import { type SortDirection } from 'mongodb';
import { type Request } from 'express';
import { DefaultPageNumber, DefaultPageSize, DefaultSortBy, Direction } from '../../../constants/pagination.constants';
import { type BlogsFilters, type PostsBlogFilters } from '../../../types/blogs.types';

const normalizeQueryParams = (req: Request) => {
  const pageNumber = Number(req.query.pageNumber) || DefaultPageNumber;
  const pageSize = Number(req.query.pageSize) || DefaultPageSize;
  const sortBy = req.query.sortBy ? String(req.query.sortBy) : DefaultSortBy;
  const sortDirection: SortDirection = req.query.sortDirection?.toString() === Direction.Asc ? Direction.Asc : Direction.Desc;

  return { pageNumber, pageSize, sortBy, sortDirection };
};

export const normalizeBlogsFilters = (req: Request): BlogsFilters => {
  const { pageNumber, pageSize, sortBy, sortDirection } = normalizeQueryParams(req);
  const searchNameTerm = req.query.searchNameTerm ? String(req.query.searchNameTerm) : null;

  return {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    searchNameTerm,
  };
};

export const normalizePostsBlogQueries = (req: Request): PostsBlogFilters => {
  const { pageNumber, pageSize, sortBy, sortDirection } = normalizeQueryParams(req);

  return {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
  };
};
