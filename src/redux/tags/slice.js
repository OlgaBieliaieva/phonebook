import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTags,
  addTag,
  deleteTag,
  updateTag,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],   
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
      .addCase(fetchTags.pending, handlePending)
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tags = [...action.payload];
      })
      .addCase(fetchTags.rejected, handleRejected)

      .addCase(addTag.pending, handlePending)
      .addCase(addTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tags.push(action.payload);
      })
      .addCase(addTag.rejected, handleRejected)

      .addCase(deleteTag.pending, handlePending)
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.tags.findIndex(
          tag => tag.id === action.payload.id
        );
        state.tags.splice(index, 1);
      })
      .addCase(deleteTag.rejected, handleRejected)

      .addCase(updateTag.pending, handlePending)
      .addCase(updateTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.tags.findIndex(
          tag => tag.id === action.payload.id
        );
        state.tags.splice(index, 1, { ...action.payload });
      })
      .addCase(updateTag.rejected, handleRejected);
  },
});
export const { filter } = tagsSlice.actions;
export const tagsReducer = tagsSlice.reducer;
