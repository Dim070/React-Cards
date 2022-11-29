import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { FC, SyntheticEvent } from 'react';
import { FormControlLabel, FormLabel, Radio, RadioGroup, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

interface Props {
  onToggleList: (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
  onSortingClick: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  onApplySorting: () => void;
  onCancelSorting: () => void;
  toggle: () => void;
}

const TemporaryDrawer: FC<Props> = ({ toggle, onToggleList, onSortingClick, onApplySorting, onCancelSorting }) => {
  return (
    <Box sx={{ width: 200, ml: 1 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <IconButton onClick={toggle} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        </ListItem>
        <FormLabel id="sorting-label">Sorting:</FormLabel>
        <RadioGroup onChange={onSortingClick} row aria-labelledby="sorting-label" name="row-radio-buttons-group">
          <ListItem disablePadding>
            <FormControlLabel value="date" control={<Radio />} label="Date" />
          </ListItem>
          <ListItem disablePadding>
            <FormControlLabel value="category" control={<Radio />} label="Category" />
          </ListItem>
          <ListItem disablePadding>
            <FormControlLabel value="size" control={<Radio />} label="Size" />
          </ListItem>
          <Button onClick={onApplySorting} color="secondary" variant="text" sx={{ border: 0.5, mr: 1 }}>
            Apply
          </Button>
          <Button onClick={onCancelSorting} color="error" variant="text" sx={{ border: 0.5 }}>
            Cansel
          </Button>
        </RadioGroup>
      </List>
      <Divider />
      <FormControlLabel
        sx={{ '& .MuiFormControlLabel-label': { color: 'black' } }}
        control={<Switch />}
        label="Переключить вид"
        onChange={onToggleList}
      />
    </Box>

    // <div>
    //   <React.Fragment>
    //     <Drawer open={isShowing} onClose={close}>
    //       {list()}
    //     </Drawer>
    //   </React.Fragment>
    // </div>
  );
};

export default TemporaryDrawer;
