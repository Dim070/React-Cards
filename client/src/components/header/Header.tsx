import React, { FC, SyntheticEvent, useCallback } from 'react';
import {
  AppBar,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import useModal from '@root/hooks/useModal';
import TemporaryDrawer from '@root/components/drawer/Drawer';
import { HEADER_FOOTER_BG } from '@root/constants/constants';

import styles from './styles.module.scss';

interface Props {
  sortingParam: (value: string) => void;
  onApplySorting: () => void;
  onCancelSorting: () => void;
  toggleList: (value: boolean) => void;
}

const Header: FC<Props> = ({ sortingParam, onApplySorting, onCancelSorting, toggleList }) => {
  const matches = useMediaQuery('(max-width:870px)');
  const onSortingClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      sortingParam(value);
    },
    [sortingParam]
  );

  const { toggle, isShowing } = useModal();

  const onToggleList = useCallback(
    (event: SyntheticEvent<Element, Event>, checked: boolean) => {
      toggleList(checked);
    },
    [toggleList]
  );

  return (
    <div className={styles.header}>
      <AppBar position="fixed" sx={{ background: HEADER_FOOTER_BG, color: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {matches ? (
            <IconButton onClick={toggle} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <FormControl sx={{ flexDirection: 'row', gap: 2 }}>
              <FormLabel id="sorting-label">Sorting:</FormLabel>
              <RadioGroup onChange={onSortingClick} row aria-labelledby="sorting-label" name="row-radio-buttons-group">
                <FormControlLabel value="date" control={<Radio />} label="Date" />
                <FormControlLabel value="category" control={<Radio />} label="Category" />
                <FormControlLabel value="size" control={<Radio />} label="Size" />
                <Button onClick={onApplySorting} color="secondary" variant="text" sx={{ border: 0.5, mr: 1 }}>
                  Apply
                </Button>
                <Button onClick={onCancelSorting} color="error" variant="text" sx={{ border: 0.5 }}>
                  Cancel
                </Button>
              </RadioGroup>
              <FormControlLabel
                sx={{ '& .MuiFormControlLabel-label': { color: 'black' } }}
                control={<Switch />}
                label="Переключить вид"
                onChange={onToggleList}
              />
            </FormControl>
          )}
          <div className={styles.sorting}>
            <Button color="inherit">Login</Button>
          </div>
          <React.Fragment>
            <Drawer
              open={isShowing}
              onClose={close}
              sx={{ '& .MuiDrawer-paper': { backgroundColor: HEADER_FOOTER_BG } }}
            >
              <TemporaryDrawer
                toggle={toggle}
                onApplySorting={onApplySorting}
                onCancelSorting={onCancelSorting}
                onToggleList={onToggleList}
                onSortingClick={onSortingClick}
              />
            </Drawer>
          </React.Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
