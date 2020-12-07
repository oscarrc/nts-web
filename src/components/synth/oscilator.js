import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob } from '../knob/knob';
import { Selector } from '../selector/selector';

export function Oscilator() { 
    return  (        
        <div>
            <Divider className="text-gold">OSC</Divider>
            <Row justify="space-between" className="padded-row">
                <Col span={24}>
                    <Selector name="TYPE" />
                </Col>
                <Col span={24}>
                    <Knob name="SHAPE" />
                </Col>
                <Col span={24}>
                    <Knob name="ALT" />
                </Col>
            </Row>
        </div>
    );
}