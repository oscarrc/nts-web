import { createSlice } from '@reduxjs/toolkit';

export const displaySlice = createSlice({
  name: 'display',
  initialState: {
    value: "welcome",
  },
  reducers: {
    setDisplay: (state, action) => {
      state.value = action.payload.screen;
    }
  }
});

export const { setDisplay } = displaySlice.actions;
export const screen = state => state.display.value;

export default displaySlice.reducer;
