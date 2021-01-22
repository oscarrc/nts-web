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

  useEffect( () => {
    // const options = document.createElement('script');
    const controls = document.createElement('script');
    const pianoroll = document.createElement('script');
    const patch = query.get('patch');
    
    // options.src= "assets/js/webaudio-options.js";
    // options.async= true;
    controls.src= "assets/js/webaudio-controls.js";
    controls.async= true;
    controls.type="text/javascript";
    pianoroll.src= "assets/js/webaudio-pianoroll.js";
    pianoroll.async= true;
    
    // if(options !== HTMLElement) document.body.appendChild(options);
    document.body.appendChild(controls);
    document.body.appendChild(pianoroll);
    
    midiStart().then(
      devices => {
          if( devices.inputDevices.length ) devices.inputDevice = devices.inputDevices[0].id;
          if( devices.outputDevices.length ) devices.outputDevice = devices.outputDevices[0].id;

          dispatch({ type: "loader/loadEnd" });
          dispatch({ type: "midi/setOptions", payload: devices})
      }
    ).catch( err => dispatch({type: "display/setDisplay", payload: { screen: "nomidi" }})); // TODO properly handle no midi
    
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