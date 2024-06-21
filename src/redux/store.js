import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/slice';
import { contactsReducer } from './contacts/slice';
import { groupsReducer } from './groups/slice';
import { tagsReducer } from './tags/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    groups: groupsReducer,
    tags: tagsReducer,
  },
});
