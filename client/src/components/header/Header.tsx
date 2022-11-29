import React, { FC, SyntheticEvent, useCallback } from 'react';
import {
  AppBar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  Toolbar
} from '@mui/material';

import styles from './styles.module.scss';

interface Props {
  sortingParam: (value: string) => void;
  onApplySorting: () => void;
  onCanselSorting: () => void;
  toggleList: (value: boolean) => void;
}

const Header: FC<Props> = ({ sortingParam, onApplySorting, onCanselSorting, toggleList }) => {
  const onSortingClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      sortingParam(value);
    },
    [sortingParam]
  );

  const onToggleList = useCallback(
    (event: SyntheticEvent<Element, Event>, checked: boolean) => {
      toggleList(checked);
    },
    [toggleList]
  );

  return (
    <div className={styles.header}>
      <AppBar position="fixed" sx={{ background: '#a9b8c6' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FormControl sx={{ flexDirection: 'row', gap: 2 }}>
            <FormLabel id="sorting-label">Sorting:</FormLabel>
            <RadioGroup
              onChange={onSortingClick}
              row
              aria-labelledby="sorting-label"
              name="row-radio-buttons-group"
              sx={{ '& .MuiFormControlLabel-label': { color: 'black' } }}
            >
              <FormControlLabel value="date" control={<Radio />} color="black" label="Date" />
              <FormControlLabel value="category" control={<Radio />} label="Category" />
              <FormControlLabel value="size" control={<Radio />} label="Size" />
              <Button onClick={onApplySorting} color="secondary" variant="text" sx={{ border: 0.5, mr: 1 }}>
                Apply
              </Button>
              <Button onClick={onCanselSorting} color="error" variant="text" sx={{ border: 0.5 }}>
                Cansel
              </Button>
            </RadioGroup>
          </FormControl>

          <FormControlLabel
            sx={{ '& .MuiFormControlLabel-label': { color: 'black' } }}
            control={<Switch />}
            label="Переключить вид"
            onChange={onToggleList}
          />
          <div className={styles.sorting}>
            <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
