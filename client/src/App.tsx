import React, { FC, useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import MainPage from '@root/pages/mainPage/MainPage';
import Header from '@root/components/header/Header';
import Footer from '@root/components/footer/Footer';
import usePagination from '@root/hooks/usePagination';
import { ERROR_NUMBER, NUMBER_OF_CARDS } from '@root/constants/constants';
import { ICard } from '@root/models/ICard';
import { sortingData } from '@root/utils/utils';

import styles from './styles.module.scss';
import { cardAPI } from './services/CardService';

const App: FC = () => {
  const { data: cards, isLoading } = cardAPI.useFetchCatalogQuery(null);
  const [userCards, setUserCards] = useState<ICard[] | null>(null);
  const [sortingParam, setSortingParam] = useState('');
  const [sortedCards, setSortedCards] = useState<ICard[]>([]);
  const [toggleList, setToggleList] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();

  const { firstContentIndex, lastContentIndex, pageWillGo, totalPages } = usePagination({
    contentPerPage: NUMBER_OF_CARDS,
    count: userCards?.length || cards?.length || ERROR_NUMBER
  });

  useEffect(() => {
    sortingParam && setSortedCards(sortingData(cards || [], sortingParam));
    navigate(`/${sortingParam}`);
  }, [cards, navigate, sortingParam]);

  const cancelSorting = useCallback(() => {
    setSortedCards([]);
    setSortingParam('');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem('cardsWithoutItem')) {
      const setData = JSON.parse(localStorage.getItem('cardsWithoutItem') || '');
      setUserCards(setData);
    } else setUserCards(null);
  }, []);

  useEffect(() => {
    localStorage.getItem('login') && setIsUser(JSON.parse(localStorage.getItem('login') || ''));
  }, [isUser]);

  return (
    <div className={styles.appWrapper}>
      <Header
        isUser={setIsUser}
        toggleList={setToggleList}
        sortingParam={setSortingParam}
        isReturnCards={setUserCards}
        onCancelSorting={cancelSorting}
      />
      <Routes>
        <Route
          path={sortingParam ? `/${sortingParam}` : '/'}
          element={
            <MainPage
              isUser={isUser}
              userCards={setUserCards}
              toggleList={toggleList}
              cards={sortingParam ? sortedCards : userCards || cards || []}
              isLoading={isLoading}
              firstContentIndex={firstContentIndex}
              lastContentIndex={lastContentIndex}
            />
          }
        />
      </Routes>
      <Footer pageWillGo={pageWillGo} totalPages={totalPages} />
    </div>
  );
};

export default App;
