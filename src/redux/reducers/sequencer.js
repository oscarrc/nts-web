import { createSlice } from '@reduxjs/toolkit';

export const seqSlice = createSlice({
  name: 'sequencer',
  initialState: {
    value: {
        play: false,
        loop: 1,
        tempo: 120,
        bank: 0,
        sequences: ["","","","","",""]
    }
  },
  reducers: {
      setOptions: (state, action) => {
          state.value = { ...state.value, ...action.payload}
      },
      setSequence: (state, action) => {
          state.value.sequences[state.value.seq] = action.payload;
      },
      setBank: (state, action) => {
          state.value.bank = action.payload;
      }
  }
});

export const { setOptions, setSequence, setBank } = seqSlice.actions;
export const sequencer = state => state.sequencer.value;

export default seqSlice.reducer;