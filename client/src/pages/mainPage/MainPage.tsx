import React, { FC, memo, useCallback, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import Card from '@root/components/card/Card';
import { ICard } from '@root/models/ICard';
import TreeList from '@root/components/treeList/TreeList';
import useModal from '@root/hooks/useModal';
import Modal from '@root/components/modal/Modal';
import spinner from '@images/spinner.gif';
import { cardAPI } from '@root/services/CardService';

import styles from './styles.module.scss';

interface Props {
  cards: ICard[];
  isLoading: boolean;
  firstContentIndex: number;
  lastContentIndex: number;
  toggleList: boolean;
}

const MainPage: FC<Props> = ({ isLoading, cards, firstContentIndex, lastContentIndex, toggleList }) => {
  const { error } = cardAPI.useFetchCatalogQuery(null);

  const { toggle: toggleModal, isShowing: isShowingModal } = useModal();
  const [modalImage, setModalImage] = useState('');

  const getImage = useCallback(
    (image: string) => {
      setModalImage(image);
      toggleModal();
    },
    [toggleModal]
  );

  const deleteCard = useCallback((item: any) => {}, []);

  return (
    <div className={styles.mainPage}>
      <div className={styles.container}>
        {isLoading && (
          <h1>
            <img src={spinner} alt="loading..." />
          </h1>
        )}
        {error && <h1>Произошла ошибка загрузки данных</h1>}
        {toggleList ? (
          <TreeView
            aria-label="file card"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1, maxWidth: 400 }}
          >
            <TreeItem nodeId="Cards" label="Cards">
              {cards.slice(firstContentIndex, lastContentIndex).map((card, index) => (
                <TreeList getImage={getImage} key={card.timestamp} index={index} card={card} />
              ))}
            </TreeItem>
          </TreeView>
        ) : (
          cards
            .slice(firstContentIndex, lastContentIndex)
            .map((card) => <Card key={card.timestamp} card={card} deleteCard={deleteCard} />)
        )}
      </div>
      <Modal isShowing={isShowingModal} close={toggleModal}>
        <img className={styles.modalImage} src={modalImage} alt="card image" />
      </Modal>
    </div>
  );
};

export default memo(MainPage);
