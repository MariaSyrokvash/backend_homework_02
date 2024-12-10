import { type Request } from 'express';
import { type BlogsFilters } from '../../../types/blogs.types';
import { normalizeQueryParams } from '../../../utils/common.utils';

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
