import React from 'react';
import { Layout, Row, Col } from 'antd';
import { useHistory } from "react-router-dom";
import { Pianoroll }  from '../partials';
import { Controls } from '../layout';

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
			<Row justify="space-between">
            	<Col span={24} order={2} lg={{ order: 1, span: 20 }} className="pianoroll-wrapper">   
					<Pianoroll />
				</Col>

				<Col span={24} order={1} lg={{ order: 2, span: 4 }} >					
					<Controls />
				</Col>
			</Row>
		</Content>
	);
}