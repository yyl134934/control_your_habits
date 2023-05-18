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
    setEntries: (state, action: PayloadAction<Entry[]>) => {
      state.entries = action.payload;
    },
    addEntry: (state, action: PayloadAction<Entry>) => {
      state.entries.push(action.payload);
      state.entries = state.entries.sort((a, b) => {
        if (Number.parseFloat(a.habitWeight) < Number.parseFloat(b.habitWeight)) {
          return -1;
        }
        if (Number.parseFloat(a.habitWeight) > Number.parseFloat(b.habitWeight)) {
          return 1;
        }
        return 0;
      });
    },
    deleteEntry: (state, action: PayloadAction<Entry>) => {
      state.entries = state.entries.filter((entry) => !objectEqual(entry, action.payload));
    },
    createHabitCard: (state, action: PayloadAction<Array<Entry>>) => {
      state.entries = action.payload;
    },
    updateEntry: (state, action: PayloadAction<Entry>) => {
      state.entries = updateObjectInArray(state.entries, action.payload);
    },
  },
});

export const { addEntry, setEntries, deleteEntry, createHabitCard, updateEntry } = entriesSlice.actions;

export default entriesSlice.reducer;
