import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob, Selector } from '../../../components';

export function Arpegiator() { 
    // const { Option } = Select;

    return  (
        <div>
            <Divider className="text-gold">ARP</Divider>
            <Row className="padded-row" justify="space-between">   
                <Col span={24}>
                    <Selector name="TYPE" />
                    {/* <Select className="control-select text-lcd" size="medium" name="type" placeholder="Arp type">
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
                    </Select> */}
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