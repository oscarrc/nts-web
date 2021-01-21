import React from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Button, InputNumber  } from 'antd';
import { CaretRightOutlined, RollbackOutlined, RedoOutlined } from '@ant-design/icons';

export function Controls(props) {  
    const history = useHistory();

    return (
        <Row className="controls">
            <Col className="text-left" span={12}>                
                <Button onClick={ () =>  history.push("/") } ghost className="btn-gold" icon={<RollbackOutlined />}></Button>
            </Col>
            <Col className="text-right" span={12}>
                <Button ghost className="btn-gold" icon={<CaretRightOutlined />}></Button>
                <InputNumber className="control-number text-lcd" min={1} max={100000} defaultValue={props.tempo} />
                <Button ghost className="btn-gold" icon={<RedoOutlined />}></Button>
            </Col>
        </Row>
    )
}

Controls.defaultProps = {
    tempo: 120,
    loop: 1,
    play: 0
}