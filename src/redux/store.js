import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/slice';
import { mainStateReducer } from './contactBookAppSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contactBookApp: mainStateReducer,
  },
});
