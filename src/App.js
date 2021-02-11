import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Header, Footer, Settings } from './components/layout';
import { channels } from './config/midi';
import "antd/dist/antd.css";
import './App.css';

function App(){  
	const dispatch = useDispatch();
	const appState = useSelector(state => state.app).value;
	const midiState = useSelector(state => state.midi).value;
	
	return (
		<Layout id="app">
			<Header/>
			<Switch>
				{/* <Route exact path="/" component={Synth} />
				<Route exact path="/sequencer" component={Sequencer} /> */}
			</Switch>
			<Footer />
			<Settings visible={ appState.settings } settings={ midiState } channels={channels} />
		</Layout>
	);
}

export default App;