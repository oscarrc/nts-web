import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, InputNumber, Space  } from 'antd';
import { CaretRightOutlined, RollbackOutlined } from '@ant-design/icons';
import { Bank } from '../partials';

export function Controls(props) {  
    const dispatch = useDispatch();

    const setPatch = (bank) => dispatch({ type:"sequencer/setBank", payload: bank });

    const renderButtons = () => {
        let buttons = [];

        for (let i = 0; i < 6; i++) {
            buttons.push(
                <Bank label="Seq" accept=".ntsSeq" bank={i} active={ props.active === i } onClick={setPatch} onInport="" onExport="" />
            )
        }

        return buttons;
    }

    useEffect( () => {
        const handleKey = (event) => { if (event.keyCode === 32) props.onPlay() };
        document.addEventListener("keyup", (event) => handleKey(event) );
        return () => document.removeEventListener("keyup", handleKey);
        // eslint-disable-next-line
    }, [])

    return (
        <Row className="controls" justify="space-between">
            <Col className="text-left">                
                <Space>
                    <Button onClick={ props.onBack } ghost className="btn-gold" icon={<RollbackOutlined />}></Button>
                </Space>
            </Col>
            <Col className="button-wrapper">
                { renderButtons() }
            </Col>
            <Col className="text-right btn-group">
                <Button onClick={ props.onPlay } ghost className="btn-gold" icon={<CaretRightOutlined />}></Button>
                <InputNumber onChange={ props.onTempo } className="control-number text-lcd" min={1} max={100000} defaultValue={props.tempo} />
            </Col>
        </Row>
    )
}

Controls.defaultProps = {
    tempo: 120,
    loop: 1,
    play: false,
    bank: 0
}