import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './reducers/load';
import synthReducer from './reducers/synth';
import midiReducer from './reducers/midi';

export default configureStore({
  reducer: {
    loader: loaderReducer,
    midi: midiReducer,
    synthesizer: synthReducer
  },
});
