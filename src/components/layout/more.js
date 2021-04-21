import React, { useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { Divider, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import Button from '../../assets/button.png';

export function More() { 
    const randomSwitch = useRef();
    const seqSwitch = useRef();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect( () => {
        const randomizeCurrent = randomSwitch.current;
        const sequencerCurrent = seqSwitch.current;

        const randomize = () => dispatch({ type:"synth/randomize"});
        const sequencer = () => history.push("/sequencer");
        
        randomizeCurrent.addEventListener("click", randomize);
        sequencerCurrent.addEventListener("click", sequencer);

        return () => {
            randomizeCurrent.removeEventListener("click", randomize);
            sequencerCurrent.removeEventListener("click", sequencer);
        }
    }, [dispatch, history])

    return  (
        <div className="more">
            <Divider className="text-gold">More</Divider> 
            <Row justify="space-between">                
                <Col className="text-light" span={12}>                    
                    <span className="switch-button-col">
                        <webaudio-switch ref={randomSwitch} src={Button} type="kick"></webaudio-switch> Randomize
                    </span>
                </Col>
                <Col className="text-light" span={12}>                    
                    <span className="switch-button-col">
                        <webaudio-switch ref={seqSwitch} src={Button} type="kick"></webaudio-switch> Sequencer
                    </span>
                </Col>
            </Row>        
        </div>
    );
}