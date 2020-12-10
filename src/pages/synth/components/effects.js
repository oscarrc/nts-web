import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Button, Knob, Selector } from '../../../components';
import { effects } from '../../../config/midi';

export function Effects() { 
    const renderControls = (ctrls, name, span) => {
        let controls = [];

        Object.keys(ctrls).forEach( (control) => {
            if(control === 'type'){
                controls.push(
                    <Col span={span}> 
                        <Selector name={ name } max={ ctrls[control].values.length - 1 } values={ ctrls[control].values } cc={ ctrls[control].cc } min="1" />
                    </Col>
                );
            }else{
                controls.push(                    
                    <Col span={span}>
                        <Knob name={ctrls[control].label} max={ctrls[control].max} min={ctrls[control].min} step={ctrls[control].step} cc={ctrls[control].cc} value="0" />
                    </Col>
                );
            }
        });

        return controls;
    }

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
                { renderControls(effects.mod, "MOD", 6) }
            </Row>
            <Divider className="text-light">Delay</Divider>
            <Row>      
                { renderControls(effects.delay, "DELAY", 6) }
            </Row>
            <Divider className="text-light">Reverb</Divider>
            <Row>   
                { renderControls(effects.reverb, "REVERB", 6) }
            </Row>
        </div>
    );
}