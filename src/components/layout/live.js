import React from 'react';
import { Row, Col } from 'antd';
import { Keyboard, Pad, Octave } from '../partials';

export function Live(props) {       
    return  (
        <Row justify="space-around" align="stretch">
            <Col span={2}>
                <Octave />
            </Col>
            <Col span={18}>
                <Keyboard />
            </Col>   
            <Col span={2}>
                <Pad />
            </Col>
        </Row>
    );
}