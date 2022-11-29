import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { cardAPI } from '../services/CardService';
import cardReducer from './reducers/CardSlice';

const rootReducer = combineReducers({
  cardReducer,
  [cardAPI.reducerPath]: cardAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardAPI.middleware)
  });
};

export type AppStore = ReturnType<typeof setupStore>;
