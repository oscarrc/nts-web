import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Header, Footer, Settings } from './components/layout';
import { Synth, Sequencer } from './components/views';
import { midiStart, midiListenPassthrough, midiListenControlChange, midiGetUserPrograms, midiDeviceDetection } from './utils/midi';
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
			
			if(devices.inputDevice && devices.outputDevice) {
				dispatch({ type: "display/setMessage", payload: "welcome" });
				dispatch({ type: "app/stopLoading" });
			} else return Promise.reject("nodevice");
			
			return midiGetUserPrograms(devices.inputDevice, devices.outputDevice, midiState.inputChannel, midiState.sysexVendor, midiState.sysexDevice, midiState.sysexChannel);
		}).then( userProgs => {			
			dispatch({ type: "synth/setUserPrograms", payload: userProgs});			
		}).catch( err => {
			console.log(err)
			dispatch({ type: "display/setMessage", payload: err ? err : "error" });
		}).finally(() => midiDeviceDetection((e) => setNewDevice(e)))
	}

	const initPassthrough = (midi) => midiListenPassthrough(midi.passthroughDevice, midi.pasthroughChannel, midi.outputDevice, midi.outputChannel);
	const initControlChange = (midi) => midiListenControlChange(midi.inputDevice, midi.inputChannel, (e) => {
		dispatch({ type: "synth/setControl", payload: {
			cc: e.data[1],
			val: { value: e.data[2] }
		}});
	});

	const setNewDevice = (e) => {
		const isNTS = e.port.name.includes("NTS");
		const isPass = !isNTS && e.port.id.includes("input");
		const connected = e.type === "connected";

		if(isNTS || isPass)
			dispatch({ type: `midi/${connected ? "add" : "remove"}Device`, payload: {
				id: e.port.id,
				name: e.port.name,
				type: isNTS ? (e.port.id.includes("input") ? "input" : "output" ) : "passthrough"
			}});
		
		if(isNTS) {
			dispatch({ type: "display/setMessage", payload: connected ? "welcome" : "nodevice" });
			dispatch({ type: `app/${connected ? "stop" : "start"}Loading` });
		}

		if(isPass && connected) dispatch({ type: "display/setMessage", payload: "newdevice" });
	}
	
	useEffect( () => {
		initScripts(scripts);
		initMidi();
		// eslint-disable-next-line
	}, [])

	useEffect( () => {
		initPassthrough(midiState);
		initControlChange(midiState);
		return () => { 
			initPassthrough(midiState);
			initControlChange(midiState);
		}
		// eslint-disable-next-line
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