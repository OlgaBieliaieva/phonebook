export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectStatuses = state => state.auth.statuses;

export const selectIsRefreshing = state => state.auth.isRefreshing;
