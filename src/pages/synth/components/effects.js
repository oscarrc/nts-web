import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Button, Knob, Selector } from '../../../components';

export function Effects() { 
    return  (
        <div className="effects">
            <Divider className="text-gold">EFFECTS</Divider>
            <Row className="select-row" justify="space-between">         
                <Col span={6}> 
                    <Button name="Mod" tag={ true }/>
                </Col>
                <Col span={6}>    
                    <Button name="Delay" tag={ true }/>                 
                </Col>
                <Col span={6}>                
                    <Button name="Reverb" tag={ true } />
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