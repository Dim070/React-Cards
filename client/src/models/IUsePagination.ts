export interface IUsePaginationProps {
  contentPerPage: number;
  count: number;
}

export interface IUsePaginationReturn {
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  pageWillGo: (page: number) => void;
}

export type UsePaginationType = (pagination: IUsePaginationProps) => IUsePaginationReturn;
