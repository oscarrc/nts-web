import { createSlice } from '@reduxjs/toolkit';
import { defaultPatch } from '../../config/defaults';
import { combinePayload } from '../../utils/store';

export const synthSlice = createSlice({
  name: 'synthesizer',
  initialState: {
    value: defaultPatch,
  },
  reducers: {
    setControl: (state, action) => {
      const payload = combinePayload(action.payload, state.value);
      state.value = { ...state.value, ...payload};
    }
  }
});

export const { setControl } = synthSlice.actions;
export const synth = state => state.synthesizer.value;

export default synthSlice.reducer;