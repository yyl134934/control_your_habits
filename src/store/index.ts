import { configureStore } from '@reduxjs/toolkit';
import entriesReducer from './redux/entries.redux';

export default configureStore({
  reducer: {
    entries: entriesReducer,
  },
});
