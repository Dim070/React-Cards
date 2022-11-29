import { useState } from 'react';

import { UsePaginationType } from '@root/models/IUsePagination';

const usePagination: UsePaginationType = ({ contentPerPage, count }) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(count / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;

  const pageWillGo = (num: number) => {
    setPage(num);
  };

  return {
    totalPages: pageCount,
    pageWillGo,
    firstContentIndex,
    lastContentIndex,
    page
  };
};

export default usePagination;
