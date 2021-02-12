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
                <Col span={8} sm={4} lg={24} key={ "seq" + i } >
                    <Bank label="Seq" accept=".ntsSeq" bank={i} active={ props.active === i } onClick={setPatch} onInport="" onExport="" />
                </Col>
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
        <Row className="controls-wrapper" align="space-between">
            <Col span={12} order={1} lg={{ order: 1, span: 24 }} className="btn-group">
                <Button onClick={ props.onPlay } ghost className="btn-gold" icon={<CaretRightOutlined />}></Button>
                <InputNumber onChange={ props.onTempo } className="control-number text-lcd" min={1} max={100000} defaultValue={props.tempo} />
            </Col>
            <Col span={24} order={3} lg={{ order: 2, span: 24 }} className="bank-selector">
                <Row justify="space-between" gutter={[0,10]}>
                    { renderButtons() }
                </Row>
            </Col>
            <Col span={12} order={2} lg={{ order: 3, span: 24 }} >
                <Button onClick={ props.onBack } ghost className="btn-gold back" icon={<RollbackOutlined />}> Back</Button>
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