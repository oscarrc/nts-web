import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Row, Col } from 'antd';
import { Button, Knob, Selector } from '../../../components';
import { effects } from '../../../config/midi';

export function Effects() { 
    const effectValues = useSelector(state => state.synthesizer).value.effects;

    const renderControls = (ctrls, name, span, val) => {
        let controls = [];

        Object.keys(ctrls).forEach( (control) => {
            if(control === 'type'){
                controls.push(
                    <Col span={span}> 
                        <Selector 
                            name={ name }
                            max={ ctrls[control].values.length - 1 }
                            values={ ctrls[control].values }
                            cc={ ctrls[control].cc }
                            min="1"
                            active={ val.active }
                            value={ val[control] }
                        />
                    </Col>
                );
            }else{
                controls.push(                    
                    <Col span={span}>
                        <Knob 
                            name={ctrls[control].label}
                            max={ctrls[control].max}
                            min={ctrls[control].min}
                            step={ctrls[control].step}
                            cc={ctrls[control].cc}
                            value={ val[control] }
                        />
                    </Col>
                );
            }
        });

        return controls;
    }

    const renderButton = (ctrls, name, value ) => {
        return (
            <Button 
                name={ name }
                tag={ true }
                cc={ ctrls.type.cc }
                onValue={ ctrls.type.values[value.type].value }
                active={ value.active }
            />
        )
    }

    return  (
        <div className="effects">
            <Divider className="text-gold">EFFECTS</Divider>
            <Row className="select-row" justify="space-between">         
                <Col span={6}> 
                    { renderButton(effects.mod, "Mod", effectValues.mod) }
                </Col>
                <Col span={6}>
                    { renderButton(effects.delay, "Delay", effectValues.delay) }              
                </Col>
                <Col span={6}>                
                    { renderButton(effects.reverb, "Reverb", effectValues.reverb) }   
                </Col>
            </Row>
            <Divider className="text-light">Mod</Divider>
            <Row>
                { renderControls(effects.mod, "MOD", 6, effectValues.mod) }
            </Row>
            <Divider className="text-light">Delay</Divider>
            <Row>      
                { renderControls(effects.delay, "DELAY", 6, effectValues.delay) }
            </Row>
            <Divider className="text-light">Reverb</Divider>
            <Row>   
                { renderControls(effects.reverb, "REVERB", 6, effectValues.reverb) }
            </Row>
        </div>
    );
}