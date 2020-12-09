import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob, Selector } from '../../../components';

export function Oscilator() { 
    return  (        
        <div className="osc">
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