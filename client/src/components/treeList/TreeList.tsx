import React, { FC, useCallback } from 'react';
import TreeItem from '@mui/lab/TreeItem';

import { ICard } from '@root/models/ICard';
import { dateTransform, imageTransform } from '@root/utils/utils';

import styles from './styles.module.scss';

interface Props {
  card: ICard;
  index: number;
  getImage: (image: string) => void;
}

const TreeList: FC<Props> = ({ card, index, getImage }) => {
  const { correctDateFormat } = dateTransform(card.timestamp);
  const { correctImage } = imageTransform(card.image);

  const onImageClick = useCallback(() => {
    getImage(correctImage);
  }, [correctImage, getImage]);

  return (
    <TreeItem nodeId={`${index}`} label={`Card: ${index}`}>
      <TreeItem nodeId={`${index}.1`} label={`Category: ${card.category}`} />
      <TreeItem nodeId={`${index}.2`} label={`Size: ${card.filesize}`} />
      <TreeItem nodeId={`${index}.3`} label={`Time: ${correctDateFormat}`} />
      <TreeItem
        id="image"
        nodeId={`${index}.4`}
        label={<img className={styles.thumbnail} src={correctImage} alt="card image" />}
        onClick={onImageClick}
      />
    </TreeItem>
  );
};

export default TreeList;
