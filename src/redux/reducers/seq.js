import { createSlice } from '@reduxjs/toolkit';

export const seqSlice = createSlice({
  name: 'sequencer',
  initialState: {
    value: {
        play: false,
        loop: 1,
        tempo: 120
    },
  },
  reducers: {
    togglePlay: state => {
      state.value.play = !state.value.play;
    },
    toggleLoop: state => {
        state.value.loop = state.value.loop ? 0 : 1;
    },
    setTempo: (state, action) => {
        state.value.tempo = action.payload.tempo;
    }
  }
});

export const { togglePlay, toggleLoop, setTempo } = seqSlice.actions;
export const seq = state => state.sequencer.value;

export default seqSlice.reducer;