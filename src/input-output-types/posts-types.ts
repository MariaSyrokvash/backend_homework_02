export type PostInputModel = {
  title: string; // max 30
  shortDescription: string; // max 100
  content: string; // max 1000
  blogId: string; // valid
};

export type PostViewModel = {
  id: string;
  title: string; // max 30
  shortDescription: string; // max 100
  content: string; // max 1000
  blogId: string; // valid
  blogName: string;
  createdAt: string;
};

export type PostsDto = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostViewModel[];
};

export type PostsFilters = {
  sortBy: string;
  sortDirection: "asc" | "desc";
  pageNumber: number;
  pageSize: number;
};
