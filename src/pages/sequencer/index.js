import React from 'react';
import { Layout } from 'antd';
import { Pianoroll, Controls }  from './partials';
import { useSelector } from 'react-redux';

export function Sequencer() {
  const { Content } = Layout;
  const seqValues = useSelector(state => state.sequencer).value;  
  const midiConfig = useSelector(state => state.midi).value; 

  return (
    <Content className="main transparent">
      <Controls play={seqValues.play} loop={seqValues.loop} tempo={seqValues.tempo} pianoroll={"pianoroll"} />
      <Pianoroll play={seqValues.play} loop={seqValues.loop} tempo={seqValues.tempo} sequence={seqValues.sequence} outputDevice={midiConfig.outputDevice} outputChannel={midiConfig.outputChannel} />
    </Content>
  );
}