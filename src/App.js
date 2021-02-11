import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Header, Footer, Settings } from './components/layout';
import { Synth, Sequencer } from './components/views';
import { midiStart, midiListenPassthrough, midiListenControlChange, midiGetUserPrograms } from './utils/midi';
import { channels } from './config/midi';
import "antd/dist/antd.css";
import './App.css';

const scripts = ["assets/js/webaudio-controls.js",  "assets/js/webaudio-pianoroll.js"]

function App(){  
	const dispatch = useDispatch();
	const appState = useSelector(state => state.app).value;
	const midiState = useSelector(state => state.midi).value;

	const initScripts = (scripts) => {
		scripts.forEach( s => {
			if(!document.querySelector(`script[src="${s}"`)){
				const current = document.createElement('script');
				current.src= s;
				current.async= true;
				current.type="text/javascript";
				document.body.appendChild(current);
			}
		})
	}

	const initMidi = () => {
		midiStart().then( devices => {
			dispatch({ type: "midi/setOptions", payload: devices});
			dispatch({ type: "app/toggleLoading" });
			
			if(devices.inputDevice && devices.outputDevice) dispatch({ type: "display/setMessage", payload: "welcome" });
			else return Promise.reject("nodevice");
			
			return midiGetUserPrograms(midiState.inputDevice, midiState.outputDevice, midiState.sysexVendor, midiState.sysexDevice, midiState.sysexChannel);
		}).then( count => {
			dispatch({ type: "synth/setUserPrograms", payload: count});			
		}).catch( err => {
			dispatch({ type: "display/setMessage", payload: err ? err : "error" });
		});
	}

	const initPassthrough = (midi) => midiListenPassthrough(midi.passthorughDevice, midi.pasthroughChannel, midi.outputDevice, midi.outputChannel);
	const initControlChange = (midi) => midiListenControlChange(midi.inputDevice, midi.inputChannel, (e) => {
		dispatch({ type: "synth/setControl", payload: {
			cc: e.data[1],
			val: { value: e.data[2] }
		}});
	});
	
	useEffect( () => {
		initScripts(scripts);
		initMidi();
	}, [])

	useEffect( () => {
		initPassthrough(midiState);
		initControlChange(midiState);
		return () => { 
			initPassthrough(midiState);
			initControlChange(midiState);
		}
	}, [midiState])

	return (
		<Layout id="app">
			<Header/>
			<Switch>
				<Route exact path="/" component={Synth} />
				<Route exact path="/sequencer" component={Sequencer} />
			</Switch>
			<Footer />
			<Settings visible={ appState.settings } settings={ midiState } channels={channels} />
		</Layout>
	);
}

export default App;