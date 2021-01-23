import { createSlice } from '@reduxjs/toolkit';

export const seqSlice = createSlice({
  name: 'sequencer',
  initialState: {
    value: {
        play: false,
        loop: 1,
        tempo: 120,
        sequence: "",
    },
  },
  reducers: {
    togglePlay: state => {
      state.value.play = !state.value.play;
    },
    stopPlay: state => {
      state.value.play = false;
    },
    toggleLoop: state => {
        state.value.loop = state.value.loop ? 0 : 1;
    },
    setTempo: (state, action) => {
        state.value.tempo = action.payload.tempo;
    },
    setSequence: (state, action) => {
      state.value.sequence = action.payload.sequence;
    }
  }
});

export const { togglePlay, stopPlay, toggleLoop, setTempo, setSequence } = seqSlice.actions;
export const seq = state => state.sequencer.value;

export default seqSlice.reducer;