import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Switch, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import { Synth, Sequencer } from './pages'
import { Header, Footer, Settings } from './components';

import { midiStart } from './utils/midi';
import { loadPatchLink } from './utils/patch';
import { loadEnd } from  './redux/reducers/load';
import { setOptions } from  './redux/reducers/midi';
import { setControl } from  './redux/reducers/synth';

import './App.css';
import "antd/dist/antd.css";

function App() {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);

  useEffect( () => {
    const controls = document.createElement('script');
    const pianoroll = document.createElement('script');
    const patch = query.get('patch');

    controls.src= "assets/js/webaudio-controls.js";
    controls.async= true;
    pianoroll.src= "assets/js/webaudio-pianoroll.js";
    pianoroll.async= true;

    document.body.appendChild(controls);
    document.body.appendChild(pianoroll);
    
    midiStart().then(
      devices => {
          devices.inputDevices = devices.inputDevices.map( d => { return {id: d.id, name: d.name } })
          devices.outputDevices = devices.outputDevices.map( d => { return {id: d.id, name: d.name } })
          if( devices.inputDevices.length ) devices.inputDevice = devices.inputDevices[0].id;
          if( devices.outputDevices.length ) devices.outputDevice = devices.outputDevices[0].id;

          dispatch(loadEnd());
          dispatch(setOptions(devices))
      }
    );
    
    //TODO Fix patch not loading
    if(patch) dispatch(setControl(loadPatchLink(patch)));
  });

  return (
    <Layout id="app">
      <Header/>
      <Switch>
          <Route exact path="/" component={Synth} />
          <Route exact path="/sequencer" component={Sequencer} />
      </Switch>
      <Footer />
      <Settings />
    </Layout>
  );
}

export default App;