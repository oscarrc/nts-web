import React from 'react';

import './App.css';
import { useSelector } from 'react-redux';
import { Loader } from './features/loader/loader';
import { Synth } from './features/synth/synth';
import { loading } from './features/loader/loaderSlice';

function App() {
  const isLoading = useSelector(loading);

  return (
    <main id="app">
      { isLoading ? <Loader /> : <Synth /> }
    </main>
  );
}

export default App;