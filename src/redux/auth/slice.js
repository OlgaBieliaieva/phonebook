import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refresh } from './operations';

const initialState = {
  user: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        action.payload === null
          ? (state.user = null)
          : (state.user = { ...action.payload });
        action.payload === null
          ? (state.isLoggedIn = false)
          : (state.isLoggedIn = true);
      })
      .addCase(login.fulfilled, (state, action) => {
        action.payload === null
          ? (state.user = null)
          : (state.user = { ...action.payload });
        action.payload === null
          ? (state.isLoggedIn = false)
          : (state.isLoggedIn = true);
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(refresh.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        action.payload === null
          ? (state.user = null)
          : (state.user = { ...action.payload });
        action.payload === null
          ? (state.isLoggedIn = false)
          : (state.isLoggedIn = true);
        state.isRefreshing = false;
      })
      .addCase(refresh.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
