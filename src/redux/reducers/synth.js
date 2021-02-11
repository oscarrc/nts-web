import { createSlice } from '@reduxjs/toolkit';
import { controls, defaults } from '../../config/synth';

const defaultPatch = defaults(controls);

export const synthSlice = createSlice({
  name: 'synth',
  initialState: {
    value: {
        bank: 0,
        octave: 3,
        patches: [
          defaultPatch,
          defaultPatch,
          defaultPatch,
          defaultPatch,
          defaultPatch,
          defaultPatch
        ]
    }
  },
  reducers: {
      setPatch: (state, action) => {
      },
      setControl: (state, action) => {
      },
      setBank: (state, action) => {
      },
      setOctave: (state, action) => {
      },
      setUserPrograms: (state, action) => {
      },
      randomize: (state) => {
      }
  }
});

export const { setPatch, setControl, setBank, setUserPrograms, randomize } = synthSlice.actions;
export const synth = state => state.synth.value;

export default synthSlice.reducer;