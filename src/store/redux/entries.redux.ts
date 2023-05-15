import { createSlice } from '@reduxjs/toolkit';

export const entriesSlice = createSlice({
  name: 'entries',
  initialState: {},
  reducers: { addEntry: () => {}, deleteEntry: () => {}, getEntries: () => {}, createHabitCard: () => {} },
});

export const { addEntry, getEntries, deleteEntry, createHabitCard } = entriesSlice.actions;

export default entriesSlice.reducer;
