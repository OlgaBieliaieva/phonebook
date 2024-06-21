import { createSlice } from '@reduxjs/toolkit';
import { fetchGroups, addGroup, deleteGroup, updateGroup } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    filter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGroups.pending, handlePending)
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.groups = [...action.payload];
      })
      .addCase(fetchGroups.rejected, handleRejected)

      .addCase(addGroup.pending, handlePending)
      .addCase(addGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.groups.push(action.payload);
      })
      .addCase(addGroup.rejected, handleRejected)

      .addCase(deleteGroup.pending, handlePending)
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.groups.findIndex(
          group => group.id === action.payload.id
        );
        state.groups.splice(index, 1);
      })
      .addCase(deleteGroup.rejected, handleRejected)

      .addCase(updateGroup.pending, handlePending)
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.groups.findIndex(
          group => group.id === action.payload.id
        );
        state.groups.splice(index, 1, { ...action.payload });
      })
      .addCase(updateGroup.rejected, handleRejected);
  },
});
export const { filter } = groupsSlice.actions;
export const groupsReducer = groupsSlice.reducer;
