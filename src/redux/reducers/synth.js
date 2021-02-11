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
        state.value.patches[state.value.bank] = action.payload;
      },
      setControl: (state, action) => {
        state.value.patches[state.value.bank][action.payload.cc] = {
          ...state.value.patches[state.value.bank][action.payload.cc],
          ...action.payload.value
        };
      },
      setBank: (state, action) => {
        state.value.bank = action.payload;
      },
      setOctave: (state, action) => {
        state.value.octave = action.payload;
      },
      setUserPrograms: (state, action) => {
        Object.keys(action.payload).forEach( k => {
          state.value.patches.forEach( p => {
            p[k].max = p[k].max + action.payload[k];
            p[k].step =  Math.round(127/p[k].max);
          })
        })
      },
      randomize: (state) => {
        Object.keys(state.value.patches[state.value.bank]).forEach( k => {          
          const max = state.value.patches[state.value.bank][k].max || 127;
          const min = state.value.patches[state.value.bank][k].min;
          const step = state.value.patches[state.value.bank][k].step || 1;
		  const value = Math.floor(Math.random() * ((max ? max : 127) - (min ? min : 0) + 1) + (min ? min : 0)) * step

          state.value.patches[state.value.bank][k].value = value < max * step ? value : 127;
        })
      }
  }
});

export const { setPatch, setControl, setBank, setUserPrograms, randomize } = synthSlice.actions;
export const synth = state => state.synth.value;

export default synthSlice.reducer;