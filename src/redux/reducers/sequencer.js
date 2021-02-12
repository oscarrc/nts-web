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
      setSequence: (state, action) => {
          state.value.sequences[action.payload.bank ? action.payload.bank : state.value.bank] = action.payload.sequence;
      },
      setBank: (state, action) => {
          state.value.bank = action.payload;
      },
      setTempo: (state, action) => {
          state.value.tempo = action.payload;
      },
      togglePlay: (state) => {
        state.value.play = !state.value.play;
      },
      toggleLoop: (state) => {
        state.value.loop = state.value.loop ? 0 : 1;
      },
      stopPlay: (state) => {
        state.value.play = false;
      }
  }
});

export const { setOptions, setSequence, setBank, setTempo, toggleLoop } = seqSlice.actions;
export const sequencer = state => state.sequencer.value;

export default seqSlice.reducer;