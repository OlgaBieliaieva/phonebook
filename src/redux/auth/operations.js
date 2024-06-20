import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix';

axios.defaults.baseURL = 'https://667320036ca902ae11b333e3.mockapi.io/api/';

export const register = createAsyncThunk(
  'contactBookApp/register',
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.get(`/users`);
      const isExist = data.find(item => item.email === user.email);

      if (isExist) {
        Notify.failure('Email is already in use');
        return null;
      } else {
        const result = await axios.post('/users', { ...user });

        if (result.status !== 201) {
          return null;
        } else {
          localStorage.setItem('user', result.data.id);

          return result.data;
        }
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk(
  'contactBookApp/login',
  async (credentials, thunkAPI) => {
    try {
      const users = await axios.get('/users');

      if (users.status === 200) {
        const currentUser = users.data.find(
          user =>
            user.email === credentials.email &&
            user.password === credentials.password
        );
        if (currentUser) {
          localStorage.setItem('user', currentUser.id);
          return currentUser;
        } else {
          Notify.failure('Invalid email or password');
          return null;
        }
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk(
  'contactBookApp/logout',
  async (_, thunkAPI) => {
    try {
      localStorage.clear();
      return null;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const refresh = createAsyncThunk(
  'contactBookApp/refresh',
  async (_, thunkAPI) => {
    try {
      const users = await axios.get('/users');
      const userId = JSON.parse(localStorage.getItem('user'));
      if (userId) {
        if (users.status === 200) {
          const currentUser = users.data.find(
            user => user.id === userId.toString()
          );
          return currentUser;
        }
      } else {
        return null;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
