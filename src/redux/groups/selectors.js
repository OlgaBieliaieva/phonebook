import { createSelector } from '@reduxjs/toolkit';

export const selectGroups = state => state.groups.groups;
export const selectFilter = state => state.groups.filter;
export const selectIsLoading = state => state.groups.isLoading;
export const selectError = state => state.groups.error;

export const selectFilteredGroups = createSelector(
  [selectGroups, selectFilter],
  (groups, filter) => {
    return groups.filter(group => {
      return group.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
);
