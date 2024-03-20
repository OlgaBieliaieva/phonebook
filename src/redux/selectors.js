import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contactBookApp.contacts;
export const selectUsers = state => state.contactBookApp.users;
export const selectFilter = state => state.contactBookApp.filter;
export const selectIsLoading = state => state.contactBookApp.isLoading;
export const selectError = state => state.contactBookApp.error;
export const selectCurrentUser = state => state.contactBookApp.currentUser;
export const selectIsLoggedIn = state => state.contactBookApp.isLoggedIn;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectCurrentUser, selectFilter],
  (contacts, currentUser, filter) => {
    return contacts.filter(contact => {
      if (contact.owner === currentUser.id) {
        const contactFullName = `${contact.firstName} ${contact.middleName} ${contact.lastName}`;
        return contactFullName.toLowerCase().includes(filter.toLowerCase());
      } else {return null}
    });
  }
);
