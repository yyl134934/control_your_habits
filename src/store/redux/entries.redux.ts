import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from 'Src/typings/entry';
import { objectEqual, updateObjectInArray } from 'Src/utils';

interface EntriesState {
  entries: Entry[];
}

const initialState: EntriesState = {
  entries: [],
};

export const entriesSlice = createSlice({
  name: 'habitCard',
  initialState,
  reducers: {
    getEntries: () => {},
    addEntry: (state, action: PayloadAction<Entry>) => {
      state.entries.push(action.payload);
    },
    deleteEntry: (state, action: PayloadAction<Entry>) => {
      state.entries = state.entries.filter((entry) => objectEqual(entry, action.payload));
    },
    createHabitCard: (state, action: PayloadAction<Array<Entry>>) => {
      state.entries = action.payload;
    },
    updateType: (state, action: PayloadAction<Entry>) => {
      state.entries = updateObjectInArray(state.entries, action.payload);
    },
  },
});

export const { addEntry, getEntries, deleteEntry, createHabitCard, updateType } = entriesSlice.actions;

export default entriesSlice.reducer;
