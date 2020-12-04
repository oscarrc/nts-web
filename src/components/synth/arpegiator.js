import React from 'react';
import { Divider, Row, Col, Select } from 'antd';
import { Knob } from '../knob/knob';

export function Arpegiator() { 
    const { Option } = Select;

    return  (
        <div>
            <Divider className="text-gold">ARP</Divider>
            <Row>
                <Col span={8}>
                    <label className="control-label" htmlFor="type">TYPE</label>
                    <Select className="control-select text-lcd" size="medium" name="type" placeholder="Arp type">
                        <Option key="u">Up</Option>
                        <Option key="d">Down</Option>
                        <Option key="ud">Up-Down</Option>
                        <Option key="du">Down-Up</Option>                      
                        <Option key="con">Convergge</Option>                        
                        <Option key="div">Diverge</Option>                        
                        <Option key="condiv">Conv-Div</Option>   
                        <Option key="divcon">Div-Conv</Option>                      
                        <Option key="rand">Random</Option>
                        <Option key="stoc">Stochastic</Option>
                    </Select>
                </Col>
                <Col span={8}>
                    <Knob name="LENGTH" />
                </Col>
                <Col span={8}>                    
                    <Knob name="INTERVAL" />
                </Col>
            </Row>
        </div>
        
    );
}