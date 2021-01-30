import React, { useEffect } from 'react';
import { Layout, Row, Col, Collapse} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { midiListenControlChange, midiGetUserPrograms } from '../../utils/midi';
import { pathToStore } from '../../utils/store';
import { randomPatch } from '../../utils/patch';

import { cc, synth, sysex } from '../../config/midi';

import { Display } from '../../components';
import { Amplifier, Arpegiator, Effects, More, Oscilator, Vcfilter, Live } from './partials';

export function Synth() {
  const { Panel } = Collapse;
  const { Content } = Layout;
  
  const dispatch = useDispatch();
  const history = useHistory();
  const midiConfig = useSelector(state => state.midi).value;
  const synthValues = useSelector(state => state.synthesizer).value;

  const setDisplay = (screen) => dispatch({type:'display/setDisplay', payload: { screen }});
  const setSequencer = () => history.push("/sequencer");
  const setControl = (midi) => {
    console.log(midi.data)
    // const values = cc[midi.data[1]].split('.').reduce((o,i)=>o[i], synthValues).values;
    // const value = values ? values.findIndex( v => v.value === midi.data[2]) : midi.data[2];
    // dispatch({type:'synthesizer/setControl', payload: pathToStore({}, cc[midi.data[1]], value)});
  }
  const setUserPrograms = (e) => {
    // const set = e.data.length === 53;
    // if(set) dispatch({type:'midi/setUserPgrms', payload: { tyep: type }})
    console.log(e)
  }
  const randomize = () => {
    const patch = randomPatch();  
    dispatch({type:'synthesizer/setControl', payload: patch})
  }

  useEffect(() => {
    if(midiConfig.inputDevice){
      midiListenControlChange(midiConfig.inputDevice, midiConfig.inputChannel, setControl);
      midiGetUserPrograms(midiConfig.inputDevice, midiConfig.outputDevice, midiConfig.inputChannel, midiConfig.vendor, midiConfig.device, midiConfig.channel, 4, setUserPrograms);
    }
    return () => {
      midiListenControlChange(midiConfig.inputDevice, midiConfig.inputChannel, setControl);
      midiGetUserPrograms(midiConfig.inputDevice, midiConfig.outputDevice, midiConfig.inputChannel, midiConfig.vendor, midiConfig.device, midiConfig.channel, 4, setUserPrograms);
    }
  }, [midiConfig])

  return (
    <Content className="main transparent">
        <Row justify="space-between" align="top" gutter={[0,20]} onMouseLeave={ () => setDisplay("welcome")}>
          <Col span={24} md={12} lg={6}>
            <Display />
            <Row justify="space-between" align="top">
              <Col span={24} onMouseEnter={ () => setDisplay("osc")}>
                <Oscilator spec={synth.osc} values={synthValues.osc} />
              </Col>
              <Col span={24} onMouseEnter={ () => setDisplay("arp")}>
                <Arpegiator spec={synth.arp} values={synthValues.arp} />
              </Col>
            </Row>
          </Col>          
          <Col span={24} md={10} lg={4} onMouseEnter={ () => setDisplay("amp")}>            
            <Amplifier spec={synth.amp} values={synthValues.amp} />
          </Col>
          <Col span={24} md={12} lg={6} onMouseEnter={ () => setDisplay("effects")}>
            <Effects spec={synth.effects} values={synthValues.effects} />
          </Col>          
          <Col span={24} md={10} lg={4} onMouseEnter={ () => setDisplay("vcf")}>
            <Vcfilter spec={synth.vcf} values={synthValues.vcf} />
            <More onRandom={ randomize } onSequencer={ setSequencer } />
          </Col>
        </Row>
        <Collapse className="transparent"  bordered={false} >
          <Panel showArrow={false} header={ <span className='text-gold'><strong >Live controls</strong></span> } key="1">
            <Live octave={midiConfig.octave} />
          </Panel>
        </Collapse>
    </Content>
  );
}