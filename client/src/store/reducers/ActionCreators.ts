import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ICard } from '@root/models/ICard';

export const fetchCards = createAsyncThunk('card/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<ICard[]>('https://contest.elecard.ru/frontend_data/catalog.json');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка загруки данных');
  }
});
