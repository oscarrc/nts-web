import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob } from '../knob/knob';

export function Effects() { 
    return  (
        <div>
            <Divider className="text-gold">EFFECTS</Divider>
            <Divider className="text-light">Mod</Divider>
            <Row>
                <Col span={6}>
                    <Knob name="TIME" />
                </Col>
                <Col span={6}>
                    <Knob name="DEPTH" />
                </Col>
            </Row>
            <Divider className="text-light">Delay</Divider>
            <Row>                
                <Col span={6}>
                    <Knob name="TIME" />
                </Col>
                <Col span={6}>
                    <Knob name="DEPTH" />
                </Col>
                <Col span={6}>
                    <Knob name="MIX" />
                </Col>
            </Row>
            <Divider className="text-light">Reverb</Divider>
            <Row>                
            <Col span={6}>
                    <Knob name="TIME" />
                </Col>
                <Col span={6}>
                    <Knob name="DEPTH" />
                </Col>
                <Col span={6}>
                    <Knob name="MIX" />
                </Col>
            </Row>
        </div>
    );
}