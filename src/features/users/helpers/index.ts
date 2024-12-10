import { type Request } from 'express';
import { type UsersFilters } from '../../../types/users.types';
import { normalizeQueryParams } from '../../../utils/common.utils';

export const normalizeUsersQueries = (req: Request): UsersFilters => {
  const { sortDirection, sortBy, pageSize, pageNumber } = normalizeQueryParams(req);

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
