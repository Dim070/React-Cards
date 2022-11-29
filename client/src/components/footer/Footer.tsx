import { Box } from '@mui/material';
import React, { FC } from 'react';

import { IUsePaginationReturn } from '@root/models/IUsePagination';
import PaginationRounded from '@root/components/pagination/Pagination';
import { HEADER_FOOTER_BG } from '@root/constants/constants';

import styles from './styles.module.scss';

const Footer: FC<Omit<IUsePaginationReturn, 'firstContentIndex' | 'lastContentIndex'>> = ({
  pageWillGo,
  totalPages
}) => {
  return (
    <div className={styles.footer}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          backgroundColor: HEADER_FOOTER_BG
        }}
      >
        <PaginationRounded totalPages={totalPages} pageWillGo={pageWillGo} />
      </Box>
    </div>
  );
};

export default Footer;
