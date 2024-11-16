import type { SortDirection } from 'mongodb';

export interface UserViewModel {
  id: string;
  login: string;
  email: string;
  createdAt: string;
}

export interface UsersDto {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserViewModel[];
}

export interface UsersFilters {
  sortBy: string;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
  searchLoginTerm: string | null;
  searchEmailTerm: string | null;
}

export interface UserInputModel {
  login: string;
  password: string;
  email: string;
}
