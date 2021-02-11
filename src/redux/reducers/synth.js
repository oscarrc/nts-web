import { createSlice } from '@reduxjs/toolkit';

export const synthSlice = createSlice({
  name: 'synth',
  initialState: {
    value: {
        bank: 0,
        octave: 3,
        patches: []
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