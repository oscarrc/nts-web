import React, { useEffect } from 'react';
import { Layout } from 'antd';

import { Synth } from './pages'
import { Header, Footer } from './components';

import './App.css';
import "antd/dist/antd.css";

function App() {
  useEffect( () => {
    const controls = document.createElement('script');
    const pianoroll = document.createElement('script');

    controls.src= "assets/js/webaudio-controls.js";
    controls.async= true;
    pianoroll.src= "assets/js/webaudio-pianoroll.js";
    pianoroll.async= true;

    document.body.appendChild(controls);
    document.body.appendChild(pianoroll);
  })

  return (
    <Layout id="app">
      <Header/>
      <Synth />
      <Footer />
    </Layout>
  );
}

export default App;