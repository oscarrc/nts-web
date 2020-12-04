import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob } from '../knob/knob';

export function Vcfilter() { 
    return  (
        <div>
            <Divider className="text-gold">VCF</Divider>                       
            <Divider className="text-light">Filter</Divider>
            <Row>
                <Col span={12}>
                    <Knob name="CUTOFF" />
                </Col>
                <Col span={12}>
                    <Knob name="RESONANCE" />
                </Col>
            </Row>
            <Divider className="text-light">Sweep</Divider>
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