import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Divider, Row, Col } from 'antd';

import { randomPatch } from '../../../utils/patch';

import Button from '../../../assets/button.png';

export function More() { 
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect( () => {
        document.getElementById("randomize").addEventListener("click", ()=>{        
            const patch = randomPatch();  
            dispatch({type:'synthesizer/setControl', payload: patch});
        });

        document.getElementById("sequencer").addEventListener("click", ()=>{            
            history.push("/sequencer");
        });
    })

    return  (
        <div className="more">
            <Divider className="text-gold">More</Divider> 
            <Row justify="space-between">                
                <Col className="text-light" span={12}>                    
                    <span className="switch-button-col">
                        <webaudio-switch id="randomize" src={Button} type="kick"></webaudio-switch> Randomize
                    </span>
                </Col>
                <Col className="text-light" span={12}>                    
                    <span className="switch-button-col">
                        <webaudio-switch id="sequencer" src={Button} type="kick"></webaudio-switch> Sequencer
                    </span>
                </Col>
            </Row>        
        </div>
    );
}