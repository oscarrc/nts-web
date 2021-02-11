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
      toggleLoading: (state) => {
          state.value.loading = !state.value.loading
      },
      toggleSettings: (state) => {
        state.value.settings = !state.value.settings
    }
  }
});

export const { toggleLoading, toggleSettings } = appSlice.actions;
export const app = state => state.app.value;

export default appSlice.reducer;