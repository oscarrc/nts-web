import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Row, Col, Collapse} from 'antd';
import { Display, Live, More, Patches, Section } from '../layout';
import { controls } from '../../config/synth';

export function Synth() {
    const { Panel } = Collapse;
    const { Content } = Layout;
    const midiState = useSelector(state => state.midi).value;
    const synthState = useSelector(state => state.synth).value;
    const displayState = useSelector(state => state.display).value;
    const loading = useSelector(state => state.app).value.loading;

    return (
        <Content className="main transparent">
            <Row justify="space-between" align="top" gutter={[0,20]}>
                <Col span={24} lg={12} xl={6}>
                    <Display title={displayState.title} text={displayState.text} />
                    <Patches bank={ synthState.bank } patches={ synthState.patches } loading={ loading } />
                    <Section section={controls.osc} state={ synthState.patches[synthState.bank] } midi={ midiState } loading={ loading } />
                    <Section section={controls.arp} state={ synthState.patches[synthState.bank] } midi={ midiState } loading={ loading } />
                </Col>
                <Col span={24} lg={10} xl={4}>
                    <Section section={controls.amp} state={ synthState.patches[synthState.bank] } midi={ midiState } loading={ loading } />
                </Col>
                <Col span={24} lg={12} xl={6}>
                    <Section section={controls.effects} state={ synthState.patches[synthState.bank] } midi={ midiState } loading={ loading } />
                </Col>
                <Col span={24} lg={10} xl={4}>
                    <Section section={controls.vcf} state={ synthState.patches[synthState.bank] } midi={ midiState } loading={ loading } />
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
