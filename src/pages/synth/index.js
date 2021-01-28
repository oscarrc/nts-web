import React, { useEffect } from 'react';
import { Layout, Row, Col, Collapse} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { Display } from '../../components';
import { Amplifier, Arpegiator, Effects, More, Oscilator, Vcfilter, Live } from './partials';

import { midiListenControlChange } from '../../utils/midi';
import { pathToStore } from '../../utils/store';
import { randomPatch } from '../../utils/patch';

import { cc, synth } from '../../config/midi';

export function Synth() {
  const { Panel } = Collapse;
  const { Content } = Layout;
  
  const dispatch = useDispatch();
  const history = useHistory();
  const midiConfig = useSelector(state => state.midi).value;
  const synthValues = useSelector(state => state.synthesizer).value;

  const setDisplay = (screen) => dispatch({type:'display/setDisplay', payload: { screen }});
  const setControl = (midi) => dispatch({type:'synthesizer/setControl', payload: pathToStore({}, cc[midi.data[1]], midi.data[2])});
  const setSequencer = () => history.push("/sequencer");
  const randomize = () => {
    const patch = randomPatch();  
    dispatch({type:'synthesizer/setControl', payload: patch});
  }

  useEffect(() => {
    if(midiConfig.inputDevice) midiListenControlChange(setControl, midiConfig.inputDevice, midiConfig.inputChannel);
    return () => midiListenControlChange(setControl, midiConfig.inputDevice, midiConfig.inputChannel, false);
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