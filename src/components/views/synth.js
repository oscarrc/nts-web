import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Collapse} from 'antd';
import { midiPlayNote } from '../../utils/midi';
import { Display, Section } from '../layout';
import { controls, strings } from '../../config/synth';

export function Synth() {
    const { Panel } = Collapse;
    const { Content } = Layout;
    const dispatch = useDispatch();
    const midiState = useSelector(state => state.midi).value;
    const synthState = useSelector(state => state.synth).value;
    const displayState = useSelector(state => state.display).value;

    const playNote = (note) => midiPlayNote(note[1], midiState.outputDevice, midiState.outputChannel, note[0]);
    const setOctave = (octave) => dispatch({type:'synthesizer/setControl', payload: octave});
    const setDisplay = (title, text) => dispatch({type:'display/setDisplay', payload: { title, text }});

    return (
        <Content className="main transparent">
            <Row justify="space-between" align="top" gutter={[0,20]} onMouseLeave={ () => dispatch({ type: "display/setMessage", payload: "welcome" })}>
                <Col span={24} md={12} lg={6}>
                    <Display title={displayState.title} text={displayState.text} />
                    <Section section={controls.osc} name="OSC" midi={midiState} synth={synthState} />
                    <Section section={controls.arp} name="ARP" midi={midiState} synth={synthState} />
                </Col>
                <Col span={24} md={10} lg={4}>
                    <Section section={controls.amp} name="AMP" midi={midiState} synth={synthState} />
                </Col>
                <Col span={24} md={12} lg={6}>
                    <Section section={controls.effects} name="EFFECTS" midi={midiState} synth={synthState} />
                </Col>
                <Col span={24} md={10} lg={4}>
                    <Section section={controls.vcf} name="VCF" midi={midiState} synth={synthState} />
                </Col>
            </Row>
        </Content>
    );
};
