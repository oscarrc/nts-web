import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob, Selector } from '../../../components';
import { arp } from '../../../config/midi';

export function Arpegiator() {     
    return  (
        <div className="arp">
            <Divider className="text-gold">ARP</Divider>
            <Row className="padded-row" justify="space-between">   
                <Col span={6}>
                    <Selector name="TYPE" max={ arp.type.values.length - 1 } values={ arp.type.values } cc={ arp.type.cc } />
                </Col>
                <Col span={6}>
                    <Selector name="SCALE" max={ arp.scale.values.length - 1 } values={ arp.scale.values } cc={ arp.scale.cc } />
                </Col>
                <Col span={6}>      
                    <Knob name={arp.length.label} max={arp.length.max} min={arp.length.min} step={arp.length.step} cc={arp.length.cc} value="0" />
                </Col>
            </Row>
        </div>
        
    );
}