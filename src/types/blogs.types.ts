import { type SortDirection } from 'mongodb';

export interface BlogInputModel {
  name: string;
  description: string;
  websiteUrl: string;
}

export interface BlogViewModel {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
}

export interface BlogPostInputModel {
  title: string;
  shortDescription: string;
  content: string;
}

export interface PostViewModel {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
}

export interface BlogsViewModel {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogViewModel[];
}

export interface BlogsFilters {
  searchNameTerm: string | null;
  sortBy: string;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
}
