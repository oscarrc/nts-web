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
    },
    octaveUp: (state) => {
      const octave = state.value.octave;
      state.value.octave = octave < 7 ? octave + 1 : octave;
    },
    octaveDown: (state) => {
      const octave = state.value.octave;
      state.value.octave = octave !== 0 ? octave - 1 : 0;
    }
  }
});

export const { setOptions, toggleSettings, octaveUp, octaveDown } = midiSlice.actions;
export const midi = state => state.midi.value;

export default midiSlice.reducer;