import { createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';
import { messages } from '../../config/display';


const middleware = getDefaultMiddleware({
  serializableCheck: false
})

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
  },  
  middleware: middleware
});

export const { setDisplay } = displaySlice.actions;
export const display = state => state.display.value;

export default displaySlice.reducer;