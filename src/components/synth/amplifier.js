import React from 'react';
import { Divider, Row, Col, Select } from 'antd';
import { Knob } from '../knob/knob';

export function Amplifier() { 
    const {Option} = Select
    return  (
        <div>
            <Divider className="text-gold">AMP</Divider> 
            <Row justify="space-between">                
                <Col span={24}>
                    <Select className="control-select text-lcd" size="medium" name="eg-type" placeholder="Amp" defaultValue="open">
                        <Option key="adsr">ADSR</Option>
                        <Option key="ahr">AHR</Option>
                        <Option key="ar">AR</Option>
                        <Option key="loop">AR Loop</Option>                      
                        <Option key="open">Open</Option>
                    </Select>
                </Col>
            </Row>           
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