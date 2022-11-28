import { ICard } from '@root/models/ICard';
import { BASE_URL } from '@root/constants/constants';

export const sortingData = (data: ICard[], sortingParam: string) => {
  return [...data].sort((firstCard, secondCard) => {
    if (firstCard && secondCard && sortingParam) {
      if (sortingParam === 'date') {
        return firstCard.timestamp - secondCard.timestamp;
      }
      if (sortingParam === 'category') {
        if (firstCard.category < secondCard.category) {
          return -1;
        }
        if (firstCard.category > secondCard.category) {
          return 1;
        }
        return 0;
      }
      if (sortingParam === 'size') {
        return firstCard.filesize - secondCard.filesize;
      }
    }
    return 1;
  });
};

export const dateTransform = (date: number) => {
  const dateFormat = new Date(date);
  const correctDateFormat = new Date(
    dateFormat.getFullYear(),
    dateFormat.getMonth(),
    dateFormat.getDate()
  ).toDateString();
  return { correctDateFormat };
};

export const imageTransform = (image: string) => {
  const correctImage = `${BASE_URL}/${image}`;
  return { correctImage };
};
