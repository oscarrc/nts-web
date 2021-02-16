import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import synthReducer from './reducers/synth';
import sequencerReducer from './reducers/sequencer';
import midiReducer from './reducers/midi';
import displayReducer from './reducers/display';
import appReducer from './reducers/app';

const middleware = getDefaultMiddleware({ serializableCheck: false })

export default configureStore({
  reducer: {
    synth: synthReducer,
    sequencer: sequencerReducer,
    midi: midiReducer,
    display: displayReducer,
    app: appReducer,
  },  
  middleware: middleware
});