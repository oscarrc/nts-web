import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Row, Col } from 'antd';
import { Pianoroll }  from '../partials';
import { Controls } from '../layout';
import { midiPlayNote, } from '../../utils/midi';

export function Sequencer() {
	const { Content } = Layout;
	const seqState = useSelector(state => state.sequencer).value;  
	const midiConfig = useSelector(state => state.midi).value; 
	const playNote = (note, duration) => midiPlayNote(note, midiConfig.outputDevice, midiConfig.outputChannel, true, false, duration);
	
	return (
		<Content className="main transparent">
			<Row justify="space-between">
            	<Col span={24} order={2} lg={{ order: 1, span: 20 }} className="pianoroll-wrapper">   
					<Pianoroll onPlay={playNote} tempo={seqState.tempo} play={seqState.play} loop={seqState.loop} sequence={seqState.sequences[seqState.bank]}/>
				</Col>

				<Col span={24} order={1} lg={{ order: 2, span: 4 }} >					
					<Controls tempo={seqState.tempo} play={seqState.play} loop={seqState.loop} bank={seqState.bank} />
				</Col>
			</Row>
		</Content>
	);
}