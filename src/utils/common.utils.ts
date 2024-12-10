import type { Request } from 'express';
import { ObjectId, type SortDirection } from 'mongodb';
import { DefaultPageNumber, DefaultPageSize, DefaultSortBy, Direction } from '../constants/pagination.constants';

export const isValidObjectId = (id: string): boolean => {
  return ObjectId.isValid(id);
};

export const normalizeQueryParams = (req: Request) => {
  const pageNumber =
    isNaN(Number(req.query.pageNumber)) || Number(req.query.pageNumber) <= 0 ? DefaultPageNumber : Number(req.query.pageNumber);

  const pageSize = isNaN(Number(req.query.pageSize)) || Number(req.query.pageSize) <= 0 ? DefaultPageSize : Number(req.query.pageSize);

  const sortBy: string = req.query.sortBy ? String(req.query.sortBy) : DefaultSortBy;

  const sortDirection: SortDirection = req.query.sortDirection?.toString() === Direction.Asc ? Direction.Asc : Direction.Desc;

  return { pageNumber, pageSize, sortBy, sortDirection };
};
