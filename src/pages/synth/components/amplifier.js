import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob, Dropdown } from '../../../components';
import { amp } from '../../../config/midi';

export function Amplifier() { 
    const renderKnobs = (opt, cols) => {
        let knobs = []

        Object.keys(opt).forEach( (knob) => {
            knobs.push(
                <Col span={cols}>
                    <Knob name={opt[knob].label} max={opt[knob].max} min={opt[knob].min} step={opt[knob].step} cc={opt[knob].cc} value="0" />
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
                    <Dropdown name="amp" cc={ amp.type.cc } values={ amp.type.values } />
                </Col>
            </Row>           
            <Divider className="text-light">EG</Divider>
            <Row>
                { renderKnobs(amp.eg, 12) }
            </Row>
            <Divider className="text-light">Tremolo</Divider>
            <Row>                
                { renderKnobs(amp.trem, 12) }
            </Row>
            <Divider className="text-light">LFO</Divider>
            <Row>                
                { renderKnobs(amp.lfo, 12) }
            </Row>
        </div>
    );
}