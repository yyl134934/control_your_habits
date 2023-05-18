import { configureStore } from '@reduxjs/toolkit';
import entriesReducer from './redux/entries.redux';

export const store = configureStore({
  reducer: {
    entriesState: entriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
