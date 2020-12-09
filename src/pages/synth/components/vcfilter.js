import React from 'react';
import { Divider, Row, Col, Select } from 'antd';
import { Knob } from '../../../components';
import Switch from '../../../assets/switch.png';

export function Vcfilter() { 
    const { Option } = Select;

    return  (
        <div>
            <Divider className="text-gold">VCF</Divider>                       
            <Row className="select-row" justify="space-between">         
                <Col span={4}>                    
                    <webaudio-switch src={Switch}></webaudio-switch>
                </Col>       
                <Col span={20}>
                    <Select className="control-select text-lcd" size="medium" name="eg-type" placeholder="Filter" defaultValue="lp2">
                            <Option key="lp2">Low Pass 2-pole</Option>
                            <Option key="lp4">Low Pass 4-pole</Option>
                            <Option key="bp2">Band Pass 2-pole</Option>
                            <Option key="bp4">Band Pass 4-pole</Option>                     
                            <Option key="hp2">High Pass 2-Pole</Option>
                            <Option key="hp4">High Pass 4-Pole</Option>
                        </Select>
                    </Col>
            </Row>                     
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