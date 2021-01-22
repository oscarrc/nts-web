import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Button, InputNumber  } from 'antd';
import { CaretRightOutlined, RollbackOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

export function Controls(props) {  
    const history = useHistory();
    const dispatch = useDispatch();

    const togglePlay = () => dispatch({type:'sequencer/togglePlay'});
    // const toggleLoop = () => dispatch({type:'sequencer/toggleLoop'});
    const setTempo = (value) => dispatch({type:'sequencer/setTempo', payload: {
        tempo: value
    }});

    const goBack = () => {
        history.push("/");
        dispatch({type:'sequencer/togglePlay'});
    }

    useEffect( () => {
        const handleKey = (event) => {
            if (event.keyCode === 32) togglePlay();
        }
        document.addEventListener("keyup", (event) => handleKey(event) );

        return () => document.removeEventListener("keyup", handleKey);
        // eslint-disable-next-line
    }, [])

    return (
        <Row className="controls">
            <Col className="text-left" span={12}>                
                <Button onClick={ goBack } ghost className="btn-gold" icon={<RollbackOutlined />}></Button>
            </Col>
            <Col className="text-right btn-group" span={12}>
                <Button onClick={ togglePlay } ghost className="btn-gold" icon={<CaretRightOutlined />}></Button>
                <InputNumber onChange={ setTempo } className="control-number text-lcd" min={1} max={100000} defaultValue={props.tempo} />
                {/* <Button onClick={ toggleLoop } ghost className="btn-gold" icon={<RedoOutlined />}></Button> */}
            </Col>
        </Row>
    )
}

Controls.defaultProps = {
    tempo: 120,
    loop: 1,
    play: 0
}