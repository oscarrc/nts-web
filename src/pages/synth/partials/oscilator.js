import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob, Selector } from '../../../components';

export function Oscilator(props) { 
    const oscValues = props.values;
    const osc = props.spec;

    return  (        
        <div className="osc">
            <Divider className="text-gold">OSC</Divider>
            <Row justify="space-between" className="padded-row">
                <Col span={6}>
                    <Selector 
                        name="TYPE"
                        max={ osc.type.values.length - 1 }
                        values={ osc.type.values }
                        cc={ osc.type.cc }
                        value={ oscValues.type }
                        path="osc.type" 
                    />
                </Col>
                <Col span={6}>
                    <Knob 
                        name={osc.shape.label}
                        max={osc.shape.max}
                        min={osc.shape.min}
                        step={osc.shape.step}
                        cc={osc.shape.cc}
                        value={ oscValues.shape } 
                        path="osc.shape" 
                    />
                </Col>
                <Col span={6}>
                    <Knob 
                        name={osc.alt.label}
                        max={osc.alt.max}
                        min={osc.alt.min}
                        step={osc.alt.step}
                        cc={osc.alt.cc}
                        value={ oscValues.alt }
                        path="osc.alt" 
                    />
                </Col>
            </Row>
        </div>
    );
}