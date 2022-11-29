import React, { FC, useCallback } from 'react';
import { Pagination, Stack } from '@mui/material';

import { IUsePaginationReturn } from '@root/models/IUsePagination';

const PaginationRounded: FC<Omit<IUsePaginationReturn, 'firstContentIndex' | 'lastContentIndex'>> = ({
  totalPages,
  setPage
}) => {
  const changePage = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setPage(page);
    },
    [setPage]
  );

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        color="secondary"
        variant="text"
        shape="rounded"
        onChange={changePage}
        sx={{ '& .MuiPagination-ul': { justifyContent: 'center' } }}
      />
    </Stack>
  );
};

export default PaginationRounded;
