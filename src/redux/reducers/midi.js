import { createSlice } from '@reduxjs/toolkit';
import { defaultSettings } from '../../config/defaults';

export const midiSlice = createSlice({
  name: 'midi',
  initialState: {
    value: defaultSettings
  },
  reducers: {
    setOptions: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    toggleSettings: (state) => {
      state.value.settings = !state.value.settings;
    }
  }
});

export const { setOptions, setDevices, toggleSettings } = midiSlice.actions;
export const midi = state => state.midi.value;

export default midiSlice.reducer;