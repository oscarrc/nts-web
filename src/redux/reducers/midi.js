import { createSlice } from '@reduxjs/toolkit';

export const midiSlice = createSlice({
  name: 'midi',
  initialState: {
    value: {
        outputDevices: [],
        outputDevice: {},
        outputChannel: "",
        inputDevices: [],
        inputDevice: "",
        inputChannel: "",
        settings: false
    },
  },
  reducers: {
    setOptions: (state, action )=> {
      state.value = { ...state.value, ...action.payload };
    },
    setDevices: (state, action) =>{
        state.value.devices = action.payload;
    },
    toggleSettings: (state) => {
      state.value.settings = !state.value.settings;
    }
  }
});

export const { setOptions, setDevices, toggleSettings } = midiSlice.actions;
export const midi = state => state.midi.value;
export const settings = state => state.midi.value.settings;

export default midiSlice.reducer;