import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { Keyboard, Pad, Octave } from '../../../components';

export function Live() {       
    const octave = useSelector(state => state.midi).value.octave;

    return  (
        <Row justify="space-around" align="stretch">
            <Col span={2}>
                <Octave />
            </Col>
            <Col span={18}>
                <Keyboard octave={octave} />
            </Col>   
            <Col span={2}>
                <Pad />
            </Col>
        </Row>
    );
}