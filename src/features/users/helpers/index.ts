import { type SortDirection } from 'mongodb';
import { type Request } from 'express';
import { type UsersFilters } from '../../../input-output-types/users-types';
import { DefaultPageNumber, DefaultPageSize, DefaultSortBy, Direction } from '../../../constants/pagination.constants';

export const getUsersQueries = (req: Request): UsersFilters => {
  const pageNumber = Number(req.query.pageNumber) || DefaultPageNumber;
  const pageSize = Number(req.query.pageSize) || DefaultPageSize;
  const sortBy = req.query.sortBy ? String(req.query.sortBy) : DefaultSortBy;
  const sortDirection: SortDirection = req.query.sortDirection?.toString() === Direction.Asc ? Direction.Asc : Direction.Desc;
  const searchLoginTerm = req.query.searchLoginTerm ? String(req.query.searchLoginTerm) : null;
  const searchEmailTerm = req.query.searchEmailTerm ? String(req.query.searchEmailTerm) : null;

  return {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    searchLoginTerm,
    searchEmailTerm,
  };
};
