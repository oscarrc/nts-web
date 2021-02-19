import { createSlice } from '@reduxjs/toolkit';
import { messages } from '../../config/display';

export const displaySlice = createSlice({
  name: 'display',
  initialState: {
    value: messages.loading
  },
  reducers: {
      setDisplay: (state, action) => {
        state.value = action.payload
      },
      setMessage: (state, action) => {
          state.value = messages[action.payload]
      }
  }
});

export const { setDisplay } = displaySlice.actions;
export const display = state => state.display.value;

export default displaySlice.reducer;
