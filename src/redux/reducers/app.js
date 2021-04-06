import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    value: {
        loading: true,
        settings: false
    }
  },
  reducers: {
      startLoading: (state) => {
        state.value.loading = true
      },
      stopLoading: (state) => {
        state.value.loading = false
      },
      toggleSettings: (state) => {
        state.value.settings = !state.value.settings
    }
  }
});

export const { startLoading, stopLoading, toggleSettings } = appSlice.actions;
export const app = state => state.app.value;

export default appSlice.reducer;