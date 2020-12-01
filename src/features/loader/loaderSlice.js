import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    value: true,
  },
  reducers: {
    start: state => {
      state.value = true;
    },
    end: state => {
        state.value = false;
      }
  }
});

export const { start, end } = loaderSlice.actions;

export const loading = state => state.loader.value;

export default loaderSlice.reducer;
