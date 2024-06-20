import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
  // fetchUsers,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactBookAppSlice = createSlice({
  name: 'contactBookApp',
  initialState: {
    contacts: [],
    users: [],
    filter: '',
    isLoading: false,
    error: null,
    currentUser: null,
    isLoggedIn: false,
  },
  reducers: {
    filter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = [...action.payload];
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)

      .addCase(updateContact.pending, handlePending)
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1, { ...action.payload });
      })
      .addCase(updateContact.rejected, handleRejected);

    // .addCase(fetchUsers.pending, handlePending)
    // .addCase(fetchUsers.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.users = [...action.payload];
    // })
    // .addCase(fetchUsers.rejected, handleRejected)
  },
});
export const { filter } = contactBookAppSlice.actions;
export const mainStateReducer = contactBookAppSlice.reducer;
