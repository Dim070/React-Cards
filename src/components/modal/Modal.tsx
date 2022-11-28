import * as React from 'react';
import Box from '@mui/material/Box';
import { Modal as ModalWindow } from '@mui/material';
import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  isShowing: boolean;
  close: () => void;
}

const Modal: FC<Props> = ({ children, isShowing, close }) => {
  return (
    <ModalWindow open={isShowing} onClose={close}>
      <Box className={styles.modal}>{children}</Box>
    </ModalWindow>
  );
};
export default Modal;
