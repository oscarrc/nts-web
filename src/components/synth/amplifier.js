import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob } from '../knob/knob';

export function Amplifier() { 
    return  (
        <div>
            <Divider className="text-gold">AMP</Divider>            
            <Divider className="text-light">EG</Divider>
            <Row>
                <Col span={12}>
                    <Knob name="ATTACK" />
                </Col>
                <Col span={12}>
                    <Knob name="RELEASE" />
                </Col>
            </Row>
            <Divider className="text-light">Tremolo</Divider>
            <Row>                
                <Col span={12}>
                    <Knob name="RATE" />
                </Col>
                <Col span={12}>
                    <Knob name="DEPTH" />
                </Col>
            </Row>
            <Divider className="text-light">LFO</Divider>
            <Row>                
                <Col span={12}>
                    <Knob name="RATE" />
                </Col>
                <Col span={12}>
                    <Knob name="DEPTH" />
                </Col>
            </Row>
        </div>
    );
}