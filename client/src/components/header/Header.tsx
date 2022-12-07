import React, { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Portal,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Toolbar,
  useMediaQuery,
  Box
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import useModal from '@root/hooks/useModal';
import TemporaryDrawer from '@root/components/drawer/Drawer';
import { HEADER_FOOTER_BG } from '@root/constants/constants';
import Modal from '@root/components/modal/Modal';

import styles from './styles.module.scss';

interface Props {
  sortingParam: (value: string) => void;
  onCancelSorting: () => void;
  toggleList: (value: boolean) => void;
  isUser: (value: boolean) => void;
  isReturnCards: (value: null) => void;
}

const Header: FC<Props> = ({ isReturnCards, isUser, sortingParam, onCancelSorting, toggleList }) => {
  const [login, setLogin] = useState('');
  const [user, setUser] = useState<string | null>('');

  const matches = useMediaQuery('(max-width:870px)');
  const onSortingClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      sortingParam(value);
    },
    [sortingParam]
  );

  const { toggle: asideMenuToggle, isShowing: isShowingAsideMenu } = useModal();
  const { toggle: loginModalToggle, isShowing: isShowingLoginModal } = useModal();

  const onToggleList = useCallback(
    (event: SyntheticEvent<Element, Event>, checked: boolean) => {
      toggleList(checked);
    },
    [toggleList]
  );

  const getLogin = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setLogin(event.target.value);
  }, []);

  const sendLogin = useCallback(() => {
    localStorage.setItem('login', JSON.stringify(login));
    setUser(login);
    isUser(true);
    loginModalToggle();
  }, [isUser, login, loginModalToggle]);

  const returnCards = useCallback(() => {
    isReturnCards(null);
    localStorage.removeItem('cardsWithoutItem');
  }, [isReturnCards]);

  useEffect(() => {
    localStorage.getItem('login') && setUser(JSON.parse(localStorage.getItem('login') || '')) && isUser(true);
  }, [isUser]);

  return (
    <div className={styles.header}>
      <AppBar position="fixed" sx={{ background: HEADER_FOOTER_BG, color: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {matches ? (
            <IconButton
              onClick={asideMenuToggle}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <FormControl sx={{ flexDirection: 'row', gap: 2 }}>
              <FormLabel id="sorting-label">Sorting:</FormLabel>
              <RadioGroup onChange={onSortingClick} row aria-labelledby="sorting-label" name="row-radio-buttons-group">
                <FormControlLabel value="date" control={<Radio />} label="Date" />
                <FormControlLabel value="category" control={<Radio />} label="Category" />
                <FormControlLabel value="size" control={<Radio />} label="Size" />
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
              {user && (
                <Button onClick={returnCards} color="secondary" variant="text" sx={{ border: 0.5, mr: 1 }}>
                  Восстановить удаленные
                </Button>
              )}
            </FormControl>
          )}
          <div className={styles.sorting}>
            {user ? (
              <span>{user}</span>
            ) : (
              <Button onClick={loginModalToggle} color="inherit">
                Login
              </Button>
            )}
          </div>
          <React.Fragment>
            <Drawer
              open={isShowingAsideMenu}
              onClose={close}
              sx={{ '& .MuiDrawer-paper': { backgroundColor: HEADER_FOOTER_BG } }}
            >
              <TemporaryDrawer
                toggle={asideMenuToggle}
                onCancelSorting={onCancelSorting}
                onToggleList={onToggleList}
                onSortingClick={onSortingClick}
              />
            </Drawer>
          </React.Fragment>
        </Toolbar>
      </AppBar>
      {isShowingLoginModal ? (
        <Portal>
          <Modal isShowing={isShowingLoginModal} close={loginModalToggle}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                alignItems: 'center',
                '& > :not(style)': { m: 1, width: '25ch' }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField onChange={getLogin} id="login" label="Login" variant="outlined" />
              <Button onClick={sendLogin} color="secondary" variant="text" sx={{ border: 0.5, mr: 1 }}>
                Apply
              </Button>
            </Box>
          </Modal>
        </Portal>
      ) : null}
    </div>
  );
};

export default Header;
