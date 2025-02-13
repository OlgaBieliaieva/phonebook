import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  refresh,
  statusUpdate,
  addAvatar,
  deleteAvatar,
  updateProfile,
} from "./operations";

const initialState = {
  user: null,
  statuses: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload.user === null) {
          state.user = null;
          state.isLoggedIn = false;
        } else {
          state.user = { ...action.payload.user };
          state.isLoggedIn = true;
        }
        state.statuses = action.payload.statuses
          ? [...action.payload.statuses]
          : null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.user === null) {
          state.user = null;
          state.isLoggedIn = false;
        } else {
          state.user = { ...action.payload.user };
          state.isLoggedIn = true;
        }
        state.statuses = action.payload.statuses
          ? [...action.payload.statuses]
          : null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        if (action.payload === null || action.payload.user === null) {
          state.user = null;
          state.isLoggedIn = false;
        } else {
          state.user = { ...action.payload.user };
          state.isLoggedIn = true;
        }
        state.statuses = action.payload.statuses
          ? [...action.payload.statuses]
          : null;
        state.isRefreshing = false;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(statusUpdate.fulfilled, (state, action) => {
        if (action.payload.user === null) {
          state.user = null;
          state.isLoggedIn = false;
        } else {
          state.user.status = action.payload.user.status;
          state.isLoggedIn = true;
        }
        state.statuses = action.payload.statuses
          ? [...action.payload.statuses]
          : null;
      })
      .addCase(addAvatar.fulfilled, (state, action) => {
        if (action.payload.user === null) {
          state.user = null;
          state.isLoggedIn = false;
        } else {
          state.user.avatar = action.payload.user.avatar;
          state.isLoggedIn = true;
        }
      })
      .addCase(deleteAvatar.fulfilled, (state, action) => {
        if (action.payload.user === null) {
          state.user = null;
          state.isLoggedIn = false;
        } else {
          state.user.avatar = action.payload.user.avatar;
          state.isLoggedIn = true;
        }
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload.user === null) {
          state.user = null;
          state.isLoggedIn = false;
        } else {
          state.user = action.payload.user;
          state.isLoggedIn = true;
        }
        state.statuses = action.payload.statuses
          ? [...action.payload.statuses]
          : null;
      });
  },
});

export const authReducer = authSlice.reducer;
