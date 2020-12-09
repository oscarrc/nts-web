import { createSlice } from '@reduxjs/toolkit';

export const synthSlice = createSlice({
  name: 'synthesizer',
  initialState: {
    value: {
        osc: {

        },
        arp: {

        },
        amp:{

        },
        effects: {

        },
        vcf:{

        }
    },
  },
  reducers: {
    loadStart: state => {
      state.value = true;
    },
    loadEnd: state => {
      state.value = false;
    }
  }
});

export const { loadStart, loadEnd } = synthSlice.actions;
export const synth = state => state.synthesizer.value;

export default synthSlice.reducer;