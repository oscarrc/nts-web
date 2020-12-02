import { createSlice } from '@reduxjs/toolkit';

export const displaySlice = createSlice({
  name: 'display',
  initialState: {
    value: {
        icon: "",
        title: "",
        text: ""
    },
  },
  reducers: {
    setDisplay: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setDisplay } = displaySlice.actions;

export const display = state => state.display.value;

export default displaySlice.reducer;
