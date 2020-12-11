import { createSlice } from '@reduxjs/toolkit';
import { defaultPath } from '../../config/defaults';

export const synthSlice = createSlice({
  name: 'synthesizer',
  initialState: {
    value: defaultPath,
  },
  reducers: {
    setControl: (state, action) => {
      console.log(action)
      state.value = { ...state.value, ...action.payload};
    }
  }
});

export const { setControl } = synthSlice.actions;
export const synth = state => state.synthesizer.value;

export default synthSlice.reducer;