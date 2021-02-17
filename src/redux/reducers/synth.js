import { createSlice } from '@reduxjs/toolkit';
import { controls, strings, defaults } from '../../config/synth';

const defaultPatch = defaults(controls, strings);

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
        state.value.patches[action.payload.bank ? action.payload.bank : state.value.bank] = action.payload.patch;
      },
      setControl: (state, action) => {
        if(strings[action.payload.cc] && !isNaN(action.payload.val.value)){
          let value = Math.round(action.payload.val.value / state.value.patches[state.value.bank][action.payload.cc].step);
          let index = value > state.value.patches[state.value.bank][action.payload.cc].max - 1 ? state.value.patches[state.value.bank][action.payload.cc].max : value;
          action.payload.val.svalue = strings[action.payload.cc][index];

          if( strings[action.payload.cc][index] === "Off" ){
            action.payload.val.active = 0;
            delete action.payload.val.value;
          }
        }

        state.value.patches[state.value.bank][action.payload.cc] = {
          ...state.value.patches[state.value.bank][action.payload.cc],
          ...action.payload.val
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
            p[k].step =  Math.round(127/(p[k].max)); //TEST recalculate steps and programs
          })
        })
      },
      randomize: (state) => {
        Object.keys(state.value.patches[state.value.bank]).forEach( k => {          
          const max = state.value.patches[state.value.bank][k].max || 127;
          const min = state.value.patches[state.value.bank][k].min || 0;
          const step = state.value.patches[state.value.bank][k].step || 1;
          const value = Math.floor(Math.random() * (max - min + 1) + min);
          const active = state.value.patches[state.value.bank][k].active;

          state.value.patches[state.value.bank][k].value = value < max  ? value * step : 127;
          
          if(strings[k]) state.value.patches[state.value.bank][k].svalue = strings[k][value];
          if(!isNaN(active)) state.value.patches[state.value.bank][k].active = Math.random() < 0.5 ? 1 : 0;
        })
      },
      importSynth: (state, action) =>{
        state.value = { ...state.value, ...action.payload}
      }
  }
});

export const { setPatch, setControl, setBank, setUserPrograms, randomize, importSynth } = synthSlice.actions;
export const synth = state => state.synth.value;

export default synthSlice.reducer;