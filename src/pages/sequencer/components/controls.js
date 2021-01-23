import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Button, InputNumber, Space, Upload  } from 'antd';
import { CaretRightOutlined, RollbackOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { saveSequence, loadSequenceFile } from '../../../utils/sequence';

export function Controls(props) {  
    const history = useHistory();
    const dispatch = useDispatch();

    const setSequence = () => {
        if(props.pianoroll){
            const sequence = props.pianoroll.getMMLString();        
            dispatch({ type: 'sequencer/setSequence', payload: { sequence: sequence }});
        }
    }
    
    const togglePlay = () => {
        dispatch({type:'sequencer/togglePlay'});        
        setSequence();
    }

    const setTempo = (value) => dispatch({type:'sequencer/setTempo', payload: { tempo: value }});

    const importSequence = async (file) => {
        const seq = await loadSequenceFile(file);
        dispatch({ type: 'sequencer/setSequence', payload: { sequence: seq }});
    }

    const downloadSequence = () => {        
        const sequence = props.pianoroll.getMMLString();    
        dispatch({ type: 'sequencer/setSequence', payload: { sequence: sequence }});
        saveSequence(sequence);
    }

    const goBack = () => {        
        dispatch({ type:'sequencer/stopPlay' });
        setSequence();
        props.pianoroll.stop();
        history.push("/");
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
                    <Button ghost onClick={ downloadSequence } className="btn-gold" icon={<DownloadOutlined />}></Button>
                    <Upload accept=".ntsseq" showUploadList={false} beforeUpload={ file => importSequence(file) } customRequest={ () => false }>
                        <Button ghost className="btn-gold" icon={<UploadOutlined />}></Button>
                    </Upload>
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
    play: false,
    pianoroll: null
}