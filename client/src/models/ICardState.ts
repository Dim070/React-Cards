import { ICard } from '@root/models/ICard';

export interface ICardState {
  cards: ICard[];
  isLoading: boolean;
  error: boolean | string;
}
