import { createSlice } from '@reduxjs/toolkit';
import { defaultPatch } from '../../config/defaults';

export const synthSlice = createSlice({
  name: 'synthesizer',
  initialState: {
    value: defaultPatch,
  },
  reducers: {
    setControl: (state, action) => {
      state.value = { ...state.value, ...action.payload};
    }
  }
});

export const { setControl } = synthSlice.actions;
export const synth = state => state.synthesizer.value;

export default synthSlice.reducer;