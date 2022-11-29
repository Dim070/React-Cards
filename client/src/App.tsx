import React, { FC, useCallback, useState } from 'react';
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

  const [sortingParam, setSortingParam] = useState('');
  const [sortedCards, setSortedCards] = useState<ICard[]>([]);
  const [toggleList, setToggleList] = useState(false);
  const navigate = useNavigate();

  const { firstContentIndex, lastContentIndex, setPage, totalPages } = usePagination({
    contentPerPage: NUMBER_OF_CARDS,
    count: cards?.length || ERROR_NUMBER
  });

  const applySorting = useCallback(() => {
    cards && sortingParam && setSortedCards(sortingData(cards || [], sortingParam));
    navigate(`/${sortingParam}`);
  }, [cards, navigate, sortingParam]);

  const cancelSorting = useCallback(() => {
    cards && setSortedCards([]);
    navigate('/');
  }, [cards, navigate]);

  return (
    <div className={styles.appWrapper}>
      <Header
        toggleList={setToggleList}
        sortingParam={setSortingParam}
        onApplySorting={applySorting}
        onCancelSorting={cancelSorting}
      />
      <Routes>
        <Route
          path={sortedCards.length > 0 ? `/${sortingParam}` : '/'}
          element={
            <MainPage
              toggleList={toggleList}
              cards={sortedCards.length > 0 ? sortedCards : cards || []}
              isLoading={isLoading}
              firstContentIndex={firstContentIndex}
              lastContentIndex={lastContentIndex}
            />
          }
        />
      </Routes>
      <Footer setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default App;
