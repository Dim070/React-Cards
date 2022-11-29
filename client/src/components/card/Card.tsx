import React, { FC, memo, useCallback } from 'react';
import { CardContent, CardMedia, Typography, Card as CardWrapper } from '@mui/material';

import { ICard } from '@root/models/ICard';
import { dateTransform, imageTransform } from '@root/utils/utils';

import Trash from '../../assets/images/trash.svg';
import styles from './styles.module.scss';

interface Props {
  card: ICard;
  deleteCard: (time: number) => void;
  user: boolean;
}

const Card: FC<Props> = ({ card, deleteCard, user }) => {
  const { image, filesize, timestamp, category } = card;
  const { correctDateFormat } = dateTransform(timestamp);
  const { correctImage } = imageTransform(image);

  const onTrashClick = useCallback(() => {
    deleteCard(timestamp);
  }, [deleteCard, timestamp]);
  return (
    <div className={styles.card}>
      <CardWrapper sx={{ position: 'relative' }}>
        <CardMedia component="img" alt="image" height="300" image={correctImage} />
        {user && <Trash className={styles.trash} onClick={onTrashClick} />}
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {category}
          </Typography>
          <Typography variant="body2">
            Дата: {correctDateFormat}
            <br />
            Размер файла: {filesize}
          </Typography>
        </CardContent>
      </CardWrapper>
    </div>
  );
};

export default memo(Card);
