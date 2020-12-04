import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob } from '../knob/knob';

export function Oscilator() { 
    return  (        
        <div>
            <Divider className="text-gold">OSC</Divider>
            <Row>
                <Col span={8}>
                    <Knob name="SHAPE" />
                </Col>
                <Col span={8}>
                    <Knob name="TYPE" />
                </Col>
                <Col span={8}>
                    <Knob name="ALT" />
                </Col>
            </Row>
        </div>
    );
}