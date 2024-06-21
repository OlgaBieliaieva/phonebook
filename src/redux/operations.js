// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// // import { Notify } from 'notiflix';

// // axios.defaults.baseURL = 'https://65f2b95a034bdbecc765a5da.mockapi.io/';

// // export const fetchUsers = createAsyncThunk(
// //   'contactBookApp/fetchUsers',
// //   async (_, thunkAPI) => {
// //     try {
// //       const response = await axios.get('/users');
// //       return response.data;
// //     } catch (e) {
// //       return thunkAPI.rejectWithValue(e.message);
// //     }
// //   }
// // );

// export const fetchContacts = createAsyncThunk(
//   'contactBookApp/fetchContacts',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('/contacts');
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (contact, thunkAPI) => {
//     try {
//       const response = await axios.post('/contacts', { ...contact });
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const deleteContact = createAsyncThunk(
//   'contacts/deleteContact',
//   async (contactId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`/contacts/${contactId}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const updateContact = createAsyncThunk(
//   'contacts/updateContact',
//   async (newContact, thunkAPI) => {
//     try {
//       const response = await axios.put(`/contacts/${newContact.id}`, {
//         ...newContact,
//       });
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
