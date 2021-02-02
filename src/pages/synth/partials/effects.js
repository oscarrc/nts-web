import React from 'react';
import { useSelector } from 'react-redux';

import { Divider, Row, Col } from 'antd';
import { Button, Knob, Selector } from '../../../components';

export function Effects(props) { 
    const effectValues = props.values;
    const effects = props.spec;
    
    const renderControls = (ctrls, name, span, val, path) => {
        let controls = [];

        Object.keys(ctrls).forEach( (control) => {
            if(control === 'type'){
                controls.push(
                    <Col span={span} key={name + ctrls[control].cc}> 
                        <Selector 
                            name={ name }
                            values={ ctrls[control].values }
                            cc={ ctrls[control].cc }
                            min="1"
                            max={ props.count[name.toLowerCase()] }
                            active={ val.active }
                            value={ val[control] }
                            path={ path + "." + control}                            
                            vstep={ Math.round(127/(props.count[name.toLowerCase()])) }
                        />
                    </Col>
                );
            }else{
                controls.push(                    
                    <Col span={span} key={ctrls[control].label + ctrls[control].cc}>
                        <Knob 
                            name={ctrls[control].label}
                            max={ctrls[control].max}
                            min={ctrls[control].min}
                            step={ctrls[control].step}
                            cc={ctrls[control].cc}
                            value={ val[control] }
                            path={ path + "." + control}
                        />
                    </Col>
                );
            }
        });

        return controls;
    }

    const renderButton = (ctrls, name, value, path ) => {
        return (
            <Button 
                name={ name }
                tag={ true }
                cc={ ctrls.type.cc }
                onValue={ ctrls.type.values[value.type].value }
                active={ value.active }
                path={ path }
            />
        )
    }

    return  (
        <div className="effects">
            <Divider className="text-gold">EFFECTS</Divider>
            <Row className="select-row" justify="space-between">         
                <Col span={8}> 
                    { renderButton(effects.mod, "Mod", effectValues.mod, "effects.mod.active") }
                </Col>
                <Col span={8}>
                    { renderButton(effects.delay, "Delay", effectValues.delay, "effects.delay.active") }              
                </Col>
                <Col span={8}>                
                    { renderButton(effects.reverb, "Reverb", effectValues.reverb, "effects.reverb.active") }   
                </Col>
            </Row>
            <Divider className="text-light">Mod</Divider>
            <Row>
                { renderControls(effects.mod, "MOD", 6, effectValues.mod, "effects.mod") }
            </Row>
            <Divider className="text-light">Delay</Divider>
            <Row>      
                { renderControls(effects.delay, "DELAY", 6, effectValues.delay, "effects.delay") }
            </Row>
            <Divider className="text-light">Reverb</Divider>
            <Row>   
                { renderControls(effects.reverb, "REVERB", 6, effectValues.reverb, "effects.reverb") }
            </Row>
        </div>
    );
}