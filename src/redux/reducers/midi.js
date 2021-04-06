import { createSlice } from '@reduxjs/toolkit';
import { defaults } from '../../config/midi';

export const midiSlice = createSlice({
  name: 'midi',
  initialState: {
    value: defaults
  },
  reducers: {
      setOptions: (state, action) => {
          state.value = { ...state.value, ...action.payload}
      },
      addDevice: (state, action) => {
        const index = state.value[action.payload.type + "Devices"].findIndex( d => d.id === action.payload.id && d.name === action.payload.name );
        if(index < 0) state.value[action.payload.type + "Devices"].push({ id: action.payload.id, name: action.payload.name });
        if(state.value[action.payload.type + "Device"] === "") state.value[action.payload.type + "Device"] = action.payload.id;
      },
      removeDevice: (state, action) => {
        const index = state.value[action.payload.type + "Devices"].findIndex( d => d.id === action.payload.id && d.name === action.payload.name );
        if(index >= 0) state.value[action.payload.type + "Devices"].splice(index, 1);
        if(state.value[action.payload.type + "Device"] === action.payload.id) state.value[action.payload.type + "Device"] = state.value[action.payload.type + "Devices"][0]?.id || "";
      }
  }
});

export const { setOptions, addDevice, removeDevice } = midiSlice.actions;
export const midi = state => state.midi.value;

export default midiSlice.reducer;