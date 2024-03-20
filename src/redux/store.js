import { configureStore } from '@reduxjs/toolkit';
import { mainStateReducer } from './contactBookAppSlice';

export const store = configureStore({
  reducer: {
    contactBookApp: mainStateReducer,
  },
});
