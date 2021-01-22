import { configureStore } from '@reduxjs/toolkit';
import displayReducer from './reducers/display';
import loaderReducer from './reducers/load';
import synthReducer from './reducers/synth';
import midiReducer from './reducers/midi';
import seqReducer from './reducers/seq';

export default configureStore({
  reducer: {
    display: displayReducer,
    loader: loaderReducer,
    midi: midiReducer,
    synthesizer: synthReducer,
    sequencer: seqReducer
  },
});
