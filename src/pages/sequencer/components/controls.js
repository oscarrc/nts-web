import React from 'react';
import { Row, Col, Button, InputNumber  } from 'antd';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';

export function Controls(props) {  
    return (
        <Row>
            <Col className="text-left" span={12}>
                <Button ghost className="btn-gold" icon={props.play ? <PauseOutlined /> : <CaretRightOutlined />}></Button>
            </Col>
            <Col className="text-right" span={12}>
                <InputNumber className="control-number text-lcd" min={1} max={100000} defaultValue={props.tempo} />
            </Col>
        </Row>
    )
}

Controls.defaultProps = {
    tempo: 120,
    loop: 1,
    play: 0
}