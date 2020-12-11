import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Row, Col } from 'antd';
import { Knob, Dropdown } from '../../../components';
import { amp } from '../../../config/midi';

export function Amplifier() {
    const ampValues = useSelector(state => state.synthesizer).value.amp;
    
    const renderKnobs = (opt, cols, val) => {
        let knobs = []
        
        Object.keys(opt).forEach( (knob) => {
            knobs.push(
                <Col span={cols}>
                    <Knob name={opt[knob].label} max={opt[knob].max} min={opt[knob].min} step={opt[knob].step} cc={opt[knob].cc} value={val[knob]} />
                </Col>
            )
        })

        return knobs;
    }
    
    return  (
        <div className="amp">
            <Divider className="text-gold">AMP</Divider> 
            <Row justify="space-between">                
                <Col span={24}>
                    <Dropdown name="amp" cc={ amp.type.cc } values={ amp.type.values } value={ ampValues.type } />
                </Col>
            </Row>           
            <Divider className="text-light">EG</Divider>
            <Row>
                { renderKnobs(amp.eg, 12, ampValues.eg) }
            </Row>
            <Divider className="text-light">Tremolo</Divider>
            <Row>                
                { renderKnobs(amp.trem, 12, ampValues.trem) }
            </Row>
            <Divider className="text-light">LFO</Divider>
            <Row>                
                { renderKnobs(amp.lfo, 12, ampValues.lfo) }
            </Row>
        </div>
    );
}