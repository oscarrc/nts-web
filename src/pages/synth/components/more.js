import React from 'react';
import { Divider, Row, Col } from 'antd';
import Button from '../../../assets/button.png';

export function More() { 
    const randomize = () => {
        console.log(randomize)
    }

    const sequencer = () => {
        console.log(sequencer)
    }

    return  (
        <div className="more">
            <Divider className="text-gold">More</Divider> 
            <Row justify="space-between">                
                <Col className="text-light" span={12}>                    
                    <webaudio-switch id="randomize" src={Button} type="kick" onclick={randomize}></webaudio-switch> Randomize
                </Col>
                <Col className="text-light" span={12}>                    
                    <webaudio-switch id="sequence" src={Button} type="kick" onclick={sequencer}></webaudio-switch> Sequencer
                </Col>
            </Row>        
        </div>
    );
}