import { type SortDirection } from 'mongodb';

export interface BlogInputModel {
  name: string; // max 15
  description: string; // max 500
  websiteUrl: string; // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
}

export interface BlogViewModel {
  id: string;
  name: string; // max 15
  description: string; // max 500
  websiteUrl: string; // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
  createdAt: string;
  isMembership: boolean;
}

export interface BlogPostInputModel {
  title: string; // max 30
  shortDescription: string; // max 100
  content: string; // max 1000
}

export interface PostViewModel {
  id: string;
  title: string; // max 30
  shortDescription: string; // max 100
  content: string; // max 1000
  blogId: string;
  blogName: string;
  createdAt: string;
}

export interface BlogsDto {
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

export interface PostsBlogFilters {
  sortBy: string;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
}
