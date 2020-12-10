import { createSlice } from '@reduxjs/toolkit';

export const midiSlice = createSlice({
  name: 'midi',
  initialState: {
    value: {
        outputDevices: [],
        outputDevice: {},
        outputChannel: "",
        inputDevices: {},
        inputDevice: "",
        inputChannel: "",
    },
  },
  reducers: {
    setOptions: (state, action )=> {
      state.value = { ...state.value, ...action.payload };
    },
    setDevices: (state, action) =>{
        state.value.devices = action.payload;
    }
  }
});

export const { setOptions, setDevices } = midiSlice.actions;
export const midi = state => state.midi.value;

export default midiSlice.reducer;