import React from 'react';
import { Layout } from 'antd';
import { Pianoroll, Controls }  from './partials';
import { useSelector, useDispatch } from 'react-redux';

export function Sequencer() {
  const { Content } = Layout;
  const dispatch = useDispatch();
  const seqValues = useSelector(state => state.sequencer).value;  
  const midiConfig = useSelector(state => state.midi).value; 
  const setSequence = (event) => dispatch({ type: 'sequencer/setSequence', payload: { sequence: event.sequence }});
  const setTempo = (event) => dispatch({type:'sequencer/setTempo', payload: { tempo: event.tempo }});
  const togglePlay = (event) => {
    if(event.stop) dispatch({ type:'sequencer/stopPlay' });
    else dispatch({type:'sequencer/togglePlay'});
  }

  return (
    <Content className="main transparent">
      <Controls play={seqValues.play} loop={seqValues.loop} tempo={seqValues.tempo} pianoroll={"pianoroll"} />
      <Pianoroll play={seqValues.play} loop={seqValues.loop} tempo={seqValues.tempo} sequence={seqValues.sequence} outputDevice={midiConfig.outputDevice} outputChannel={midiConfig.outputChannel} />
    </Content>
  );
}