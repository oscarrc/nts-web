import { createSlice } from '@reduxjs/toolkit';

export const midiSlice = createSlice({
  name: 'midi',
  initialState: {
    value: {
        deviceId: "",
        outputDevice: "",
        outputChannel: "",
        inputDevice: "",
        inputChannel: "",
        devices: []
    },
  },
  reducers: {
    setOptions: (state, action )=> {
      state.value = action.payload;
    },
    setDevices: (state, action) =>{
        state.value.devices = action.payload;
    }
  }
});

export const { setOptions, setDevices } = midiSlice.actions;
export const midi = state => state.midi.value;

export default midiSlice.reducer;