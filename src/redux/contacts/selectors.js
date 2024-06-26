import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.contacts;
export const selectFilter = state => state.contacts.filter;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact => {
      const contactFullName = `${contact.firstName} ${contact.middleName} ${contact.lastName}`;
      return contactFullName.toLowerCase().includes(filter.toLowerCase());
    });
  }
);
