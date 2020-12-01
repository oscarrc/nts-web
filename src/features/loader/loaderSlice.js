import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    value: true,
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

export const { loadStart, loadEnd } = loaderSlice.actions;

export const loading = state => state.loader.value;

export default loaderSlice.reducer;
