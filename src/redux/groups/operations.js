import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/groups');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addGroup = createAsyncThunk(
  'groups/addGroup',
  async (group, thunkAPI) => {
    try {
      const response = await axios.post('/groups', { ...group });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (groupId, thunkAPI) => {
    try {
      const response = await axios.delete(`/groups/${groupId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async (newGroup, thunkAPI) => {
    try {
      const response = await axios.put(`/groups/${newGroup}`, {
        ...newGroup,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
