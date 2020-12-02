import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loaderReducer from '../features/loader/loader';

export default configureStore({
  reducer: {
    counter: counterReducer,
    loader: loaderReducer
  },
});
