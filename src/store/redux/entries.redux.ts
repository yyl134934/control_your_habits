import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from 'Src/typings/entry';

interface EntriesState {
  entries: Entry[];
}

const initialState: EntriesState = {
  entries: [],
};
[].
export const entriesSlice = createSlice({
  name: 'habitCard',
  initialState,
  reducers: {
    getEntries: () => {},
    addEntry: (state, action: PayloadAction<Entry>) => {
      state.entries.push(action.payload);
    },
    deleteEntry: (entryInfo) => {},
    createHabitCard: () => {},
    updateType: (entryInfo) => {},
  },
});

export const { addEntry, getEntries, deleteEntry, createHabitCard, updateType } = entriesSlice.actions;

export default entriesSlice.reducer;
