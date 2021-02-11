import { createSlice } from '@reduxjs/toolkit';
import { defaults } from '../../config/midi';

export const midiSlice = createSlice({
  name: 'midi',
  initialState: {
    value: defaults
  },
  reducers: {
      setOptions: (state, action) => {
          state.value = { ...state.value, ...action.payload}
      }
  }
});

export const { setOptions } = midiSlice.actions;
export const midi = state => state.midi.value;

export default midiSlice.reducer;