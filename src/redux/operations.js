import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix';

axios.defaults.baseURL = 'https://65f2b95a034bdbecc765a5da.mockapi.io/';

export const register = createAsyncThunk(
  'contactBookApp/register',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('/users', { ...user });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'contactBookApp/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/users');
      return response.data;
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
          Notify.failure({ message: 'Invalid email or password' });
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

export const fetchContacts = createAsyncThunk(
  'contactBookApp/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { ...contact });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
