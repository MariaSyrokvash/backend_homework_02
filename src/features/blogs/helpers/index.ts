import {Request} from 'express'
import { SortDirection } from 'mongodb';

import { DefaultPageNumber, DefaultPageSize, DefaultSortBy } from '../../../constants/blogs.constants';
import { Direction } from '../../../constants/pagination.constants';

import { BlogsFilters, PostsBlogFilters } from '../../../input-output-types/blogs-types';

export const getBlogsQueries = (req: Request): BlogsFilters => {
  const pageNumber: number = Number(req.query.pageNumber) || DefaultPageNumber;
  const pageSize: number = Number(req.query.pageSize) || DefaultPageSize;
  const sortBy: string = req.query.sortBy ? String(req.query.sortBy) : DefaultSortBy;
  const sortDirection: SortDirection = req.query.sortDirection?.toString() === Direction.Asc ? Direction.Asc : Direction.Desc;
  const searchNameTerm: string | null = req.query.searchNameTerm ? String(req.query.searchNameTerm) : null;

  return {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    searchNameTerm
  };
}

export const getPostsBlogQueries = (req: Request): PostsBlogFilters => {
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
