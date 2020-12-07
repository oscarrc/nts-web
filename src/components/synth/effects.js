import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob } from '../knob/knob';
import { Selector } from '../selector/selector';
import Switch from '../../assets/switch.png';

export function Effects() { 
    return  (
        <div>
            <Divider className="text-gold">EFFECTS</Divider>
            <Row className="select-row" justify="space-between">         
                <Col className="text-light" span={6}>                    
                    <webaudio-switch src={Switch}></webaudio-switch> Mod
                </Col>
                <Col className="text-light" span={6}>                    
                    <webaudio-switch src={Switch}></webaudio-switch> Delay
                </Col>
                <Col className="text-light" span={6}>                    
                    <webaudio-switch src={Switch}></webaudio-switch> Reverb
                </Col>
            </Row>
            <Divider className="text-light">Mod</Divider>
            <Row>
                <Col span={6}>
                    <Selector name="MOD" />
                </Col>
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
                    <Selector name="DELAY" />
                </Col>          
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
                    <Selector name="REVERB" />
                </Col>             
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