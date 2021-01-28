import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob, Dropdown } from '../../../components';

export function Amplifier(props) {
    const ampValues = props.values;
    const amp = props.spec;

    const renderKnobs = (opt, cols, val, path) => {
        let knobs = []
        
        Object.keys(opt).forEach( (knob) => {
            knobs.push(
                <Col span={cols} key={opt[knob].label + opt[knob].cc}>
                    <Knob 
                        name={opt[knob].label} 
                        max={opt[knob].max} 
                        min={opt[knob].min} 
                        step={opt[knob].step} 
                        cc={opt[knob].cc} 
                        value={val[knob]}
                        path={ path + '.' + opt[knob].label.toLowerCase() }
                    />
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
                    <Dropdown name="amp" cc={ amp.type.cc } values={ amp.type.values } value={ ampValues.type } path="amp.type" />
                </Col>
            </Row>           
            <Divider className="text-light">EG</Divider>
            <Row>
                { renderKnobs(amp.eg, 12, ampValues.eg, 'amp.eg') }
            </Row>
            <Divider className="text-light">Tremolo</Divider>
            <Row>                
                { renderKnobs(amp.trem, 12, ampValues.trem, 'amp.trem') }
            </Row>
            <Divider className="text-light">LFO</Divider>
            <Row>                
                { renderKnobs(amp.lfo, 12, ampValues.lfo, 'amp.lfo') }
            </Row>
        </div>
    );
}