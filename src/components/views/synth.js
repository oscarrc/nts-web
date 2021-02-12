import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Collapse} from 'antd';
import { Display, Live, More, Patches, Section } from '../layout';
import { controls } from '../../config/synth';

export function Synth() {
    const { Panel } = Collapse;
    const { Content } = Layout;
    const dispatch = useDispatch();
    const midiState = useSelector(state => state.midi).value;
    const synthState = useSelector(state => state.synth).value;
    const displayState = useSelector(state => state.display).value;

    const setDisplay = (title, text) => dispatch({type:'display/setDisplay', payload: { title, text }});

    return (
        <Content className="main transparent">
            <Row justify="space-between" align="top" gutter={[0,20]}>
                <Col span={24} md={12} lg={6}>
                    <Display title={displayState.title} text={displayState.text} />
                    <Patches bank={ synthState.bank } patches={ synthState.patches } />
                    <Section section={controls.osc} state={ synthState } midi={ midiState } />
                    <Section section={controls.arp} state={ synthState } midi={ midiState } />
                </Col>
                <Col span={24} md={10} lg={4}>
                    <Section section={controls.amp} state={ synthState } midi={ midiState } />
                </Col>
                <Col span={24} md={12} lg={6}>
                    <Section section={controls.effects} state={ synthState } midi={ midiState } />
                </Col>
                <Col span={24} md={10} lg={4}>
                    <Section section={controls.vcf} state={ synthState } midi={ midiState } />
                    <More />
                </Col>
            </Row>
            <Collapse className="transparent live"  bordered={false} >
                <Panel showArrow={false} header={ <span className='text-gold'><strong >Live controls</strong></span> } key="1">
                    <Live midi={ midiState } octave={ synthState.octave } />
                </Panel>
            </Collapse>
        </Content>
    );
};
