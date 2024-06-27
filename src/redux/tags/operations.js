import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTags = createAsyncThunk(
  'tags/fetchTags',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/tags?owner=${userId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTag = createAsyncThunk('tags/addTag', async (tag, thunkAPI) => {
  try {
    const response = await axios.post('/tags', { ...tag });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteTag = createAsyncThunk(
  'tags/deleteTag',
  async (tagId, thunkAPI) => {
    try {
      const response = await axios.delete(`/tags/${tagId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateTag = createAsyncThunk(
  'tags/updateTag',
  async (newTag, thunkAPI) => {
    try {
      const response = await axios.put(`/tags/${newTag.id}`, {
        ...newTag,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
