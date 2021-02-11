import React from 'react';
import { Layout } from 'antd';
import { useHistory } from "react-router-dom";
import { Pianoroll, Controls }  from '../partials';
import { useSelector, useDispatch } from 'react-redux';

export function Sequencer() {
	const { Content } = Layout;
	const dispatch = useDispatch();
	const history = useHistory();
	// const seqValues = useSelector(state => state.sequencer).value;  
	// const midiConfig = useSelector(state => state.midi).value; 
	
	// const setTempo = (tempo) => dispatch({type:'sequencer/setTempo', payload: { tempo: tempo }});
	// const togglePlay = () => dispatch({type: "sequencer/togglePlay"});
	// const loadSequence = async (file) => {
	// 	const sequence = await loadSequenceFile(file);
	// 	dispatch({ type: 'sequencer/setSequence', payload: { sequence: sequence }});
	// }  
	// const saveSequence = () => {
	// 	const pianoroll = document.getElementById("pianoroll");
	// 	const sequence = pianoroll.getMMLString()
	// 	dispatch({ type: 'sequencer/setSequence', payload: { sequence: sequence }});
	// 	saveSequenceFile(sequence);
	// }
	// const goBack = () => {
	// 	const pianoroll = document.getElementById("pianoroll");
	// 	dispatch({ type:'sequencer/stopPlay' });
	// 	dispatch({ type: 'sequencer/setSequence', payload: { sequence: pianoroll?.getMMLString() } });
	// 	pianoroll?.stop();
	// 	history.push("/");
	// }

	return (
		<Content className="main transparent">
			{/* <Controls 
				play={seqValues.play}
				loop={seqValues.loop}
				tempo={seqValues.tempo}
				onBack={goBack}
				onTempo={setTempo}
				onSave={saveSequence}
				onLoad={loadSequence} 
				onPlay={togglePlay} />
			<Pianoroll 
				play={seqValues.play} 
				loop={seqValues.loop} 
				tempo={seqValues.tempo} 
				sequence={seqValues.sequence} 
				outputDevice={midiConfig.outputDevice} 
				outputChannel={midiConfig.outputChannel} /> */}
		</Content>
	);
}