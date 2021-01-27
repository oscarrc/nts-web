import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Switch, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import { Synth, Sequencer } from './pages'
import { Header, Footer, Settings } from './components';

import { midiStart } from './utils/midi';
import { loadPatchLink } from './utils/patch';

import './App.css';
import "antd/dist/antd.css";

function App() {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);

  const initMidiDevices = (devices) => { 
      devices.inputDevice = devices.inputDevices.length > 0 ? devices.inputDevices[0].id : ""
      devices.outputDevice = devices.inputDevices.length >= 0 ? devices.outputDevices[0].id : ""
      dispatch({ type: "midi/setOptions", payload: devices});
  }

  useEffect( () => {
    const controls = document.createElement('script');
    const pianoroll = document.createElement('script');
    const patch = query.get('patch');
    
    controls.src= "assets/js/webaudio-controls.js";
    controls.async= true;
    controls.type="text/javascript";
    pianoroll.src= "assets/js/webaudio-pianoroll.js";
    pianoroll.async= true;
    
    document.body.appendChild(controls);
    document.body.appendChild(pianoroll);
    
    midiStart().then(
      devices => {
          dispatch({ type: "loader/loadEnd" });
          initMidiDevices(devices);
      }
    ).catch( () => dispatch({type: "display/setDisplay", payload: { screen: "nomidi" }}));
    
    if(patch) dispatch({type:'synthesizer/setControl', payload: loadPatchLink(patch)});
    // eslint-disable-next-line
  }, []);

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