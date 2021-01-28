import React, { useEffect, useRef } from 'react';
import { Divider, Row, Col } from 'antd';
import Button from '../../../assets/button.png';

export function More(props) { 
    const randomize = useRef();
    const sequencer = useRef();

    useEffect( () => {
        const randomizeCurrent = randomize.current;
        const sequencerCurrent = sequencer.current;
        
        randomizeCurrent.addEventListener("click", props.onRandom);
        sequencerCurrent.addEventListener("click", props.onSequencer);

        return () => {
            randomizeCurrent.removeEventListener("click", props.onRandom);
            sequencerCurrent.removeEventListener("click", props.onSequencer);
        }
    }, [props.onRandom, props.onSequencer])

    return  (
        <div className="more">
            <Divider className="text-gold">More</Divider> 
            <Row justify="space-between">                
                <Col className="text-light" span={12}>                    
                    <span className="switch-button-col">
                        <webaudio-switch ref={randomize} src={Button} type="kick"></webaudio-switch> Randomize
                    </span>
                </Col>
                <Col className="text-light" span={12}>                    
                    <span className="switch-button-col">
                        <webaudio-switch ref={sequencer} src={Button} type="kick"></webaudio-switch> Sequencer
                    </span>
                </Col>
            </Row>        
        </div>
    );
}