import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './reducers/load';

export default configureStore({
  reducer: {
    loader: loaderReducer
  },
});
