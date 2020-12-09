import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './reducers/load';
import synthReducer from './reducers/synth';

export default configureStore({
  reducer: {
    loader: loaderReducer,
    synthesizer: synthReducer
  },
});
