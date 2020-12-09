import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob, Selector } from '../../../components';

export function Arpegiator() { 
    return  (
        <div className="arp">
            <Divider className="text-gold">ARP</Divider>
            <Row className="padded-row" justify="space-between">   
                <Col span={24}>
                    <Selector name="TYPE" />
                </Col>
                <Col span={24}>
                    <Knob name="LENGTH" />
                </Col>
                <Col span={24}>                    
                    <Knob name="INTERVAL" />
                </Col>
            </Row>
        </div>
        
    );
}