import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICard } from '@root/models/ICard';
import { fetchCards } from '@root/store/reducers/ActionCreators';
import { ICardState } from '@root/models/ICardState';

const initialState: ICardState = {
  cards: [],
  isLoading: false,
  error: ''
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCards.fulfilled.type]: (state, action: PayloadAction<ICard[]>) => {
      state.isLoading = false;
      state.error = '';
      state.cards = action.payload;
    },
    [fetchCards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default cardSlice.reducer;
