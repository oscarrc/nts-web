import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Button, InputNumber, Space  } from 'antd';
import { CaretRightOutlined, RollbackOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

export function Controls(props) {  
    const history = useHistory();
    const dispatch = useDispatch();
    
    const togglePlay = () => dispatch({type:'sequencer/togglePlay'});
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
                <Space>
                    <Button onClick={ goBack } ghost className="btn-gold" icon={<RollbackOutlined />}></Button>
                    <Button ghost className="btn-gold" icon={<DownloadOutlined />}></Button>
                    <Button ghost className="btn-gold" icon={<UploadOutlined />}></Button>
                </Space>
            </Col>
            <Col className="text-right btn-group" span={12}>
                <Button onClick={ togglePlay } ghost className="btn-gold" icon={<CaretRightOutlined />}></Button>
                <InputNumber onChange={ setTempo } className="control-number text-lcd" min={1} max={100000} defaultValue={props.tempo} />
            </Col>
        </Row>
    )
}

Controls.defaultProps = {
    tempo: 120,
    loop: 1,
    play: 0
}